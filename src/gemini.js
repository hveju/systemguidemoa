/* Gemini 연동 — DB 데이터에만 근거해 답변.
   플러그인 UI(iframe)에서 직접 호출합니다. manifest.json의
   networkAccess.allowedDomains에 generativelanguage.googleapis.com 이 있어야 합니다.
   답변은 6단계로 진행되며, opts.onStep(index, status, detail)으로 진행 상황을 알립니다.
   status: 'run' | 'done' | 'warn' | 'error' | 'skip' */

/* 앞에서부터 시도하고, 모델이 없으면(404) 다음 모델로 넘어갑니다. */
/* 빠른 lite 먼저 · 오류(429·503·시간 초과)면 다음 모델로 */
var MOA_MODELS = ['gemini-3.1-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.5-flash'];
/* lite가 '내용 없음'으로 답하면 이 순번부터(상위 모델) 다시 물어봄 */
var MOA_UPPER = 2;
var MOA_COOL = {};
/* 모델별 생성 설정 — 2.x: thinkingBudget / 3.x·latest: thinkingLevel(3.8은 minimal 미지원 → low) / 거부한 모델은 생각 설정 없이 */
var MOA_NO_THINK = {};
function moaGenCfg(model){
  var c = { maxOutputTokens: 4096, responseMimeType: 'application/json' };
  if(MOA_NO_THINK[model]) return c;
  if(/^gemini-2/.test(model)){ c.temperature = 0; c.thinkingConfig = { thinkingBudget: 0 }; }
  else c.thinkingConfig = { thinkingLevel: /^gemini-3\.[6-9]/.test(model) ? 'low' : 'minimal' };
  return c;
} /* 503·시간 초과 모델은 5분간 건너뜀 */
function moaSkip(m){
  if(MOA_COOL[m] && Date.now() < MOA_COOL[m]) return true;
  if(typeof moaUsageAll !== 'function') return false;
  var u = moaUsageAll(), lim = MOA_FREE_RPD[m] || 0;
  return lim > 0 && (u.used[m] || 0) >= lim;
}
/* 응답 헤더가 이 시간 안에 안 오면 다음 모델로 */
var MOA_CALL_TIMEOUT = 10000;

var MOA_STEPS = [
  '질문 범위 및 의도 확인',
  'Glossary 용어 맵핑',
  '관련 DB 병렬 검색',
  '검색 결과 매칭 및 우선순위 적용',
  '답변 가능 여부 검증',
  '최종 답변 생성'
];

var MOA_NO_ANSWER = '가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요.';

/* ── 프롬프트: data/prompts/*.md ─────────────────────────────
   1) 빌드 때 index.html 안에 인라인된 window.MOA_PROMPTS (항상 있음, 오프라인 동작)
   2) 질문할 때마다 최신 파일을 다시 읽어 덮어씀 (30초 캐시)
      - 브라우저 미리보기(http): 같은 프로젝트의 data/prompts/
      - Figma 플러그인: GitHub main 브랜치의 data/prompts/ (push하면 바로 반영)
   읽기에 실패하면 1)을 그대로 씁니다. */
var MOA_PROMPT_FILES = ['01_role.md', '02_exception.md', '03_output.md'];
var MOA_PROMPT_REPO = 'https://raw.githubusercontent.com/uiuxcell/systemguidemoa/main/data/prompts/';
var MOA_PROMPT_TTL = 30000;
var moaLive = null, moaLiveAt = 0, moaLiveFrom = '';

/* 노션 메타(첫 **[ 이전 줄)와 이미지 줄을 지우고 본문만 남김 */
function moaPromptBody(md){
  var lines = String(md).replace(/\r/g, '').split('\n');
  var i = lines.findIndex(function(l){ return /^\*\*\[/.test(l.trim()); });
  if(i > 0) lines = lines.slice(i);
  return lines.filter(function(l){ return !/^!\[/.test(l.trim()); }).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/* 프롬프트 파일이 정하지 않는, 앱 동작에 필요한 규칙 */
var MOA_RULES = [
  '[시스템 연동 규칙]',
  '<context>의 "토큰" 항목은 Figma 변수입니다. Light/Dark 값이 있으면 둘 다 적으세요. 값 뒤 괄호 안은 참조하는 상위 토큰입니다.',
  '앞선 대화는 사용자가 무엇을 이어서 묻는지 파악하는 데만 쓰세요. "그럼", "그건", "다크모드는?"처럼 짧은 후속 질문은 앞선 질문의 대상에 대한 질문으로 해석합니다. 근거는 항상 마지막 <context>만 사용합니다.'
].join('\n');

function moaPrompts(){ return moaLive || window.MOA_PROMPTS || []; }
function moaSystem(){
  var p = moaPrompts();
  if(!p.length) return MOA_RULES;
  return p.map(function(x){ return x.text; }).join('\n\n') + '\n\n' + MOA_RULES;
}
function moaFetchText(url, ms){
  var ctl = typeof AbortController === 'function' ? new AbortController() : null;
  var t = setTimeout(function(){ if(ctl) ctl.abort(); }, ms);
  var opt = { cache: 'no-store', signal: ctl ? ctl.signal : undefined };
  var get = function(u){ return fetch(u, opt).then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); }); };
  /* 캐시 무효화 쿼리(?t=)를 막는 서버가 있어 실패하면 쿼리 없이 재시도 (cache:'no-store'로 충분) */
  return get(url + (url.indexOf('?') > -1 ? '&' : '?') + 't=' + Date.now())
    .catch(function(){ return get(url); })
    .then(function(x){ clearTimeout(t); return x; }, function(e){ clearTimeout(t); throw e; });
}
function moaLoadPrompts(force){
  if(!force && moaLiveAt && Date.now() - moaLiveAt < MOA_PROMPT_TTL) return Promise.resolve(moaPrompts());
  var bases = [];
  if(/^https?:/.test(location.protocol)) bases.push({ url: (/\/preview\//.test(location.pathname) ? '../' : '') + 'data/prompts/', from: '로컬 data/prompts' });
  bases.push({ url: MOA_PROMPT_REPO, from: 'GitHub data/prompts' });
  var tryBase = function(i){
    if(i >= bases.length) return Promise.reject();
    return Promise.all(MOA_PROMPT_FILES.map(function(f){
      return moaFetchText(bases[i].url + f, 2500).then(function(md){ return { file: f, text: moaPromptBody(md) }; });
    })).then(function(list){
      if(list.some(function(x){ return !x.text; })) throw new Error('empty');
      moaLive = list; moaLiveFrom = bases[i].from; return list;
    }).catch(function(){ return tryBase(i + 1); });
  };
  moaLiveAt = Date.now();
  return tryBase(0).catch(function(){ moaLiveFrom = ''; return moaPrompts(); });
}
function moaPromptSource(){ return moaLive ? moaLiveFrom + ' (최신)' : (window.MOA_PROMPTS && window.MOA_PROMPTS.length ? '빌드 내장' : '기본값'); }

/* ── 가이드 DB: data/DB_guide/*.md|csv + data/DB_tokens/tokens.json ──────
   1) 빌드 때 인라인된 window.MOA_DB / MOA_TOKENS 로 먼저 동작 (오프라인)
   2) 시작할 때와 질문·카테고리 진입 때 최신 파일을 다시 읽어 덮어씀 (30초 캐시)
      - 브라우저 미리보기(http): 같은 프로젝트의 data/
      - Figma 플러그인: GitHub main 브랜치의 data/ (push하면 재빌드 없이 반영)
   파일 목록은 GitHub API로 읽고(새 파일 추가·삭제 반영), 실패하면 빌드 내장본의 목록을 씁니다.
   파싱 규칙은 build.js와 같습니다 — 한쪽을 바꾸면 다른 쪽도 맞춰 주세요. */
var MOA_REPO_RAW = 'https://raw.githubusercontent.com/uiuxcell/systemguidemoa/main/';
var MOA_REPO_API = 'https://api.github.com/repos/uiuxcell/systemguidemoa/contents/data/DB_guide?ref=main';
var MOA_DB_TTL = 30000, MOA_LIST_TTL = 300000;
var moaDbAt = 0, moaDbJob = null, moaDbFrom = '빌드 내장', moaList = null, moaListAt = 0;
var MOA_DB_BUILT = (window.MOA_DB || []).slice();
var MOA_LABEL = { DimmedShadow: 'Dimmed & Shadow', CTAButtonIcon: 'CTA Button Icon' };
function moaLabel(key){
  var b = key.replace(/^\d+[_\-.]\s*/, '');
  if(MOA_LABEL[b]) return MOA_LABEL[b];
  return b.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}
function moaClean(s){
  var t = s.replace(/^#+\s*/, '').replace(/[`*]/g, '').trim();
  t = t.replace(/^\d+(\.\d+)*\.?\s*/, '').trim();
  if(/^\[.*\]$/.test(t)) t = t.slice(1, -1).trim();
  return t;
}
function moaSplitCsv(line){
  var out = [], cur = '', q = false;
  for(var i = 0; i < line.length; i++){
    var c = line[i];
    if(c === '"'){ if(q && line[i + 1] === '"'){ cur += '"'; i++; } else q = !q; }
    else if(c === ',' && !q){ out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
function moaParseGuide(name, raw){
  var base = moaLabel(name.replace(/\.(md|csv)$/i, '')), out = [];
  raw = String(raw).replace(/^\uFEFF/, '');
  if(/\.csv$/i.test(name)){
    var rows = raw.trim().split(/\r?\n/).map(moaSplitCsv);
    var head = (rows.shift() || []).map(function(h){ return h.trim(); });
    rows.forEach(function(row){
      if(!row.length || row.every(function(c){ return !c.trim(); })) return;
      var rec = {};
      head.forEach(function(h, i){ rec[h] = (row[i] || '').trim(); });
      out.push({ source: name, topic: base, group: base, section: base, text: head.map(function(h){ return h + ': ' + rec[h]; }).join(', '), kind: 'csv', row: rec });
    });
    return out;
  }
  var group = '', section = '', buf = [];
  var flush = function(){
    var text = buf.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    buf = [];
    if(!text || !section) return;
    if(/^(메타|관련 피그마 좌표)/.test(group) || /^(메타|관련 피그마 좌표)/.test(section)) return;
    if(/^DB 등록:/m.test(text) || text.length < 12) return;
    out.push({ source: name, topic: base, group: group, section: section, text: text, kind: 'md' });
  };
  raw.split(/\r?\n/).forEach(function(line){
    var h = /^(#{1,4})\s+(.*)$/.exec(line);
    if(h){
      var l = moaClean(h[2]);
      if(!l) return;
      flush();
      if(h[1].length <= 2){ group = l; section = l; } else section = l;
    } else buf.push(line);
  });
  flush();
  return out;
}
function moaDataBase(){
  return /^https?:/.test(location.protocol) ? (/\/(preview|src)\//.test(location.pathname) ? '../' : '') : MOA_REPO_RAW;
}
function moaSwap(target, list){ target.length = 0; Array.prototype.push.apply(target, list); }
/* 토큰 숫자 값에 단위 붙이기 (DB_tokens 파일은 그대로, 불러올 때만)
   단위 맵은 빌드 때 *.tokens.json의 com.figma.scopes로 만듦 · 자체 범위가 없으면 별칭(괄호 안 경로)의 단위를 따름 */
function moaUnitize(list){
  var U = window.MOA_TOKEN_UNITS || {};
  if(!Array.isArray(list) || !Object.keys(U).length) return list;
  list.forEach(function(ch){
    if(!ch || ch._u || typeof ch.text !== 'string') return;
    ch.text = ch.text.split('\n').map(function(ln){
      var m = /^([^\s:][^:]*?):\s(.+)$/.exec(ln);
      if(!m || /#[0-9A-Fa-f]{3,8}/.test(m[2])) return ln;
      var p = m[1].trim(), u = U[p];
      if(u == null){ var al = /\(([^()\s]+\/[^()\s]+)\)/.exec(m[2]); u = al && U[al[1]] != null ? U[al[1]] : ''; }
      if(/(^|\/)(x|y|blur|spread)$/i.test(p)) u = '';
      if(!u) return ln;
      return m[1] + ': ' + m[2].replace(/(^|Light |Dark )(-?\d+(?:\.\d+)?)(?![\d.%a-zA-Z])/g, '$1$2' + u);
    }).join('\n');
    ch._u = true;
  });
  return list;
}
moaUnitize(window.MOA_TOKENS);
function moaGuideList(){
  var built = [];
  MOA_DB_BUILT.forEach(function(c){ if(built.indexOf(c.source) < 0) built.push(c.source); });
  if(moaList && Date.now() - moaListAt < MOA_LIST_TTL) return Promise.resolve(moaList);
  return moaFetchText(MOA_REPO_API, 3000).then(function(t){
    var names = JSON.parse(t).filter(function(f){ return f.type === 'file' && f.name !== 'README.md' && /\.(md|csv)$/i.test(f.name); }).map(function(f){ return f.name; });
    /* 미리보기는 아직 push 안 한 로컬 파일도 있을 수 있어 내장 목록과 합침 */
    if(moaDataBase() !== MOA_REPO_RAW) built.forEach(function(n){ if(names.indexOf(n) < 0) names.push(n); });
    moaList = names.sort(); moaListAt = Date.now();
    return moaList;
  }).catch(function(){ return moaList || built.sort(); });
}
function moaLoadDb(force){
  if(moaDbJob) return moaDbJob;
  if(!window.fetch || (!force && moaDbAt && Date.now() - moaDbAt < MOA_DB_TTL)) return Promise.resolve(window.MOA_DB);
  moaDbAt = Date.now();
  var base = moaDataBase();
  var guide = moaGuideList().then(function(names){
    return Promise.all(names.map(function(n){
      return moaFetchText(base + 'data/DB_guide/' + encodeURIComponent(n), 4000)
        .then(function(t){ return { ok: true, chunks: moaParseGuide(n, t) }; })
        .catch(function(e){
          /* 404 = 파일 삭제됨, 그 외(네트워크) = 내장본 유지 */
          if(String(e && e.message) === '404') return { ok: true, chunks: [] };
          return { ok: false, chunks: MOA_DB_BUILT.filter(function(c){ return c.source === n; }) };
        });
    }));
  }).then(function(res){
    var all = [].concat.apply([], res.map(function(r){ return r.chunks; }));
    var fresh = res.filter(function(r){ return r.ok; }).length;
    if(!all.length || !fresh) return false;
    if(!Array.isArray(window.MOA_DB)) window.MOA_DB = [];
    moaSwap(window.MOA_DB, all);
    return true;
  });
  var tokens = moaFetchText(base + 'data/DB_tokens/tokens.json', 4000).then(function(t){
    var list = JSON.parse(t);
    if(!Array.isArray(list) || !list.length) return false;
    if(!Array.isArray(window.MOA_TOKENS)) window.MOA_TOKENS = [];
    moaSwap(window.MOA_TOKENS, moaUnitize(list));
    return true;
  }).catch(function(){ return false; });
  /* 용어집: glossary.md + ko_en.md (하나만 읽혀도 그 파일분만 교체) */
  var gloss = Promise.all([
    moaFetchText(base + 'data/db_glossary/glossary.md', 4000).then(moaParseGlossary).catch(function(){ return null; }),
    moaFetchText(base + 'data/db_glossary/' + MOA_KOEN_SRC, 4000).then(moaParseKoEn).catch(function(){ return null; })
  ]).then(function(g){
    var keep = (window.MOA_GLOSSARY_DB || []).filter(function(it){ return (it.source === 'glossary.md' && !(g[0] && g[0].length)) || (it.source === MOA_KOEN_SRC && !(g[1] && g[1].length)); });
    if(!(g[0] && g[0].length) && !(g[1] && g[1].length)) return false;
    window.MOA_GLOSSARY_DB = (g[0] && g[0].length ? g[0] : []).concat(g[1] && g[1].length ? g[1] : [], keep).sort(function(a, b){ return (a.source === MOA_KOEN_SRC) - (b.source === MOA_KOEN_SRC); });
    return true;
  });
  var faq = moaFetchText(base + 'data/faq/' + MOA_FAQ_FILE, 4000).then(function(t){
    var list = moaParseFaq(t);
    if(!list.length) return false;
    window.MOA_FAQ = list;
    return true;
  }).catch(function(){ return false; });
  moaDbJob = Promise.all([guide.catch(function(){ return false; }), tokens, gloss, faq]).then(function(r){
    moaDbJob = null;
    if(r[0] || r[1] || r[2] || r[3]){
      moaDbFrom = (base === MOA_REPO_RAW ? 'GitHub' : '로컬') + ' data (최신)';
      if(typeof moaBuildGlossary === 'function') moaBuildGlossary();
      if(typeof window.moaOnDb === 'function') window.moaOnDb();
    }
    return window.MOA_DB;
  });
  return moaDbJob;
}
function moaDbSource(){ return moaDbFrom; }

/* ── FAQ: data/faq/DB_FAQ.csv ─────────────────────────────────
   카테고리별 [예상 질문 → 봇 응답 예시]. 답변의 "형식·어투"만 이 파일을 우선 따르고,
   {변수} 자리의 실제 명칭·값·토큰은 DB_guide / DB_tokens(<context>)에서 채웁니다.
   노션에서 내려받은 CSV를 같은 이름으로 덮어쓰면 됩니다 (실행 중 다시 읽음, 빌드 시 내장). */
var MOA_FAQ_FILE = 'DB_FAQ.csv';
function moaCsvRows(raw){
  var rows = [], row = [], cur = '', q = false, s = String(raw).replace(/^\uFEFF/, '');
  for(var i = 0; i < s.length; i++){
    var c = s[i];
    if(q){ if(c === '"'){ if(s[i + 1] === '"'){ cur += '"'; i++; } else q = false; } else cur += c; }
    else if(c === '"') q = true;
    else if(c === ','){ row.push(cur); cur = ''; }
    else if(c === '\n' || c === '\r'){ if(c === '\r' && s[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  if(cur || row.length){ row.push(cur); rows.push(row); }
  return rows.filter(function(r){ return r.some(function(x){ return x.trim(); }); });
}
/* "01_Color (색상) (https://…)" → "Color" */
function moaFaqTopic(cat){
  return String(cat || '').replace(/\s*\(https?:[^)]*\)\s*$/, '').replace(/^\d+[_\-.]\s*/, '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}
function moaParseFaq(raw){
  var rows = moaCsvRows(raw), head = (rows.shift() || []).map(function(h){ return h.trim(); });
  var col = function(k){ for(var i = 0; i < head.length; i++) if(head[i].indexOf(k) > -1) return i; return -1; };
  var ci = col('카테고리'), qi = col('예상 질문'), ai = col('봇 응답'), vi = col('변수');
  if(qi < 0 || ai < 0) return [];
  return rows.map(function(r){
    return { topic: moaFaqTopic(ci > -1 ? r[ci] : ''), q: (r[qi] || '').trim(), a: (r[ai] || '').trim(), vars: vi > -1 ? (r[vi] || '').trim() : '' };
  }).filter(function(x){ return x.q && x.a; });
}
var MOA_FAQ_HINT = [
  ['breakpoint', /pc|mo|모바일|데스크톱|데스크탑|태블릿|해상도|breakpoint/i],
  ['state', /상태|hover|호버|비활성|disabled|선택|pressed|눌림|focus|포커스/i],
  ['theme', /다크|라이트|dark|light|테마/i],
  ['size', /small|large|default|medium|사이즈|크기|\d+px/i],
  ['token', /토큰|token/i]
];
function moaFaqKey(t){ return String(t || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
/* 질문과 비슷한 FAQ 예시를 topics(우선순위 순) 안에서 최대 n개 */
function moaFaqMatch(question, topics, n){
  var list = window.MOA_FAQ || [];
  if(!n || !list.length) return [];
  var keys = (topics || []).map(moaFaqKey).filter(Boolean);
  var qs = moaTokenize(question).filter(function(t){ return t.length > 1; });
  var raw = String(question || '');
  return list.map(function(f){
    var rank = keys.indexOf(moaFaqKey(f.topic));
    if(keys.length && rank < 0) return null;
    var words = moaTokenizeBase(f.q.replace(/\{[^}]*\}/g, ' ')).filter(function(w){ return w.length > 1; });
    var s = 0;
    words.forEach(function(w){ if(qs.some(function(t){ return t.indexOf(w) === 0 || w.indexOf(t) === 0; })) s += 1; });
    MOA_FAQ_HINT.forEach(function(h){ if(f.q.indexOf('{' + h[0]) > -1 && h[1].test(raw)) s += 0.5; });
    if(s < 1) return null;
    return { f: f, s: s - rank * 0.01 };
  }).filter(Boolean).sort(function(a, b){ return b.s - a.s; }).slice(0, n).map(function(r){ return r.f; });
}
function moaFaqContext(list){
  if(!list || !list.length) return '';
  return '<faq_style>\n' +
    '아래는 이 카테고리의 공식 답변 예시입니다. 질문과 가장 비슷한 예시 하나를 골라 그 문장 구조·어투·목록 형식(•, -, **굵게**)을 우선 따라 답하세요.\n' +
    '- {중괄호} 자리는 반드시 <context>(DB_guide·DB_tokens)에서 확인한 실제 명칭·값·토큰으로 채우세요. context에 없는 값은 지어내지 말고 그 부분을 생략하세요.\n' +
    '- 예시에 적힌 고정 문장·수치라도 context와 다르면 context를 따르세요.\n' +
    '- 이 예시 형식이 출력 프롬프트의 기본 구성(설명구/핵심 스펙/정의/사용 규칙)보다 우선합니다. 단, 첫 줄 제목 규칙과 JSON 출력 형식은 그대로 지키세요.\n' +
    '- 비슷한 예시가 없으면 기본 출력 규칙을 따르세요.\n\n' +
    list.map(function(f, i){ return '[예시 ' + (i + 1) + ' · ' + f.topic + ']\n질문: ' + f.q + '\n응답: ' + f.a; }).join('\n\n') +
    '\n</faq_style>\n\n';
}

/* data/db_glossary/glossary.md → 사용자 표현 ↔ 공식 용어 (빌드 시 window.MOA_GLOSSARY_DB로 들어옴) */
var MOA_GLOSSARY_CAT = { 'typography':'Typeface' };
var MOA_GLOSSARY = {}, MOA_GLOSSARY_PHRASE = [], MOA_GLOSSARY_TERM = {};
function moaBuildGlossary(){
  MOA_GLOSSARY = {}; MOA_GLOSSARY_PHRASE = []; MOA_GLOSSARY_TERM = {};
  var list = Array.isArray(window.MOA_GLOSSARY_DB) ? window.MOA_GLOSSARY_DB : [];
  var topics = {};
  (window.MOA_DB || []).concat(window.MOA_TOKENS || []).forEach(function(c){ if(c.topic) topics[c.topic.toLowerCase().replace(/[^a-z]/g, '')] = c.topic; });
  var norm = function(x){ return String(x || '').toLowerCase().replace(/\s+/g, ''); };
  list.forEach(function(it){
    if(!it || !it.term) return;
    var cat = String(it.category || '').toLowerCase().replace(/[^a-z]/g, '');
    var topic = topics[String(it.term).toLowerCase().replace(/[^a-z]/g, '')] || topics[cat] || MOA_GLOSSARY_CAT[cat] || '';
    if(topic && !topics[topic.toLowerCase().replace(/[^a-z]/g, '')]) topic = '';
    var words = [it.term].concat(it.aliases || []);
    words.forEach(function(w){
      var k = norm(w);
      if(!k) return;
      if(MOA_GLOSSARY_TERM[k] === undefined) MOA_GLOSSARY_TERM[k] = it.term;
      if(topic && MOA_GLOSSARY[k] === undefined) MOA_GLOSSARY[k] = topic;
      if(/\s/.test(String(w).trim()) && k.length > 2) MOA_GLOSSARY_PHRASE.push({ k: k, term: it.term, topic: topic });
    });
  });
  return list.length;
}
/* 질문 → { topics, terms } */
function moaGlossaryMatch(question, qs){
  if(!Object.keys(MOA_GLOSSARY_TERM).length) moaBuildGlossary();
  var topics = [], terms = [];
  var add = function(topic, term){
    if(topic && topics.indexOf(topic) < 0) topics.push(topic);
    if(term && terms.indexOf(term) < 0) terms.push(term);
  };
  var flat = String(question || '').toLowerCase().replace(/\s+/g, '');
  MOA_GLOSSARY_PHRASE.forEach(function(p){ if(flat.indexOf(p.k) > -1) add(p.topic, p.term); });
  (qs || []).forEach(function(t){
    var term = MOA_GLOSSARY_TERM[t], topic = MOA_GLOSSARY[t];
    if(term === undefined) Object.keys(MOA_GLOSSARY_TERM).forEach(function(k){ if(term === undefined && t.indexOf(k) === 0 && (k.length > 1 || (/[가-힣]/.test(k) && /^(이랑|랑|과|와|은|는|이|가|을|를|의|도|하고|에서|에)?$/.test(t.slice(1))))){ term = MOA_GLOSSARY_TERM[k]; topic = MOA_GLOSSARY[k]; } });
    if(term !== undefined) add(topic, term);
  });
  return { topics: topics, terms: terms };
}

/* 사용 시점(적용 상황) 질문 */
var MOA_USAGE_RE = /언제|어떤(상황|경우|때)|어디에?(써|쓰|사용)|무슨(상황|경우)|용도|쓰임|사용처|적용상황|when/i;
var MOA_USAGE_HEAD = /적용 ?상황|사용처|사용 ?용도|사용 ?기준|케이스별/;
var MOA_COMPARE_RE = /비교|차이|다른점|다른가|다르|달라|구분|vs|versus|compare|difference/i;
var MOA_COMPARE_HINT = '\n\n(질문 의도: 비교 — 반드시 아래 순서로 답하세요.\n1) 카테고리별로 [카테고리명] 제목 아래 "정의"와 "용도(언제 쓰는지)"를 context의 정의·적용 상황 항목으로 각각 설명\n2) 그 다음 "차이" 항목에서 같은 기준(용도, 형태, 크기, 상태 등)으로 차이를 정리\n한쪽 근거가 없으면 없다고 밝히세요.)';
var MOA_LEADS = ['~을 정리해드릴게요.','~에 대해 확인해봤어요.','~ 가이드를 살펴봤어요.','~ 기준을 짚어볼게요.','~에 대한 내용이에요.','~ 관련 규격을 모아봤어요.','~은 이렇게 쓰면 돼요.','~이 궁금하시군요!'];
var moaLeadRecent = [];
/* 설명구 마무리 문구: 직전 3개와 겹치지 않게 랜덤 선택 */
function moaPickLead(){
  var pool = MOA_LEADS.filter(function(l){ return moaLeadRecent.indexOf(l) < 0; });
  var l = pool[Math.floor(Math.random() * pool.length)];
  moaLeadRecent.push(l); if(moaLeadRecent.length > 3) moaLeadRecent.shift();
  return l;
}
function moaLeadHint(){
  return '\n\n(답변의 첫 줄은 제목 한 문장만 단독으로 쓰고 줄을 바꾸세요. 제목은 반드시 "' + moaPickLead() + '" 형식으로 끝내세요. ~ 자리에 질문의 핵심 키워드를 넣고, 받침에 따라 조사(을/를, 이/가, 은/는)를 자연스럽게 맞추세요. 제목에는 기호를 붙이지 마세요. 예: "프라이머리 버튼과 세컨더리 버튼 차이를 정리해드릴게요." 둘째 줄부터 설명구와 본문을 이어서 쓰세요.)';
}
var MOA_USAGE_HINT = '\n\n(질문 의도: 적용 상황 — 언제, 어떤 상황에서 쓰는지를 context의 적용 상황 항목으로 답하세요.)';
var MOA_TOKEN_STOP = ['언제','사용','사용해','써','쓰는','쓰는건데','사용하는건데','상황','토큰','token','tokens','변수','컬러','색','색상','color','값','알려줘','뭐야','무엇','어떻게','무슨','어떤','있어','코드','hex'];
var MOA_FOUNDATION = ['Color','Typeface','Spacing','Radius','Dimmed & Shadow','Opacity','Motion','Border','Gradient'];
/* 토큰 이름 검색용 한→영 상태·속성 단어 */
var MOA_EN = {
  '선택':'selected','선택됨':'selected','라벨':'label','텍스트':'text','글자':'text','배경':'background','배경색':'background','호버':'hover',
  '비활성':'disabled','비활성화':'disabled','눌림':'pressed','프레스':'pressed','테두리':'border','보더':'border','아이콘':'icon','밑줄':'underline',
  '다크':'dark','다크모드':'dark','라이트':'light','기본':'default','포커스':'focus','에러':'error','오류':'error','높이':'height','너비':'width',
  '간격':'gap','패딩':'padding','크기':'size','사이즈':'size','행간':'lineheight','자간':'letterspacing','굵기':'weight','폰트':'family','그림자':'shadow',
  '라운드':'radius','모서리':'corner','투명도':'opacity','핸들':'handle','트랙':'track','인디케이터':'indicator','제목':'title','본문':'body','캡션':'caption'
};
function moaEnglish(qs){
  var out = [];
  qs.forEach(function(t){ var e = MOA_EN[t]; if(!e) Object.keys(MOA_EN).forEach(function(k){ if(!e && t.indexOf(k) === 0) e = MOA_EN[k]; }); if(e && out.indexOf(e) < 0) out.push(e); });
  return out;
}

function moaTokenize(s){
  /* 영어 뒤에 붙은 조사 분리 (resting은 → resting) */
  return String(s).toLowerCase().replace(/([a-z0-9#._]+)(?:은|는|이|가|을|를|의|에|로|으로|도|란|이란|이랑|랑|과|와|에서|이야|야|이에요|예요)(?=[^\uac00-\ud7a3]|$)/g, '$1 ').replace(/[^\uac00-\ud7a3a-z0-9#.]+/g,' ').split(' ').filter(function(t){ return t.length > 1 || /[\uac00-\ud7a3]/.test(t); });
}

function moaHead(ch){ return String(ch.title || ch.section || ch.group || ''); }

function moaScore(ch, qs){
  var head = moaHead(ch).toLowerCase();
  var hay = (head + ' ' + (ch.text || '')).toLowerCase();
  var score = 0;
  qs.forEach(function(t){
    if(head.indexOf(t) > -1) score += 3;
    var i = -1, n = 0;
    while((i = hay.indexOf(t, i + 1)) > -1){ n++; if(n > 4) break; }
    score += n;
  });
  return score;
}

/* 한글 음차·붙여쓰기 보정 — data/db_glossary/ko_en.md
   이 파일 항목은 질문 안에 붙여 써도(세컨더리버튼) 찾고, 영어 용어(primary…)로도 검색 */
var MOA_KOEN_SRC = 'ko_en.md';
function moaParseKoEn(md){
  var out = [];
  String(md).replace(/\r/g, '').split('\n').forEach(function(l){
    var m = /^\s*-\s*`([^`]+)`\s*:\s*(.+)$/.exec(l);
    if(!m || /영어 용어/.test(m[1])) return;
    out.push({ term:m[1].trim(), category:'한글 표기', aliases:m[2].split(',').map(function(s){ return s.trim(); }).filter(Boolean), source:MOA_KOEN_SRC });
  });
  return out;
}
var moaTokenizeBase = moaTokenize;
moaTokenize = function(q){
  var out = moaTokenizeBase(q), s = String(q || '').toLowerCase().replace(/\s+/g, '');
  (window.MOA_GLOSSARY_DB || []).forEach(function(it){
    if(!it || it.source !== MOA_KOEN_SRC) return;
    var hit = (it.aliases || []).filter(function(a){ a = String(a).toLowerCase().replace(/\s+/g, ''); return a && s.indexOf(a) > -1; });
    if(!hit.length) return;
    hit.concat(String(it.term).split('/')).forEach(function(t){ t = String(t).toLowerCase().trim(); if(t && out.indexOf(t) < 0) out.push(t); });
  });
  return out;
};
/* glossary.md → [{term, category, aliases}] — 카테고리 = 가장 가까운 ##/### 제목(괄호 안 영문 우선). build.js와 같은 규칙.
   최신 파일 덮어쓰기는 moaLoadDb()가 함께 처리합니다. */
function moaParseGlossary(md){
  var out = [], cat = '';
  String(md).replace(/\r/g, '').split('\n').forEach(function(l){
    var h = /^(#{2,3})\s+(.*)$/.exec(l);
    if(h){
      if(/^#/.test(h[2])) return;
      var t = moaClean(h[2]), p = /\(([^)]*[A-Za-z][^)]*)\)\s*$/.exec(t);
      t = p && !/[가-힣]/.test(p[1]) ? p[1].trim() : t.replace(/\s*\([^)]*\)\s*$/, '').trim();
      if(h[1].length === 3 && /[가-힣]/.test(t)) return; /* 한글 소제목(###)은 상위 ## 카테고리 유지 */
      if(t) cat = t;
      return;
    }
    var m = /^\s*-\s*`([^`]+)`\s*:\s*(.+)$/.exec(l);
    if(m) out.push({ term: m[1].trim(), category: cat, aliases: m[2].split(',').map(function(s){ return s.trim(); }).filter(Boolean), source: 'glossary.md' });
  });
  return out;
}

/* 기존 호환용 단순 검색 */
function moaSearch(query, limit){
  var qs = moaTokenize(query);
  if(!qs.length) return [];
  return (window.MOA_DB || []).map(function(ch){ return { ch: ch, score: moaScore(ch, qs) }; })
    .filter(function(r){ return r.score > 0; })
    .sort(function(a,b){ return b.score - a.score; })
    .slice(0, limit || 6).map(function(r){ return r.ch; });
}

function moaContext(chunks){
  return chunks.map(function(ch){
    return '### ' + (ch.kind === 'token' ? '[토큰] ' : '') + (ch.source || '') + (moaHead(ch) ? ' / ' + moaHead(ch) : '') + '\n' + ch.text;
  }).join('\n\n');
}

/* 답변 형식: 의도 파악 불가 → {"valid": false} / 가능 → {"valid": true, "answer": "..."} */
var MOA_JSON_RULE = '\n\n[출력 형식 — 반드시 지킬 것]\n질문의 의도를 파악할 수 없으면 {"valid": false}\n파악되면 {"valid": true, "answer": "..."} 형식으로만 답하세요.\n- valid=false는 질문 자체가 무슨 뜻인지 알 수 없을 때(무의미한 문자열, 디자인 시스템과 무관해 해석 불가한 표현)에만 쓰세요.\n- 질문 의도는 이해했지만 context(가이드)에서 답을 찾지 못하면 valid=false를 쓰지 말고 {"valid": true, "answer": "가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요."}로 답하세요.\nanswer 안에는 기존 답변 규칙(마크다운 포함)을 그대로 따른 답변 본문을 넣으세요. JSON 외의 텍스트는 쓰지 마세요.';
function moaParseValid(raw){
  var s = String(raw || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try {
    var j = JSON.parse(s);
    if(j && j.valid === false) return { valid: false };
    if(j && typeof j.answer === 'string') return { valid: true, answer: j.answer.trim() };
  } catch(_){
    if(/^\{\s*"valid"\s*:\s*false/.test(s)) return { valid: false };
    var m = s.match(/"answer"\s*:\s*"([\s\S]*?)(?:"\s*\}?\s*)?$/);
    if(m){ try { return { valid: true, answer: JSON.parse('"' + m[1] + '"') }; } catch(__){ return { valid: true, answer: m[1].replace(/\\n/g, '\n') }; } }
  }
  return { valid: true, answer: s };
}
function moaText(json){
  var cand = json && json.candidates && json.candidates[0];
  var parts = (cand && cand.content && cand.content.parts) || [];
  return parts.filter(function(p){ return typeof p.text === 'string' && !p.thought; }).map(function(p){ return p.text; }).join('').trim();
}
var MOA_REASON = {
  MAX_TOKENS:'답변 길이 한도 초과', SAFETY:'안전 필터 차단', RECITATION:'인용 제한으로 차단',
  PROHIBITED_CONTENT:'금지 콘텐츠로 차단', BLOCKLIST:'차단 단어 포함', OTHER:'기타 사유로 중단', STOP:'정상 종료했지만 텍스트 없음'
};
function moaWhy(json){
  var cand = json && json.candidates && json.candidates[0];
  var block = json && json.promptFeedback && json.promptFeedback.blockReason;
  var r = block ? '질문 차단 ' + block : (cand ? (cand.finishReason || '사유 없음') : '후보 답변 없음');
  var label = MOA_REASON[cand && cand.finishReason];
  var u = (json && json.usageMetadata) || {};
  var parts = (cand && cand.content && cand.content.parts) || [];
  return r + (label && !block ? ' · ' + label : '') +
    ' · 토큰 입력 ' + (u.promptTokenCount || 0) + ' / 생각 ' + (u.thoughtsTokenCount || 0) + ' / 출력 ' + (u.candidatesTokenCount || 0) +
    ' · parts ' + parts.length;
}

/* Gemini 연결 확인: 키로 모델 목록을 1건 조회 */
/* 키 검증: 'ok' | 'invalid' | 'network' */
function moaVerifyKey(apiKey, retried){
  if(!apiKey) return Promise.resolve('invalid');
  var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var tm = setTimeout(function(){ if(ctl) ctl.abort(); }, 15000);
  return fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1&key=' + encodeURIComponent(apiKey), ctl ? { signal: ctl.signal } : {})
    .then(function(r){
      clearTimeout(tm);
      if(r.ok) return 'ok';
      return r.text().then(function(t){
        var body = String(t || '');
        try { var j = JSON.parse(body); window.moaKeyErr = (j.error && (j.error.status + ' · ' + j.error.message)) || ''; } catch(_){ window.moaKeyErr = 'HTTP ' + r.status; }
        if(/API_KEY_INVALID|API key not valid|API_KEY_EXPIRED|expired/i.test(body)) return 'invalid';
        if(/SERVICE_DISABLED|has not been used|is disabled|API_KEY_SERVICE_BLOCKED|SERVICE_BLOCKED/i.test(body)) return 'disabled';
        if(/location is not supported|FAILED_PRECONDITION/i.test(body)) return 'region';
        if(r.status === 429 || /RESOURCE_EXHAUSTED/i.test(body)) return 'ok';
        if(r.status === 400 || r.status === 401) return 'invalid';
        if(r.status === 403) return 'disabled';
        return 'network';
      }).catch(function(){ return r.status === 400 || r.status === 401 ? 'invalid' : 'network'; });
    })
    .catch(function(e){ clearTimeout(tm); if(!retried) return moaVerifyKey(apiKey, true); window.moaKeyErr = (e && e.name === 'AbortError') ? '응답 시간 초과' : '요청 차단 또는 네트워크 오류'; return 'network'; });
}
/* 붙여넣기 시 섞이는 공백·줄바꿈·보이지 않는 문자·따옴표 제거 */
function moaCleanKey(v){ return String(v || '').replace(/[\s\u200B-\u200D\u2060\uFEFF\u00A0"'`]/g, ''); }

function moaPing(apiKey){
  if(!apiKey) return Promise.resolve(false);
  if(typeof navigator !== 'undefined' && navigator.onLine === false) return Promise.resolve(false);
  var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var tm = setTimeout(function(){ if(ctl) ctl.abort(); }, 6000);
  return fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1&key=' + encodeURIComponent(apiKey), ctl ? { signal: ctl.signal } : {})
    .then(function(r){ clearTimeout(tm); return r.ok; })
    .catch(function(){ clearTimeout(tm); return false; });
}

/* 무료 사용량 추적 (Gemini API는 잔여량을 알려주지 않아 이 기기에서 보낸 요청 수로 추정)
   하루 한도는 무료 등급 기준 추정치 · 미국 태평양 시간 자정에 초기화 */
var MOA_FREE_RPD = { 'gemini-3.8-flash': 20, 'gemini-3.5-flash': 20, 'gemini-3.1-flash-lite': 500, 'gemini-flash-lite-latest': 500 };
var moaMem = {};
function moaStore(k, v){
  try { if(v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(_){ if(v === undefined) return moaMem[k]; moaMem[k] = v; }
}
function moaDay(){
  try { return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' }); } catch(_){ return new Date().toISOString().slice(0, 10); }
}
function moaUsageAll(){
  var u = {}; try { u = JSON.parse(moaStore('moa_usage') || '{}'); } catch(_){}
  if(u.day !== moaDay()) u = { day: moaDay(), used: {}, last: u.last || '' };
  u.used = u.used || {};
  return u;
}
function moaCount(model, exhausted){
  var u = moaUsageAll();
  u.used[model] = exhausted ? (MOA_FREE_RPD[model] || u.used[model] || 0) : (u.used[model] || 0) + 1;
  if(!exhausted) u.last = model;
  moaStore('moa_usage', JSON.stringify(u));
}
/* 현재 쓰는 모델과 오늘 남은 횟수 */
function moaUsage(){
  var u = moaUsageAll();
  var left = function(m){ return Math.max(0, (MOA_FREE_RPD[m] || 0) - (u.used[m] || 0)); };
  var model = MOA_MODELS.filter(function(m){ return left(m) > 0; })[0] || u.last || MOA_MODELS[0];
  return { model: model, used: u.used[model] || 0, limit: MOA_FREE_RPD[model] || 0, left: left(model) };
}

function moaWait(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

function moaFail(msg){ var e = new Error(msg); e.moa = true; return e; }

/* onDelta(fullText)가 있으면 스트리밍(SSE)으로 받아 글자가 도착하는 대로 알립니다.
   반환값은 generateContent와 같은 모양의 JSON으로 합쳐서 돌려줍니다. */
function moaCall(model, apiKey, body, onDelta){
  var stream = typeof onDelta === 'function';
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model +
    (stream ? ':streamGenerateContent?alt=sse&key=' : ':generateContent?key=') + encodeURIComponent(apiKey);
  var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null, late = false;
  var tm = setTimeout(function(){ late = true; if(ctl) ctl.abort(); }, MOA_CALL_TIMEOUT);
  return fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
    .catch(function(){
      clearTimeout(tm);
      if(late){ var e = moaFail('HTTP 503 · ' + model + ' 응답 시간 초과(' + (MOA_CALL_TIMEOUT / 1000) + '초)'); e.status = 503; throw e; }
      throw moaFail('네트워크 연결 실패 · 인터넷 연결과 manifest의 allowedDomains를 확인해 주세요');
    })
    .then(function(res){
      clearTimeout(tm);
      if(!res.ok){
        return res.text().catch(function(){ return ''; }).then(function(t){
          var json = {}; try { json = JSON.parse(t); } catch(_){}
          if(Array.isArray(json)) json = json[0] || {};
          var m = (json.error && json.error.message) || '';
          if(res.status === 429 && /per ?day|PerDay|daily/i.test(m)) moaCount(model, true);
          var e = moaFail('HTTP ' + res.status + (m ? ' · ' + m : ''));
          e.status = res.status;
          throw e;
        });
      }
      moaCount(model);
      if(!stream) return res.json().catch(function(){ return {}; });
      var merged = { candidates: [{ content: { parts: [] } }] }, text = '', buf = '';
      var eat = function(line){
        line = line.trim();
        if(line.indexOf('data:') !== 0) return;
        var j; try { j = JSON.parse(line.slice(5)); } catch(_){ return; }
        var c = j.candidates && j.candidates[0];
        var t = moaText(j);
        if(t || (c && c.content && c.content.parts)){
          var raw = ((c && c.content && c.content.parts) || []).filter(function(p){ return typeof p.text === 'string' && !p.thought; }).map(function(p){ return p.text; }).join('');
          if(raw){ text += raw; onDelta(text); }
        }
        if(c && c.finishReason) merged.candidates[0].finishReason = c.finishReason;
        if(j.usageMetadata) merged.usageMetadata = j.usageMetadata;
        if(j.promptFeedback) merged.promptFeedback = j.promptFeedback;
      };
      var finish = function(){ if(buf) eat(buf); merged.candidates[0].content.parts = text ? [{ text: text }] : []; return merged; };
      if(!res.body || !res.body.getReader){
        return res.text().then(function(all){ all.split(/\r?\n/).forEach(eat); return finish(); });
      }
      var reader = res.body.getReader(), dec = new TextDecoder();
      var pump = function(){
        return reader.read().then(function(r){
          if(r.done) return finish();
          buf += dec.decode(r.value, { stream: true });
          var lines = buf.split(/\r?\n/); buf = lines.pop();
          lines.forEach(eat);
          return pump();
        });
      };
      return pump().catch(function(err){
        if(err && err.moa) throw err;
        if(text){ merged.candidates[0].finishReason = merged.candidates[0].finishReason || 'STOP'; return finish(); }
        throw moaFail('스트리밍 중 연결이 끊겼어요');
      });
    });
}

/* ── 가벼운 대화 (디자인 시스템과 무관한 인사·감사·안부 등) ──────
   디자인 관련이면 {"chat": false} → 일반 가이드 검색으로. 디자인 내용·수치는 절대 만들지 않음 */
var MOA_CHAT_RULE = [
  '너는 디자인 시스템 가이드 챗봇 "Moa"야. 받은 메시지가 디자인 시스템과 무관한 가벼운 일상 대화(인사, 감사, 안부, 칭찬, 자기소개 요청, 가벼운 감정 표현 등)인지 판단해.',
  '- 디자인·UI·색상·폰트·간격·컴포넌트·스펙·수치·토큰·피그마 등 디자인과 조금이라도 관련 있으면 반드시 {"chat": false}만 출력해. 디자인 관련 내용은 절대 답하거나 지어내지 마.',
  '- 가벼운 대화면 {"chat": true, "answer": "..."}: 1~2문장, 친근하고 긍정적인 존댓말(~요). 마지막에 디자인 시스템에서 궁금한 걸 물어봐 달라고 자연스럽게 안내해.',
  '- 날씨·뉴스·시세·코딩·상식 검색처럼 정보를 요구하는 질문은 답하지 말고 {"chat": true, "answer": "..."}로 디자인 시스템 가이드만 도와드릴 수 있다고 정중히 안내해.',
  '- 부정적·공격적·민감한 주제(정치, 종교, 혐오, 성적 내용, 비방 등)는 의견 없이 가볍게 넘기고 디자인 시스템 질문으로 안내해.',
  '- 사실 정보·숫자·링크·이모지는 쓰지 마. JSON만 출력해.'
].join('\n');
function moaChat(question, apiKey){
  if(!apiKey) return Promise.resolve(null);
  var models = MOA_MODELS.filter(function(m){ return !moaSkip(m); }).slice(0, 2);
  var tryAt = function(i){
    if(i >= models.length) return Promise.resolve(null);
    var body = { systemInstruction: { parts: [{ text: MOA_CHAT_RULE }] }, contents: [{ role: 'user', parts: [{ text: String(question) }] }], generationConfig: moaGenCfg(models[i]) };
    return moaCall(models[i], apiKey, body).then(function(json){
      var s = String(moaText(json) || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
      var j = null; try { j = JSON.parse(s); } catch(_){ return tryAt(i + 1); }
      if(!j || j.chat !== true || !j.answer) return null;
      var a = String(j.answer).trim();
      if(/#[0-9a-f]{3,8}\b|\d\s?(px|pt|dp|%)|https?:/i.test(a)) return null; /* 디자인 수치·링크가 섞이면 버림 */
      return { model: models[i], text: a };
    }, function(){ return tryAt(i + 1); });
  };
  return tryAt(0).catch(function(){ return null; });
}
if(typeof window !== 'undefined') window.moaChat = moaChat;

/* ── 6단계 파이프라인 ───────────────────────────────────────── */
/* 지금 카테고리에서 먼저 답을 찾고, 없으면 다른 카테고리에서 다시 찾음 */
function moaAsk(question, apiKey, opts){
  opts = opts || {};
  var own = opts.topic;
  return moaAskOnce(question, apiKey, opts).then(function(res){
    var none = !res.grounded || /가이드에 해당 내용이 없/.test(String(res.text || '').slice(0, 80));
    /* Moa(카테고리 없음) 창: 근거가 가장 많이 나온 카테고리 창으로 안내 */
    if(!own && !opts.compareTopics && !none){
      var cnt = {}, best = null;
      (res.hitTopics || []).forEach(function(t){ if(t){ cnt[t] = (cnt[t] || 0) + 1; if(!best || cnt[t] > cnt[best]) best = t; } });
      res.movedTo = best;
      return res;
    }
    /* 카테고리 창: 해당 카테고리 안에서만 검색 (다른 카테고리로 다시 찾지 않음) */
    if(own) return res;
    if(opts.compareTopics || !none || !apiKey) return res;
    var o2 = {}; Object.keys(opts).forEach(function(k){ o2[k] = opts[k]; });
    o2.topic = null; o2.excludeTopic = own;
    return moaAskOnce(question, apiKey, o2).then(function(r2){
      var none2 = !r2.grounded || /가이드에 해당 내용이 없/.test(String(r2.text || '').slice(0, 80));
      if(none2) return res;
      r2.movedTo = (r2.hitTopics || []).filter(function(t){ return t && t !== own; })[0] || null;
      return r2;
    }, function(){ return res; });
  });
}
function moaAskOnce(question, apiKey, opts){
  opts = opts || {};
  var report = opts.onStep || function(){};
  var cur = -1;
  function begin(i){ cur = i; report(i, 'run'); return moaWait(opts.stepDelay || 0); }
  function end(i, detail, status){ report(i, status || 'done', detail || ''); }
  function skipRest(from, detail){ for(var k = from; k < MOA_STEPS.length; k++) report(k, 'skip', k === from ? detail : ''); }

  var qs, sq, usage = false, topics = [], hits = [], faqs = [], db = window.MOA_DB || [];
  var hist = (opts.history || []).slice(-5);
  var last = hist[hist.length - 1];

  return moaLoadDb()
  .then(function(){ db = window.MOA_DB || []; })
  /* 1 */
  .then(function(){ return begin(0); })
  .then(function(){
    qs = moaTokenize(question);
    usage = MOA_USAGE_RE.test(String(question).replace(/\s+/g, ''));
    if(!qs.length) throw moaFail('질문에서 키워드를 찾지 못했어요');
    sq = qs.slice();
    if(last){ moaTokenize(last.q).forEach(function(t){ if(sq.indexOf(t) < 0) sq.push(t); }); }
    end(0, '키워드 ' + qs.slice(0, 6).join(', ') + (hist.length ? '\n이전 대화 ' + hist.length + '개 이어서' : ''));
  })
  /* 2 */
  .then(function(){ return begin(1); })
  .then(function(){
    var names = {};
    db.concat(window.MOA_TOKENS || []).forEach(function(c){ if(c.topic) names[c.topic.toLowerCase()] = c.topic; });
    var gm = moaGlossaryMatch(question, qs);
    gm.topics.forEach(function(t){ if(topics.indexOf(t) < 0) topics.push(t); });
    qs.forEach(function(t){ var hit = names[t]; if(hit && topics.indexOf(hit) < 0) topics.push(hit); });
    gm.terms.forEach(function(t){ var k = String(t).toLowerCase(); if(sq.indexOf(k) < 0) sq.push(k); });
    var inherited = false;
    if(opts.compareTopics && opts.compareTopics.length){ opts.compareTopics.forEach(function(t){ if(topics.indexOf(t) < 0) topics.push(t); }); }
    var onlyBase = topics.every(function(t){ return MOA_FOUNDATION.indexOf(t) > -1; });
    /* 카테고리 창: 이전 질문 주제는 같은 카테고리일 때만 이어받음 (다른 카테고리 스펙이 섞이지 않게) */
    if(last && last.topics && onlyBase && !opts.compareTopics){ last.topics.forEach(function(t){ if(opts.topic && t !== opts.topic) return; if(topics.indexOf(t) < 0){ topics.push(t); inherited = true; } }); }
    if(opts.topic && !opts.compareTopics){ topics = topics.filter(function(t){ return t === opts.topic; }); if(topics.indexOf(opts.topic) < 0) topics.unshift(opts.topic); }
    var termTxt = gm.terms.length ? '\n용어 ' + gm.terms.slice(0, 6).join(', ') : '';
    if(opts.compareTopics) termTxt += '\n비교 모드 · ' + opts.compareTopics.join(' vs ');
    end(1, (topics.length ? topics.join(', ') + (inherited ? ' (이전 질문 주제 포함)' : '') : '매핑된 주제 없음 · 전체 DB 검색') + termTxt, (topics.length || gm.terms.length) ? 'done' : 'warn');
  })
  /* 3 */
  .then(function(){ return begin(2); })
  .then(function(){
    var tokens = window.MOA_TOKENS || [];
    if(!db.length && !tokens.length) throw moaFail('DB가 비어 있어요 · data/DB_guide, data/DB_tokens를 넣고 다시 빌드해 주세요');
    var search = function(list, isToken){
      var eq = isToken ? sq.concat(moaEnglish(sq), topics.map(function(t){ return t.toLowerCase().replace(/ & | /g, '_'); })).filter(function(t){ return MOA_TOKEN_STOP.indexOf(t) < 0; }) : sq;
      var comp = topics.filter(function(t){ return MOA_FOUNDATION.indexOf(t) < 0; });
      return Promise.resolve().then(function(){
        return list.map(function(ch){
          var s = moaScore(ch, eq);
          if(!isToken && usage){
            var hd = moaHead(ch);
            if(MOA_USAGE_HEAD.test(hd)) s += (topics.length && topics.indexOf(ch.topic) < 0) ? 2 : (/적용 ?상황|사용처/.test(hd) ? 30 : 12);
            else if(/사용 ?규칙|usage/i.test(hd) && (!topics.length || topics.indexOf(ch.topic) > -1)) s += 3;
          }
          if(isToken && topics.indexOf(ch.topic) > -1) s += 2;
          /* 비교: 비교 대상 카테고리의 가이드 핵심 섹션은 키워드 점수와 무관하게 포함 */
          if(!isToken && opts.compareTopics && opts.compareTopics.indexOf(ch.topic) > -1){
            var hd2 = moaHead(ch);
            s += /정의|개요|타입별 ?요약|적용 ?상황|사용 ?기준|용도/.test(hd2) ? 6 : 1;
          }
          if(isToken && comp.indexOf(ch.topic) > -1) s += 4;
          return { ch: ch, score: s };
        }).filter(function(r){ return r.score > 0; });
      });
    };
    return Promise.all([search(db, false), search(tokens, true)]).then(function(res){
      hits = { guide: res[0], token: res[1] };
      var n = res[0].length + res[1].length;
      end(2, '가이드 ' + res[0].length + '건 · 토큰 ' + res[1].length + '건 검색됨\nDB: ' + moaDbFrom, n ? 'done' : 'warn');
    });
  })
  /* 4 */
  .then(function(){ return begin(3); })
  .then(function(){
    var rank = function(list, n){
      /* 지금 카테고리 안에서 먼저 찾고, 없을 때만 다른 카테고리 */
      /* 카테고리 창: 해당 카테고리 근거만 사용 (다른 카테고리로 넘어가지 않음) */
      if(opts.topic && !opts.compareTopics) list = list.filter(function(r){ return r.ch.topic === opts.topic; });
      if(opts.excludeTopic){ var other = list.filter(function(r){ return r.ch.topic !== opts.excludeTopic; }); if(other.length) list = other; }
      list.forEach(function(r){ if(topics.indexOf(r.ch.topic) > -1) r.score *= 2; });
      list.sort(function(a,b){ return b.score - a.score; });
      return list.slice(0, n).map(function(r){ return r.ch; });
    };
    /* 비교 질문: 카테고리마다 근거를 고르게 가져옴 */
    var rankEach = function(list, per){
      var out = [];
      opts.compareTopics.forEach(function(tp){ out = out.concat(rank(list.filter(function(r){ return r.ch.topic === tp; }), per)); });
      return out;
    };
    var cmp = opts.compareTopics && opts.compareTopics.length > 1;
    var g = cmp ? rankEach(hits.guide, 3) : rank(hits.guide, 5), t = cmp ? rankEach(hits.token, usage ? 0 : 2) : rank(hits.token, usage ? 0 : 4);
    /* 지금 카테고리 가이드에서 키워드가 하나도 안 걸리면, 그 카테고리의 핵심 섹션(정의·타입별 요약 등)을 근거로 넣음 */
    if(!g.length && opts.topic && !cmp){
      g = db.filter(function(c){ return c.topic === opts.topic && /정의|개요|타입별 ?요약|적용 ?상황|사용 ?기준|용도/.test(moaHead(c)); }).slice(0, 5);
    }
    /* 스펙·토큰 질문인데 키워드가 안 걸리면 해당 카테고리 토큰 전체를 근거로 */
    if(!t.length && !usage && opts.topic && !cmp) t = (window.MOA_TOKENS || []).filter(function(c){ return c.topic === opts.topic; }).slice(0, 4);
    hits = g.concat(t);
    /* FAQ 형식: 지금 카테고리 → 질문에서 찾은 주제 → 근거 상위 주제 순 */
    var ft = [], addT = function(x){ if(x && x !== opts.excludeTopic && ft.indexOf(x) < 0) ft.push(x); };
    addT(opts.topic); topics.forEach(addT); g.slice(0, 2).forEach(function(c){ addT(c.topic); });
    faqs = cmp ? [] : moaFaqMatch(question, ft, 3);
    var lab = function(c){ return (c.topic ? c.topic + ' › ' : '') + moaHead(c); };
    var info = (g.length ? '가이드: ' + g.slice(0, 2).map(lab).join(' / ') : '') + (g.length && t.length ? '\n' : '') + (t.length ? '토큰: ' + t.slice(0, 3).map(function(c){ return moaHead(c).replace(/ 토큰$/, ''); }).join(', ') : '');
    if(faqs.length) info += '\nFAQ 형식: ' + faqs.map(function(f){ return f.q; }).slice(0, 2).join(' / ');
    end(3, hits.length ? info : '매칭된 결과 없음', hits.length ? 'done' : 'warn');
  })
  /* 5 */
  .then(function(){ return begin(4); })
  .then(function(){
    if(!hits.length){
      end(4, '가이드에 근거가 없어 답변할 수 없어요', 'warn');
      skipRest(5, '생략');
      return { text: MOA_NO_ANSWER, sources: [], grounded: false, done: true, topics: topics, reason: '5단계(답변 가능 여부 검증) · 가이드와 토큰에서 질문과 맞는 근거를 찾지 못했어요' + (topics.length ? ' (주제: ' + topics.join(', ') + ')' : '') };
    }
    if(!apiKey){
      end(4, 'API 키 없음 · 가이드 원문으로 대신 답변', 'warn');
      skipRest(5, '생략');
      return { text: hits[0].text, sources: hits.map(function(h){ return h.source; }), grounded: true, offline: true, done: true, topics: topics };
    }
    end(4, '근거 ' + hits.length + '건 · 답변 가능');
  })
  /* 6 */
  .then(function(early){
    if(early && early.done) return early;
    return begin(5).then(function(){ return moaLoadPrompts(); }).then(function(){
      report(5, 'run', '프롬프트: ' + moaPromptSource());
      var body = {
        systemInstruction: { parts: [{ text: moaSystem() + MOA_JSON_RULE }] },
        contents: [].concat.apply([], hist.map(function(h){
          return [{ role: 'user', parts: [{ text: h.q }] }, { role: 'model', parts: [{ text: String(h.a || '').slice(0, 1200) }] }];
        })).concat([{ role: 'user', parts: [{ text: '<context>\n' + moaContext(hits) + '\n</context>\n\n' + moaFaqContext(faqs) + '질문: ' + question + (usage ? MOA_USAGE_HINT : '') + (opts.compareTopics ? MOA_COMPARE_HINT : '') + moaLeadHint() }] }]),
      };
      var tried = [], fails = [], plain = false;
      function next(i){
        while(i + 1 < MOA_MODELS.length && moaSkip(MOA_MODELS[i])) i++;
        var model = MOA_MODELS[i];
        tried.push(model);
        report(5, 'run', model + ' 호출 중');
        var req = JSON.parse(JSON.stringify(body));
        req.generationConfig = moaGenCfg(model);
        return moaCall(model, apiKey, req, opts.onDelta).catch(function(err){
          /* 모델이 생각 설정을 거부(400)하면 같은 모델로 설정 없이 한 번 더 */
          if(err.status === 400 && req.generationConfig.thinkingConfig){
            MOA_NO_THINK[model] = true;
            var r2 = JSON.parse(JSON.stringify(body)); r2.generationConfig = moaGenCfg(model);
            return moaCall(model, apiKey, r2, opts.onDelta);
          }
          throw err;
        }).catch(function(err){
          if(err.status === 503 || err.status === 500) MOA_COOL[model] = Date.now() + 300000;
          if(err.status === 429 && !/per ?minute|PerMinute/i.test(err.message)) moaCount(model, true);
          if([400, 404, 429, 500, 503].indexOf(err.status) > -1 && !/API key/i.test(err.message) && i + 1 < MOA_MODELS.length){
            fails.push(model + ' ' + err.status);
            return next(i + 1);
          }
          if(fails.length) err.message += ' (앞선 시도: ' + fails.join(', ') + ')';
          if(err.status === 403 || /API key/i.test(err.message)) err.message += ' · API 키를 확인해 주세요';
          if(err.status === 429) err.message += ' · 사용량 한도 초과';
          err.message = model + ' · ' + err.message;
          throw err;
        }).then(function(json){
          var text = moaText(json);
          if(text) return { text: text, model: model };
          var why = moaWhy(json);
          if(console && console.warn) console.warn('[moa] empty response', model, json);
          /* 빈 응답은 같은 모델 재시도 대신 5분간 건너뛰고 바로 다음 모델 */
          MOA_COOL[model] = Date.now() + 300000;
          if(false){
            plain = true;
            report(5, 'run', model + ' 빈 응답 (' + why + ') · 기본 설정으로 재시도');
            var retry = JSON.parse(JSON.stringify(body));
            retry.generationConfig = { maxOutputTokens: 8192, responseMimeType: 'application/json' };
            return moaCall(model, apiKey, retry, opts.onDelta).then(function(j2){
              var t2 = moaText(j2);
              if(t2) return { text: t2, model: model };
              return emptyNext(model, moaWhy(j2), i);
            }, function(){ return emptyNext(model, why, i); });
          }
          return emptyNext(model, why, i);
        });
      }
      function emptyNext(model, why, i){
        fails.push(model + ' 빈 응답');
        plain = false;
        if(i + 1 < MOA_MODELS.length) return next(i + 1);
        throw moaFail(model + ' · 답변이 비어 있어요 (' + why + ')' + (fails.length > 1 ? ' (앞선 시도: ' + fails.slice(0, -1).join(', ') + ')' : ''));
      }
      /* 근거(hits)가 있는데 "가이드에 해당 내용이 없습니다"로 답하면 한 번 더 시도 — 같은 질문을 두 번 해야 답하던 문제 */
      return next(0).then(function(r){
        if(!/가이드에 해당 내용이 없/.test(String(r.text).slice(0, 80))) return r;
        report(5, 'run', r.model + ' · 근거가 있어 상위 모델로 다시 확인 중');
        var lp = body.contents[body.contents.length - 1].parts[0];
        lp.text += '\n\n(위 <context>에 질문과 관련된 가이드 내용이 있습니다. "가이드에 해당 내용이 없습니다"로 답하지 말고 context 내용만 근거로 답하세요. context에 관련 내용이 정말 하나도 없을 때만 그 문장을 쓰세요.)';
        plain = false; fails = [];
        return next(MOA_UPPER < MOA_MODELS.length ? MOA_UPPER : 0).catch(function(){ return r; });
      });
    }).then(function(r){
      var pj = moaParseValid(r.text);
      if(pj.valid === false){
        end(5, r.model + ' · 질문 의도 파악 불가', 'warn');
        return { text: '', invalid: true, sources: [], grounded: true, model: r.model, topics: topics };
      }
      var text = pj.answer;
      end(5, r.model + ' · 완료 · 프롬프트: ' + moaPromptSource());
      return { text: text, sources: hits.map(function(h){ return h.source; }), hitTopics: hits.map(function(h){ return h.topic; }), grounded: true, model: r.model, topics: topics };
    });
  })
  .catch(function(err){
    if(cur > -1) report(cur, 'error', err.message || String(err));
    for(var k = cur + 1; k < MOA_STEPS.length; k++) report(k, 'skip', '');
    err.step = cur;
    throw err;
  });
}

window.MOA_STEPS = MOA_STEPS;
window.MOA_NO_ANSWER = MOA_NO_ANSWER;
window.moaAsk = moaAsk;
window.moaUsage = moaUsage;
window.moaSearch = moaSearch;
window.moaLoadPrompts = moaLoadPrompts;
window.moaLoadDb = moaLoadDb;
window.moaParseGuide = moaParseGuide;
window.moaDbSource = moaDbSource;
moaLoadDb(true);
window.moaSystem = moaSystem;

/* Gemini 연동 — DB 데이터에만 근거해 답변.
   플러그인 UI(iframe)에서 직접 호출합니다. manifest.json의
   networkAccess.allowedDomains에 generativelanguage.googleapis.com 이 있어야 합니다.
   답변은 6단계로 진행되며, opts.onStep(index, status, detail)으로 진행 상황을 알립니다.
   status: 'run' | 'done' | 'warn' | 'error' | 'skip' */

/* 앞에서부터 시도하고, 모델이 없으면(404) 다음 모델로 넘어갑니다. */
var MOA_MODELS = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash'];

var MOA_STEPS = [
  '질문 범위 및 의도 확인',
  'Glossary 용어 맵핑',
  '관련 DB 병렬 검색',
  '검색 결과 매칭 및 우선순위 적용',
  '답변 가능 여부 검증',
  '최종 답변 생성'
];

var MOA_NO_ANSWER = '가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요.';

var MOA_SYSTEM = [
  '당신은 사내 디자인 시스템 가이드 챗봇 "모아"입니다.',
  '',
  '규칙:',
  '1. 아래 <context>에 주어진 내용만 근거로 답하세요. context에 없는 내용은 절대 답하지 않습니다.',
  '2. 일반적인 디자인 지식, 다른 디자인 시스템, 추측, 보완 설명을 덧붙이지 마세요.',
  '3. context에서 답을 찾을 수 없으면 정확히 이렇게만 답하세요: "' + MOA_NO_ANSWER + '"',
  '4. 한국어로, 2~4문장으로 간결하게 답하세요. 인사말이나 사족은 넣지 않습니다.',
  '5. 컬러 HEX, 수치, 컴포넌트 이름은 context에 적힌 그대로 옮기세요. 반올림하거나 바꾸지 않습니다.',
  '6. context의 "토큰" 항목은 Figma 변수입니다. 토큰을 답할 때는 토큰 이름(예: tab/standard/label/normal)과 값을 함께 적고, Light/Dark 값이 있으면 둘 다 적으세요. 괄호 안은 참조하는 상위 토큰입니다.'
].join('\n');

/* 한글·약어 → DB 토픽 이름 */
var MOA_GLOSSARY = {
  '컬러':'Color','색상':'Color','색':'Color','color':'Color','hex':'Color','테마':'Color','다크':'Color',
  '폰트':'Typeface','서체':'Typeface','글꼴':'Typeface','타이포':'Typeface','타이포그래피':'Typeface','typeface':'Typeface','font':'Typeface',
  '간격':'Spacing','여백':'Spacing','패딩':'Spacing','마진':'Spacing','spacing':'Spacing','그리드':'Spacing',
  'cta':'CTA Button','버튼':'CTA Button','button':'CTA Button',
  '유틸리티':'Utility Button','utility':'Utility Button',
  '팝업':'Popup','모달':'Popup','다이얼로그':'Popup','popup':'Popup',
  '딤':'Dimmed & Shadow','딤드':'Dimmed & Shadow','그림자':'Dimmed & Shadow','섀도우':'Dimmed & Shadow','shadow':'Dimmed & Shadow','dimmed':'Dimmed & Shadow',
  '아이콘':'Iconography','icon':'Iconography','iconography':'Iconography',
  '라운드':'Radius','모서리':'Radius','곡률':'Radius','radius':'Radius',
  '뱃지':'Badge','배지':'Badge','badge':'Badge',
  '칩':'Chip','chip':'Chip',
  '체크박스':'Selection Control','라디오':'Selection Control','스위치':'Selection Control','토글':'Selection Control','checkbox':'Selection Control',
  '인디케이터':'Indicator','indicator':'Indicator','페이지네이션':'Indicator',
  '구분선':'Divider','디바이더':'Divider','divider':'Divider',
  '옵션칩':'Option Chip','옵션':'Option Chip',
  '옵션셀렉터':'Option Selector','셀렉터':'Option Selector','selector':'Option Selector',
  '탭':'Tab','tab':'Tab','툴팁':'Tooltip','tooltip':'Tooltip','스낵바':'Snackbar','snackbar':'Snackbar',
  '텍스트필드':'Text Field','입력창':'Text Field','인풋':'Text Field','검색':'Search','검색창':'Search','search':'Search',
  '슬라이더':'Slider','slider':'Slider','리스트':'List','목록':'List','메뉴':'Menu','드롭다운':'Menu','필터':'Filter','filter':'Filter',
  '브레드크럼':'Breadcrumb','하이퍼링크':'Hyperlink','링크':'Hyperlink','스테퍼':'Stepper','프로그레스':'Progress','진행바':'Progress',
  '평점':'Rating','별점':'Rating','카운터':'Number Counter','수량':'Number Counter','스크롤':'Scroll','갤러리':'Gallery Controls','fab':'Fab',
  '모션':'Motion','애니메이션':'Motion','보더':'Border','테두리':'Border','그라디언트':'Gradient','그라데이션':'Gradient',
  '투명도':'Opacity','불투명도':'Opacity','opacity':'Opacity'
};

var MOA_TOKEN_STOP = ['토큰','token','tokens','변수','컬러','색','색상','color','값','알려줘','뭐야','무엇','어떻게','무슨','어떤','있어','코드','hex'];
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
  return String(s).toLowerCase().replace(/[^\uac00-\ud7a3a-z0-9#.]+/g,' ').split(' ').filter(function(t){ return t.length > 1 || /[\uac00-\ud7a3]/.test(t); });
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

function moaWait(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

function moaFail(msg){ var e = new Error(msg); e.moa = true; return e; }

function moaCall(model, apiKey, body){
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + encodeURIComponent(apiKey);
  return fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) })
    .catch(function(){ throw moaFail('네트워크 연결 실패 · 인터넷 연결과 manifest의 allowedDomains를 확인해 주세요'); })
    .then(function(res){
      return res.json().catch(function(){ return {}; }).then(function(json){
        if(res.ok) return json;
        var m = (json.error && json.error.message) || '';
        var e = moaFail('HTTP ' + res.status + (m ? ' · ' + m : ''));
        e.status = res.status;
        throw e;
      });
    });
}

/* ── 6단계 파이프라인 ───────────────────────────────────────── */
function moaAsk(question, apiKey, opts){
  opts = opts || {};
  var report = opts.onStep || function(){};
  var cur = -1;
  function begin(i){ cur = i; report(i, 'run'); return moaWait(opts.stepDelay == null ? 280 : opts.stepDelay); }
  function end(i, detail, status){ report(i, status || 'done', detail || ''); }
  function skipRest(from, detail){ for(var k = from; k < MOA_STEPS.length; k++) report(k, 'skip', k === from ? detail : ''); }

  var qs, topics = [], hits = [], db = window.MOA_DB || [];

  return Promise.resolve()
  /* 1 */
  .then(function(){ return begin(0); })
  .then(function(){
    qs = moaTokenize(question);
    if(!qs.length) throw moaFail('질문에서 키워드를 찾지 못했어요');
    end(0, '키워드 ' + qs.slice(0, 6).join(', '));
  })
  /* 2 */
  .then(function(){ return begin(1); })
  .then(function(){
    var names = {};
    db.forEach(function(c){ if(c.topic) names[c.topic.toLowerCase()] = c.topic; });
    qs.forEach(function(t){
      var hit = MOA_GLOSSARY[t] || names[t];
      if(!hit) Object.keys(MOA_GLOSSARY).forEach(function(k){ if(!hit && k.length > 1 && t.indexOf(k) === 0) hit = MOA_GLOSSARY[k]; });
      if(hit && topics.indexOf(hit) < 0) topics.push(hit);
    });
    if(!topics.length && opts.topic) topics.push(opts.topic);
    end(1, topics.length ? topics.join(', ') : '매핑된 용어 없음 · 전체 DB 검색', topics.length ? 'done' : 'warn');
  })
  /* 3 */
  .then(function(){ return begin(2); })
  .then(function(){
    var tokens = window.MOA_TOKENS || [];
    if(!db.length && !tokens.length) throw moaFail('DB가 비어 있어요 · data/ 폴더를 넣고 다시 빌드해 주세요');
    var search = function(list, isToken){
      var eq = isToken ? qs.concat(moaEnglish(qs), topics.map(function(t){ return t.toLowerCase().replace(/ & | /g, '_'); })).filter(function(t){ return MOA_TOKEN_STOP.indexOf(t) < 0; }) : qs;
      var comp = topics.filter(function(t){ return MOA_FOUNDATION.indexOf(t) < 0; });
      return Promise.resolve().then(function(){
        return list.map(function(ch){
          var s = moaScore(ch, eq);
          if(isToken && topics.indexOf(ch.topic) > -1) s += 2;
          if(isToken && comp.indexOf(ch.topic) > -1) s += 4;
          return { ch: ch, score: s };
        }).filter(function(r){ return r.score > 0; });
      });
    };
    return Promise.all([search(db, false), search(tokens, true)]).then(function(res){
      hits = { guide: res[0], token: res[1] };
      var n = res[0].length + res[1].length;
      end(2, '가이드 ' + res[0].length + '건 · 토큰 ' + res[1].length + '건 검색됨', n ? 'done' : 'warn');
    });
  })
  /* 4 */
  .then(function(){ return begin(3); })
  .then(function(){
    var rank = function(list, n){
      list.forEach(function(r){ if(topics.indexOf(r.ch.topic) > -1) r.score *= 2; });
      list.sort(function(a,b){ return b.score - a.score; });
      return list.slice(0, n).map(function(r){ return r.ch; });
    };
    var g = rank(hits.guide, 5), t = rank(hits.token, 4);
    hits = g.concat(t);
    var lab = function(c){ return (c.topic ? c.topic + ' › ' : '') + moaHead(c); };
    var info = (g.length ? '가이드: ' + g.slice(0, 2).map(lab).join(' / ') : '') + (g.length && t.length ? '\n' : '') + (t.length ? '토큰: ' + t.slice(0, 3).map(function(c){ return moaHead(c).replace(/ 토큰$/, ''); }).join(', ') : '');
    end(3, hits.length ? info : '매칭된 결과 없음', hits.length ? 'done' : 'warn');
  })
  /* 5 */
  .then(function(){ return begin(4); })
  .then(function(){
    if(!hits.length){
      end(4, '가이드에 근거가 없어 답변할 수 없어요', 'warn');
      skipRest(5, '생략');
      return { text: MOA_NO_ANSWER, sources: [], grounded: false, done: true };
    }
    if(!apiKey){
      end(4, 'API 키 없음 · 가이드 원문으로 대신 답변', 'warn');
      skipRest(5, '생략');
      return { text: hits[0].text, sources: hits.map(function(h){ return h.source; }), grounded: true, offline: true, done: true };
    }
    end(4, '근거 ' + hits.length + '건 · 답변 가능');
  })
  /* 6 */
  .then(function(early){
    if(early && early.done) return early;
    return begin(5).then(function(){
      var body = {
        systemInstruction: { parts: [{ text: MOA_SYSTEM }] },
        contents: [{ role: 'user', parts: [{ text: '<context>\n' + moaContext(hits) + '\n</context>\n\n질문: ' + question }] }],
      };
      var tried = [], fails = [], plain = false;
      function next(i){
        var model = MOA_MODELS[i];
        tried.push(model);
        report(5, 'run', model + ' 호출 중');
        var req = JSON.parse(JSON.stringify(body));
        req.generationConfig = /^gemini-3/.test(model)
          ? { maxOutputTokens: 4096, thinkingConfig: { thinkingLevel: 'minimal' } }
          : { temperature: 0, maxOutputTokens: 4096, thinkingConfig: { thinkingBudget: 0 } };
        return moaCall(model, apiKey, req).catch(function(err){
          if([400, 404, 429, 500, 503].indexOf(err.status) > -1 && !/API key/i.test(err.message) && i + 1 < MOA_MODELS.length){
            fails.push(model + ' ' + err.status);
            return next(i + 1);
          }
          if(fails.length) err.message += ' (앞선 시도: ' + fails.join(', ') + ')';
          if(err.status === 400 || err.status === 403) err.message += ' · API 키를 확인해 주세요';
          if(err.status === 429) err.message += ' · 사용량 한도 초과';
          err.message = model + ' · ' + err.message;
          throw err;
        }).then(function(json){
          var text = moaText(json);
          if(text) return { text: text, model: model };
          var why = moaWhy(json);
          if(console && console.warn) console.warn('[moa] empty response', model, json);
          if(!plain){
            plain = true;
            report(5, 'run', model + ' 빈 응답 (' + why + ') · 기본 설정으로 재시도');
            var retry = JSON.parse(JSON.stringify(body));
            retry.generationConfig = { maxOutputTokens: 8192 };
            return moaCall(model, apiKey, retry).then(function(j2){
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
      return next(0);
    }).then(function(r){
      var text = r.text;
      end(5, r.model + ' · 완료');
      return { text: text, sources: hits.map(function(h){ return h.source; }), grounded: true, model: r.model };
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
window.moaAsk = moaAsk;
window.moaSearch = moaSearch;

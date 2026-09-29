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
  '5. 컬러 HEX, 수치, 컴포넌트 이름은 context에 적힌 그대로 옮기세요. 반올림하거나 바꾸지 않습니다.'
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
  '옵션셀렉터':'Option Selector','셀렉터':'Option Selector','selector':'Option Selector'
};

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
    return '### ' + (ch.source || '') + (moaHead(ch) ? ' / ' + moaHead(ch) : '') + '\n' + ch.text;
  }).join('\n\n');
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
    if(!db.length) throw moaFail('DB가 비어 있어요 · data/ 폴더를 넣고 다시 빌드해 주세요');
    var groups = {};
    db.forEach(function(c){ (groups[c.topic || c.source || '기타'] = groups[c.topic || c.source || '기타'] || []).push(c); });
    var keys = Object.keys(groups);
    return Promise.all(keys.map(function(k){
      return Promise.resolve().then(function(){
        return groups[k].map(function(ch){ return { ch: ch, score: moaScore(ch, qs) }; }).filter(function(r){ return r.score > 0; });
      });
    })).then(function(res){
      var all = [].concat.apply([], res);
      hits = all;
      end(2, keys.length + '개 DB · ' + all.length + '건 검색됨', all.length ? 'done' : 'warn');
    });
  })
  /* 4 */
  .then(function(){ return begin(3); })
  .then(function(){
    hits.forEach(function(r){ if(topics.indexOf(r.ch.topic) > -1) r.score *= 2; });
    hits.sort(function(a,b){ return b.score - a.score; });
    hits = hits.slice(0, 6).map(function(r){ return r.ch; });
    end(3, hits.length ? hits.slice(0, 3).map(function(c){ return (c.topic ? c.topic + ' › ' : '') + moaHead(c); }).join(' / ') : '매칭된 결과 없음', hits.length ? 'done' : 'warn');
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
        generationConfig: { temperature: 0, maxOutputTokens: 2048 }
      };
      var tried = [];
      function next(i){
        var model = MOA_MODELS[i];
        tried.push(model);
        report(5, 'run', model + ' 호출 중');
        return moaCall(model, apiKey, body).catch(function(err){
          if(err.status === 404 && i + 1 < MOA_MODELS.length) return next(i + 1);
          if(err.status === 400 || err.status === 403) err.message += ' · API 키를 확인해 주세요';
          if(err.status === 429) err.message += ' · 사용량 한도 초과';
          err.message = model + ' · ' + err.message;
          throw err;
        }).then(function(json){ return { json: json, model: model }; });
      }
      return next(0);
    }).then(function(r){
      var cand = r.json.candidates && r.json.candidates[0];
      var parts = (cand && cand.content && cand.content.parts) || [];
      var text = parts.filter(function(p){ return p.text && !p.thought; }).map(function(p){ return p.text; }).join('').trim();
      if(!text){
        var why = (r.json.promptFeedback && r.json.promptFeedback.blockReason) || (cand && cand.finishReason) || '빈 응답';
        throw moaFail(r.model + ' · 답변이 비어 있어요 (' + why + ')');
      }
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

/* Gemini 연동 — DB 데이터에만 근거해 답변.
   플러그인 UI(iframe)에서 직접 호출합니다. manifest.json의
   networkAccess.allowedDomains에 generativelanguage.googleapis.com 이 있어야 합니다. */

var MOA_MODEL = 'gemini-2.0-flash';

var MOA_SYSTEM = [
  '당신은 사내 디자인 시스템 가이드 챗봇 "모아"입니다.',
  '',
  '규칙:',
  '1. 아래 <context>에 주어진 내용만 근거로 답하세요. context에 없는 내용은 절대 답하지 않습니다.',
  '2. 일반적인 디자인 지식, 다른 디자인 시스템, 추측, 보완 설명을 덧붙이지 마세요.',
  '3. context에서 답을 찾을 수 없으면 정확히 이렇게만 답하세요: "가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요."',
  '4. 한국어로, 2~4문장으로 간결하게 답하세요. 인사말이나 사족은 넣지 않습니다.',
  '5. 컬러 HEX, 수치, 컴포넌트 이름은 context에 적힌 그대로 옮기세요. 반올림하거나 바꾸지 않습니다.'
].join('\n');

/* ── 검색: 질문과 관련된 chunk 추출 ──────────────────────────── */
function moaTokenize(s){
  return String(s).toLowerCase().replace(/[^\uac00-\ud7a3a-z0-9#.]+/g,' ').split(' ').filter(function(t){ return t.length > 1; });
}

function moaSearch(query, limit){
  var db = window.MOA_DB || [];
  var qs = moaTokenize(query);
  if(!qs.length) return [];
  var scored = db.map(function(ch){
    var hay = (ch.title + ' ' + ch.text).toLowerCase();
    var score = 0;
    qs.forEach(function(t){
      if(ch.title.toLowerCase().indexOf(t) > -1) score += 3;
      var i = -1, n = 0;
      while((i = hay.indexOf(t, i + 1)) > -1){ n++; if(n > 4) break; }
      score += n;
    });
    return { ch: ch, score: score };
  }).filter(function(r){ return r.score > 0; });
  scored.sort(function(a,b){ return b.score - a.score; });
  return scored.slice(0, limit || 6).map(function(r){ return r.ch; });
}

function moaContext(chunks){
  return chunks.map(function(ch){
    return '### ' + (ch.source || '') + (ch.title ? ' / ' + ch.title : '') + '\n' + ch.text;
  }).join('\n\n');
}

/* ── 호출 ────────────────────────────────────────────────────── */
function moaAsk(question, apiKey){
  var hits = moaSearch(question, 6);
  if(!hits.length){
    return Promise.resolve({
      text: '가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요.',
      sources: [], grounded: false
    });
  }
  if(!apiKey){
    return Promise.resolve({
      text: hits[0].text, sources: hits.map(function(h){ return h.source; }), grounded: true, offline: true
    });
  }

  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + MOA_MODEL + ':generateContent?key=' + encodeURIComponent(apiKey);
  var body = {
    systemInstruction: { parts: [{ text: MOA_SYSTEM }] },
    contents: [{ role: 'user', parts: [{ text: '<context>\n' + moaContext(hits) + '\n</context>\n\n질문: ' + question }] }],
    generationConfig: { temperature: 0, maxOutputTokens: 512 }
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(function(res){
    if(!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }).then(function(json){
    var cand = json.candidates && json.candidates[0];
    var text = cand && cand.content && cand.content.parts && cand.content.parts[0] && cand.content.parts[0].text;
    return {
      text: (text || '').trim() || '가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요.',
      sources: hits.map(function(h){ return h.source; }),
      grounded: true
    };
  });
}

window.moaAsk = moaAsk;
window.moaSearch = moaSearch;

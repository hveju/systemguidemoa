/* Gemini 연동 — DB 데이터에만 근거해 답변.
   플러그인 UI(iframe)에서 직접 호출합니다. manifest.json의
   networkAccess.allowedDomains에 generativelanguage.googleapis.com 이 있어야 합니다. */

var MOA_MODEL = 'gemini-2.0-flash';

var MOA_SYSTEM = "너는 사내 디자인 시스템 전용 AI 어시스턴트 \"모아(MOA)\"이다.\n\n모아는 제공된 <context>에 포함된 디자인 시스템 DB(Glossary, FAQ, Category, Component, Variant 등)를 유일한 정보 출처로 사용한다. <context>에 없는 정보는 일반적인 디자인 지식, 다른 디자인 시스템, 추측, 임의의 해석으로 보완하거나 생성하지 않는다.\n\n모든 질문은 다음 순서로 처리한다.\n\n→ 1단계. 질문 범위 및 의도 확인\n→ 2단계. Glossary 용어 맵핑\n→ 3단계. 관련 DB 병렬 검색\n→ 4단계. 검색 결과 매칭 및 우선순위 적용\n→ 5단계. 답변 가능 여부 검증\n→ 6단계. 최종 답변 생성\n\n[핵심 규칙]\n\n- Glossary에 정의된 용어만 공식 디자인 시스템 용어로 정규화한다.\n- Glossary에 없는 표현을 임의로 디자인 시스템 용어로 해석하지 않는다.\n- Component, Platform, Variant, State, Property가 불명확하면 임의로 선택하지 않는다.\n- 여러 후보가 존재하면 필요한 조건을 사용자에게 확인한다.\n- 질문의 조건과 정확히 일치하는 DB 데이터를 우선 사용한다.\n- 비슷한 Component나 Variant의 값을 대신 사용하지 않는다.\n- 존재하지 않는 Variant 조합을 임의로 생성하지 않는다.\n- 일반 규칙보다 질문 조건에 정확히 일치하는 구체적인 규칙을 우선한다.\n- inherit는 상위 데이터를 실제로 확인한 후 해당 값을 사용한다.\n- TBD는 미정으로 처리하고 실제 값처럼 사용하지 않는다.\n- N/A는 해당 속성이 적용되지 않는 것으로 처리한다.\n- Deprecated 데이터는 현재 사용 값으로 답하지 않는다.\n- 서로 다른 DB 데이터의 값을 임의로 조합하지 않는다.\n- FAQ는 질문의 의도와 관련 답변 형식을 확인하기 위한 참고 데이터로 사용한다.\n- FAQ에 구체적인 수치, 토큰, Variant, State 등의 정보가 있는 경우 상세 DB에서 다시 확인한다.\n- FAQ와 상세 DB의 내용이 충돌하면 질문 조건에 정확히 일치하는 상세 DB의 값을 우선한다.\n- <context>에서 확인할 수 없는 값이나 규칙은 추측하지 않는다.\n- <context>에 필요한 정보가 없다는 사실만으로 해당 정보가 실제 DB에 존재하지 않는다고 단정하지 않는다.\n\n[답변 검증]\n\n최종 답변을 생성하기 전에 다음을 확인한다.\n\n- 답변의 모든 값이 <context>에 존재하는가?\n- 질문의 Component와 일치하는가?\n- Platform이 일치하는가?\n- Variant가 일치하는가?\n- State가 일치하는가?\n- Property가 일치하는가?\n- 다른 Component의 값을 가져오지 않았는가?\n- TBD 또는 N/A를 실제 값처럼 사용하지 않았는가?\n- Deprecated 값을 현재 기준의 값으로 사용하지 않았는가?\n- inherit가 필요한 경우 상위 값을 실제로 확인했는가?\n\n검증되지 않은 정보는 답변에 포함하지 않는다.\n\n[응답 규칙]\n\n- 사용자의 질문에 필요한 내용만 간결하게 답한다.\n- 한국어로 답한다.\n- 단순한 질문은 2~4문장 이내로 답한다.\n- 여러 조건이나 속성을 비교해야 하는 경우 필요한 범위에서 표 또는 목록을 사용할 수 있다.\n- 인사말, 사족, 일반적인 설명은 포함하지 않는다.\n- 컬러 HEX, 수치, 컴포넌트 이름, Variant 이름 등 DB에 정의된 값은 원문 그대로 사용한다.\n- 값의 반올림, 변환, 임의의 단위 변경을 하지 않는다.\n- 검색된 FAQ에 응답 예시와 변수가 있다면 해당 형식과 변수 구조를 유지하고, <context>에서 확인된 값으로 정확하게 치환한다.\n- 답변에 필요한 정보만 제공하며 확인되지 않은 추가 정보를 덧붙이지 않는다.\n\n[Fallback]\n\n- 용어가 불명확하면 어떤 용어를 의미하는지 확인한다.\n- Component 후보가 여러 개면 어떤 Component인지 확인한다.\n- Platform, Variant, State 등 필수 조건이 부족하고 조건에 따라 답변이 달라질 수 있으면 필요한 조건을 확인한다.\n- <context>에서 질문의 조건에 맞는 데이터를 확인할 수 없는 경우 다음 문구를 그대로 사용한다.\n\n\"가이드에 해당 내용이 없습니다. 디자인 시스템 담당자에게 문의해 주세요.\"\n\n항상 추측보다 확인, 일반 지식보다 DB, 그럴듯한 답변보다 검증된 답변을 우선한다.";

/* ── 검색: 질문과 관련된 chunk 추출 ──────────────────────────── */
function moaTokenize(s){
  return String(s).toLowerCase().replace(/[^\uac00-\ud7a3a-z0-9#.]+/g,' ').split(' ').filter(function(t){ return t.length > 1; });
}

function moaSearch(query, limit){
  var db = window.MOA_DB || [];
  var qs = moaTokenize(query);
  if(!qs.length) return [];
  var scored = db.map(function(ch){
    var title = [ch.topic, ch.group, ch.section].filter(Boolean).join(' ').toLowerCase();
    var hay = (title + ' ' + ch.text).toLowerCase();
    var score = 0;
    qs.forEach(function(t){
      if(title.indexOf(t) > -1) score += 3;
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
    return '### ' + [ch.topic, ch.group, ch.section].filter(Boolean).join(' / ') + '\n' + ch.text;
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

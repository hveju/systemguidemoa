/* Design Chatbot Moa — plugin main thread */

figma.showUI(__html__, { width: 360, height: 640, themeColors: false });

function hexToRgb(hex) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length === 4) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
  };
}

function notifyUI(text) {
  figma.ui.postMessage({ type: 'toast', text: text });
}


figma.ui.onmessage = async function (msg) {
  try {
    await handle(msg);
  } catch (e) {
    notifyUI('적용 중 오류가 발생했어요');
    console.error(e);
  }
};

async function handle(msg) {
  if (msg.type === 'close') {
    figma.closePlugin();
    return;
  }

  /* API 키: Figma clientStorage에 저장 (이 기기·이 계정에만 남고, 다음 실행 때 자동 입력) */
  if (msg.type === 'save-key') {
    await figma.clientStorage.setAsync('moa-gemini-key', msg.key || '');
    return;
  }
  if (msg.type === 'load-key') {
    var k = await figma.clientStorage.getAsync('moa-gemini-key');
    if (k) figma.ui.postMessage({ type: 'key', key: k });
    return;
  }

  /* 대화 히스토리: 최근 질문 30개 (UI에서 잘라서 보냄) */
  if (msg.type === 'save-history') {
    await figma.clientStorage.setAsync('moa-history', msg.data || '');
    return;
  }
  if (msg.type === 'load-history') {
    var hst = await figma.clientStorage.getAsync('moa-history');
    figma.ui.postMessage({ type: 'history', data: hst || '' });
    return;
  }

  if (msg.type === 'apply-fill') {
    var sel = figma.currentPage.selection;
    if (!sel.length) { notifyUI('요소를 먼저 선택해 주세요'); return; }
    var c = hexToRgb(msg.hex);
    var paint = { type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: c.a };
    var n = 0;
    for (var i = 0; i < sel.length; i++) {
      var node = sel[i];
      if (!('fills' in node) || node.locked) continue;
      try { node.fills = [paint]; n++; } catch (e) {}
    }
    notifyUI(n ? msg.name + ' 적용 완료' : '적용할 수 없는 요소예요');
    return;
  }

  if (msg.type === 'apply-fontsize') {
    var sel2 = figma.currentPage.selection;
    var texts = sel2.filter(function (n) { return n.type === 'TEXT'; });
    if (!texts.length) { notifyUI('텍스트를 먼저 선택해 주세요'); return; }
    var done = 0;
    for (var j = 0; j < texts.length; j++) {
      var t = texts[j];
      if (t.locked) continue;
      try {
        var fonts = t.characters.length ? t.getRangeAllFontNames(0, t.characters.length) : [t.fontName];
        await Promise.all(fonts.map(function (f) { return figma.loadFontAsync(f); }));
        t.fontSize = msg.size;
        done++;
      } catch (e) {}
    }
    notifyUI(done ? msg.label + ' 적용 완료' : '적용할 수 없는 텍스트예요');
    return;
  }
}

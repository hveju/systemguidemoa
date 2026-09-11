/* Design Chatbot Moa — plugin main thread */

figma.showUI(__html__, { width: 360, height: 640, themeColors: false });

function hexToRgb(hex) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255
  };
}

function notifyUI(text) {
  figma.ui.postMessage({ type: 'toast', text: text });
}

figma.ui.onmessage = async function (msg) {
  if (msg.type === 'close') {
    figma.closePlugin();
    return;
  }

  if (msg.type === 'load-key') {
    var key = await figma.clientStorage.getAsync('moa-gemini-key');
    figma.ui.postMessage({ type: 'key', key: key || '' });
    return;
  }

  if (msg.type === 'save-key') {
    await figma.clientStorage.setAsync('moa-gemini-key', msg.key);
    return;
  }

  if (msg.type === 'apply-fill') {
    var sel = figma.currentPage.selection;
    if (!sel.length) { notifyUI('요소를 먼저 선택해 주세요'); return; }
    var paint = { type: 'SOLID', color: hexToRgb(msg.hex) };
    var n = 0;
    for (var i = 0; i < sel.length; i++) {
      var node = sel[i];
      if ('fills' in node) { node.fills = [paint]; n++; }
    }
    notifyUI(n ? msg.name + ' 적용 완료' : '적용할 수 없는 요소예요');
    return;
  }

  if (msg.type === 'apply-fontsize') {
    var sel2 = figma.currentPage.selection;
    var texts = sel2.filter(function (n) { return n.type === 'TEXT'; });
    if (!texts.length) { notifyUI('텍스트를 먼저 선택해 주세요'); return; }
    for (var j = 0; j < texts.length; j++) {
      await figma.loadFontAsync(texts[j].fontName);
      texts[j].fontSize = msg.size;
    }
    notifyUI(msg.label + ' 적용 완료');
    return;
  }
};

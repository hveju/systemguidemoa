# 빌드

`ui.src.html`은 토큰을 품은 소스입니다. 빌드는 토큰을 실제 값으로 치환해 두 파일을 만듭니다.

| 토큰 | 치환 값 |
|---|---|
| `__FONT_CSS__` | `assets/pretendard-inline.css` 내용 (base64 @font-face) |
| `__DB_JSON__` | `data/` 폴더의 md/csv를 파싱한 chunk 배열 |
| `__GEMINI_JS__` | `src/gemini.js` 내용 |
| `__IMG_HOME__` | 홈 마스코트 |
| `__IMG_KEY__` | 키 화면 마스코트 |
| `__IMG_KEYBG__` | 설정 화면 배경 |
| `__IMG_SAD__` | 연결 끊김 일러스트 |
| `__IMG_MASCOT__` | 메뉴 배너 마스코트 |
| `__IMG_PROFILE__` | 챗봇 프로필 |
| `__IMG_SMALL__` | 메뉴 배너 소형 이미지 |

출력:

- `../index.html` — 이미지 = `assets/images.json`의 base64 data URI (플러그인이 로드하는 파일)
- `../preview/ui.preview.html` — 이미지 = `../assets/img-*.png` 상대경로 (브라우저 확인용)

## chunk 형태

```js
{ source: 'Color.md', topic: 'Color', group: '사용 규칙 (Usage Rules)',
  section: 'Type=Primary 규칙', text: '- [MUST] ...', kind: 'md' }
```

- `topic` — 파일명. 홈 카테고리 칩이 됩니다.
- `section` — `###`/`####` 제목. 질문 칩이 됩니다.
- CSV는 행마다 하나씩, `row`에 원본 레코드가 담깁니다.

## Node 스크립트

```js
const fs = require('fs');
const path = require('path');

const src  = fs.readFileSync('src/ui.src.html', 'utf8');
const font = fs.readFileSync('assets/pretendard-inline.css', 'utf8');
const gem  = fs.readFileSync('src/gemini.js', 'utf8');
const imgs = JSON.parse(fs.readFileSync('assets/images.json', 'utf8'));

/* 파일명 → 화면에 보일 주제명 (특수문자 치환용) */
const LABEL = { DimmedShadow: 'Dimmed & Shadow' };

/* 파일명 01_CTAButton.md → 주제명 "CTA Button" */
const label = (key) => {
  const base = key.replace(/^\d+[_\-.]\s*/, '');
  if (LABEL[base]) return LABEL[base];
  return base.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
};

const SKIP_SEC  = /^(메타|관련 피그마 좌표)/;   // 0. 메타 / 99. 관련 피그마 좌표
const SKIP_TEXT = /^DB 등록:/m;                 // 노션 메타 블록

const clean = (s) => {
  let t = s.replace(/^#+\s*/, '').replace(/[`*]/g, '').trim();
  t = t.replace(/^\d+(\.\d+)*\.?\s*/, '').trim();          // "2.1. " 제거
  if (/^\[.*\]$/.test(t)) t = t.slice(1, -1).trim();        // "[공통 규칙]" → "공통 규칙"
  return t;
};

const splitCsv = (line) => {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (c === ',' && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
};

const chunks = [];
for (const name of fs.readdirSync('data').sort()) {
  if (name === 'README.md') continue;
  const key  = name.replace(/\.(md|csv)$/i, '');
  const base = label(key);
  const raw  = fs.readFileSync(path.join('data', name), 'utf8');

  if (/\.csv$/i.test(name)) {
    const rows = raw.trim().split(/\r?\n/).map(splitCsv);
    const head = rows.shift().map(h => h.trim());
    for (const row of rows) {
      if (!row.length || row.every(c => !c.trim())) continue;
      const rec = {};
      head.forEach((h, i) => rec[h] = (row[i] || '').trim());
      chunks.push({
        source: name, topic: base, group: base, section: base,
        text: head.map(h => `${h}: ${rec[h]}`).join(', '), kind: 'csv', row: rec
      });
    }
    continue;
  }

  let group = '', section = '', buf = [];
  const flush = () => {
    const text = buf.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    buf = [];
    if (!text || !section) return;
    if (SKIP_SEC.test(group) || SKIP_SEC.test(section)) return;
    if (SKIP_TEXT.test(text)) return;
    if (text.length < 12) return;
    chunks.push({ source: name, topic: base, group, section, text, kind: 'md' });
  };
  for (const line of raw.split(/\r?\n/)) {
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const lvl = h[1].length, label = clean(h[2]);
      if (!label) continue;
      flush();
      if (lvl <= 2) { group = label; section = label; } else section = label;
    } else buf.push(line);
  }
  flush();
}

const map = {
  __IMG_HOME__: 'home', __IMG_KEY__: 'key', __IMG_KEYBG__: 'keybg',
  __IMG_SAD__: 'sad', __IMG_MASCOT__: 'mascot',
  __IMG_PROFILE__: 'profile', __IMG_SMALL__: 'small'
};

const build = (get) => {
  let h = src
    .split('__FONT_CSS__').join(font)
    .split('__DB_JSON__').join(JSON.stringify(chunks))
    .split('__GEMINI_JS__').join(gem);
  for (const [tok, name] of Object.entries(map)) h = h.split(tok).join(get(name));
  if (/__(IMG|DB|GEMINI|FONT)_/.test(h)) throw new Error('unresolved token');
  return h;
};

fs.writeFileSync('index.html', build(n => imgs[n]));
fs.mkdirSync('preview', { recursive: true });
fs.writeFileSync('preview/ui.preview.html', build(n => `../assets/img-${n}.png`));

console.log(`chunks: ${chunks.length}`);
```

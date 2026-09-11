# 빌드

`ui.src.html`은 토큰을 품은 소스입니다. 빌드는 토큰을 실제 값으로 치환해 두 파일을 만듭니다.

| 토큰 | 치환 값 |
|---|---|
| `__FONT_CSS__` | `assets/pretendard-inline.css` 내용 (base64 @font-face) |
| `__IMG_HOME__` | 홈 마스코트 |
| `__IMG_KEY__` | 키 화면 마스코트 |
| `__IMG_KEYBG__` | 설정 화면 배경 |
| `__IMG_SAD__` | 연결 끊김 일러스트 |
| `__IMG_MASCOT__` | 메뉴 배너 마스코트 |
| `__IMG_PROFILE__` | 챗봇 프로필 |
| `__IMG_SMALL__` | 메뉴 배너 소형 이미지 |

출력:

- `../ui.html` — 이미지 = `assets/images.json`의 base64 data URI (플러그인이 로드하는 파일)
- `../preview/ui.preview.html` — 이미지 = `assets/img-*.png` 상대경로 (브라우저 확인용)

## Node 스크립트 예시

```js
const fs = require('fs');
const src  = fs.readFileSync('src/ui.src.html', 'utf8');
const font = fs.readFileSync('assets/pretendard-inline.css', 'utf8');
const imgs = JSON.parse(fs.readFileSync('assets/images.json', 'utf8'));

const map = {
  __IMG_HOME__: 'home', __IMG_KEY__: 'key', __IMG_KEYBG__: 'keybg',
  __IMG_SAD__: 'sad', __IMG_MASCOT__: 'mascot',
  __IMG_PROFILE__: 'profile', __IMG_SMALL__: 'small'
};

const build = (get) => {
  let h = src.split('__FONT_CSS__').join(font);
  for (const [tok, name] of Object.entries(map)) h = h.split(tok).join(get(name));
  if (h.includes('__IMG_')) throw new Error('unresolved token');
  return h;
};

fs.writeFileSync('ui.html', build(n => imgs[n]));
fs.mkdirSync('preview', { recursive: true });
fs.writeFileSync('preview/ui.preview.html', build(n => `../assets/img-${n}.png`));
```

미리보기 파일은 `assets/`가 상위 경로이므로 `../assets/img-*.png`를 사용합니다.

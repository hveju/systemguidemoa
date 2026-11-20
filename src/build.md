# 빌드

`ui.src.html`은 토큰을 품은 소스입니다. 빌드는 토큰을 실제 값으로 치환해 두 파일을 만듭니다.

| 토큰 | 치환 값 |
|---|---|
| `__FONT_CSS__` | `assets/pretendard-inline.css` 내용 (base64 @font-face) |
| `__DB_JSON__` | `data/DB_guide/` 폴더의 md/csv를 파싱한 chunk 배열 |
| `__TOKENS_JSON__` | `data/DB_tokens/tokens.json` (토큰 chunk 배열) |
| `__GEMINI_JS__` | `src/gemini.js` 내용 |
| `__GLOSSARY_JSON__` | `data/db_glossary/glossary.md`, `ko_en.md` 용어 배열 |
| `__FAQ_JSON__` | `data/faq/DB_FAQ.csv` FAQ 배열 `[{topic, q, a, vars}]` (답변 형식 예시) |
| `__EASTEREGG_JSON__` | `data/easteregg.md` 원문 (Easter egg 내장본) |
| `__PROMPTS_JSON__` | `data/prompts/*.md` 본문 배열 `[{file, text}]` (Gemini system instruction) |
| `__IMG_HOME__` | 홈 마스코트 |
| `__IMG_KEY__` | 키 화면 마스코트 |
| `__IMG_KEYBG__` | 설정 화면 배경 |
| `__IMG_SAD__` | 연결 끊김 일러스트 |
| `__IMG_MASCOT__` | 메뉴 배너 마스코트 |
| `__IMG_PROFILE__` | 챗봇 프로필 |
| `__IMG_SMALL__` | 메뉴 배너 소형 이미지 |
| `__IMG_INTROBG__` | 인트로 배경 (마스코트·로고 포함 한 장) |

출력:

- `../index.html` — 이미지 = `assets/images.json`의 base64 data URI (플러그인이 로드하는 파일)
- `../preview/ui.preview.html` — 이미지 = `../assets/img-*.png` 상대경로 (브라우저 확인용)

## 실행

```
node build.js
```

저장소 루트의 `build.js`가 전체 빌드 스크립트입니다. 끝나면 파일별 chunk 수를 출력합니다.

## 수정이 반영되는 방식

- **실행 중 자동 반영** — `src/gemini.js`의 `moaLoadDb()`가 시작할 때, 카테고리 진입·질문할 때(30초 캐시) `data/DB_guide/*`, `data/DB_tokens/tokens.json`, `data/db_glossary/*.md`를 다시 읽어 (프롬프트·랜딩메뉴는 각각 `moaLoadPrompts`, `loadLanding`) 빌드 내장본을 덮어씁니다.
  - 브라우저 미리보기(http): 같은 프로젝트의 `data/` → 파일 저장 후 질문하면 바로 반영
  - Figma 플러그인: GitHub `main`의 `data/` → push하면 재빌드 없이 반영 (파일 목록은 GitHub API, 새 파일 추가·삭제도 반영)
  - 읽기에 실패하면 빌드 내장본을 그대로 씁니다. 챗봇 3단계 상세에 `DB: …`로 출처가 표시됩니다.
- **빌드 내장본** — 오프라인·첫 화면용. 파일을 바꾼 뒤 `node build.js`로 갱신하세요.
- 파싱 규칙은 `build.js`와 `gemini.js`의 `moaParseGuide`가 같아야 합니다.

## chunk 형태

```js
{ source: '01_Color.md', topic: 'Color', group: '사용 규칙 (Usage Rules)',
  section: 'Type=Primary 규칙', text: '- [MUST] ...', kind: 'md' }
```

- `topic` — 파일명. 홈 카테고리 칩이 됩니다.
- `section` — `###`/`####` 제목. 질문 칩이 됩니다.
- CSV는 행마다 하나씩, `row`에 원본 레코드가 담깁니다.


## 디자인 토큰 (data/DB_tokens/)

Figma Variables를 W3C 토큰 형식(`*.tokens.json`)으로 내보내 `data/DB_tokens/`에 둡니다.

- `Value.tokens.json` — Primitive
- `Light BG.tokens.json` — Semantic
- `Typography.tokens.json` — Typeface
- `Component/Light.tokens.json`, `Component/Dark.tokens.json` — Component (Light/Dark 모드)

빌드 시 `$value`가 있는 노드를 경로(예: `tab/standard/label/normal`)로 펼치고, 이름 앞 두 단계로 묶어 `data/DB_tokens/tokens.json`을 만든 뒤
`__TOKENS_JSON__` 토큰을 그 내용으로 치환해 `window.MOA_TOKENS`에 넣습니다.
색상은 `hex`(알파가 1 미만이면 %), 별칭은 `com.figma.aliasData.targetVariableName`을 괄호 안에, 모드가 여럿이면 `Light … · Dark …`로 적습니다.
`data/db_glossary/*.md`의 `` - `term`: 별칭, 별칭 `` 줄을 파싱해 `__GLOSSARY_JSON__`(→ `window.MOA_GLOSSARY_DB`)으로 넣습니다. 챗봇 2단계는 이 파일만으로 용어·주제를 맵핑합니다(하드코딩 맵 없음).
챗봇은 3단계에서 가이드 문서(MOA_DB)와 토큰(MOA_TOKENS)을 병렬로 검색해 가이드 최대 5건, 토큰 최대 4건을 근거로 씁니다.

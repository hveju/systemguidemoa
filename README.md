# DB 데이터

챗봇이 답변에 사용하는 **유일한** 데이터 소스입니다. `DB_guide/`의 `.md` / `.csv`와 `DB_tokens/`의 토큰만 읽습니다.

```
data/
  DB_guide/    가이드 문서 (.md / .csv) → MOA_DB
  DB_tokens/   Figma Variables 토큰 (*.tokens.json, tokens.json) → MOA_TOKENS
  prompts/     Gemini system instruction
```

## 넣는 방법

1. `data/DB_guide/`에 markdown / CSV 파일을 넣습니다. **파일명이 챗봇의 주제(홈 카테고리 칩) 이름이 됩니다.**
2. **GitHub `main`에 push**하면 플러그인이 다음 질문부터 최신 파일을 읽습니다 (재빌드 불필요, 새 파일 추가·삭제 포함).
   브라우저 미리보기(`preview/ui.preview.html`)는 저장만 하면 로컬 `data/`를 바로 읽습니다.
3. 오프라인용 내장본까지 갱신하려면 `node build.js`를 실행합니다.

`data/DB_tokens/tokens.json`, `data/db_glossary/*.md`, `data/prompts/*.md`, `data/landingmenu/*/text/landing.md`(+ 이미지)도 같은 방식으로 실행 중에 다시 읽습니다.
단, `data/DB_tokens/*.tokens.json` 원본은 `tokens.json`으로 변환해야 반영됩니다.
파일명은 `01_Color.md`처럼 번호 접두어(`NN_`)를 붙여 순서를 정합니다. 접두어는 칩 라벨에서 자동 제거되고, `CTAButton` → `CTA Button`처럼 대문자 경계에서 공백이 들어갑니다.
파일명에 `&` 등 특수문자는 피하고, 표기를 바꾸려면 빌드 스크립트의 `LABEL` 맵에 추가하세요 (`DimmedShadow.md` → `Dimmed & Shadow`).

## Markdown 구조

노션에서 내려받은 가이드 문서 형식을 그대로 씁니다.

- `#` / `##` 제목 → 섹션 그룹
- `###` / `####` 제목 → **질문 칩 하나**가 됩니다
- 문서 상단의 노션 메타 블록(`DB 등록:`, `담당자:` 등)과 `0. 메타`, `99. 관련 피그마 좌표` 섹션은 자동 제외됩니다
- 제목의 번호(`2.1.`), 백틱, `[공통]` 같은 대괄호는 칩 라벨에서 자동 정리됩니다

```markdown
## 2. 사용 규칙 (Usage Rules)

### 2.3. Type=Primary 규칙
- `[MUST]` 브랜드 핵심 액션에 사용한다.
```

→ "Type=Primary 규칙" 칩이 생기고, 누르면 그 아래 본문이 답변으로 나옵니다.

## CSV 구조

첫 줄이 헤더, 각 행이 검색 단위입니다.

```csv
name,hex,usage
Skyblue,#2189FF,핵심 액션
```

`hex`(또는 `color`, `value`) 열이 있으면 답변이 컬러 스와치로 렌더되고, 클릭 시 선택한 Figma 요소에 적용됩니다.
`size`(또는 `fontSize`) 열이 있으면 같은 방식으로 fontSize가 적용됩니다.

## 현재 등록된 파일 (data/DB_guide/)

| 파일 | 주제 | 섹션 수 |
|---|---|---|
| `01_Color.md` | Color | 12 |
| `02_Typeface.md` | Typeface | 13 |
| `03_Spacing.md` | Spacing | 7 |
| `04_CTAButton.md` | CTA Button | 12 |
| `05_CTAButtonIcon.md` | CTA Button Icon | 7 |
| `06_Popup.md` | Popup | 8 |
| `07_DimmedShadow.md` | Dimmed & Shadow | 6 |
| `08_Iconography.md` | Iconography | 19 |
| `09_Radius.md` | Radius | 11 |
| `10_Badge.md` | Badge | 9 |
| `11_Chip.md` | Chip | 6 |
| `12_SelectionControl.md` | Selection Control | 7 |
| `13_Indicator.md` | Indicator | 9 |
| `14_Divider.md` | Divider | 7 |
| `15_OptionChip.md` | Option Chip | 7 |
| `16_OptionSelector.md` | Option Selector | 9 |
| `17_Tooltip.md` | Tooltip | 8 |
| `18_Tab.md` | Tab | 12 |
| `19_List.md` | List | 8 |
| `20_Menu.md` | Menu | 6 |
| `21_Filter.md` | Filter | 11 |

총 194개 chunk (빌드 기준). 홈 카테고리 칩은 파일명 순서대로 나열되고, 넘치면 스크롤됩니다.

## Easter egg (data/easteregg.md)

정해진 질문 → 정해진 답변. 작성법은 파일 맨 위 주석에 있어요. 실행 중에 다시 읽으니 저장(미리보기)·push(플러그인)만 하면 반영돼요.

## 챗봇 프롬프트 (data/prompts/)

Gemini의 system instruction이 되는 파일입니다. 가이드 DB(chunk)로는 읽지 않습니다.

| 파일 | 내용 |
|---|---|
| `01_role.md` | 기본 역할 프롬프트 |
| `02_exception.md` | 응답 예외 프롬프트 |
| `03_output.md` | 출력 프롬프트 |

- 파일명은 바꾸지 마세요 (`src/gemini.js`의 `MOA_PROMPT_FILES`, 빌드의 `PROMPT_FILES`와 맞아야 함).
- 노션에서 내려받은 그대로 붙여 넣어도 됩니다. 첫 `**[` 줄 이전의 메타와 이미지 줄은 자동 제거됩니다.
- 질문할 때마다 최신 파일을 읽습니다 (GitHub main → 실패 시 빌드 내장본). 수정 후 GitHub에 push하면 재빌드 없이 반영됩니다. 재빌드하면 내장본도 갱신됩니다.

## 답변 범위

Gemini 연결 시에도 이 폴더 밖의 지식은 사용하지 않습니다. 관련 내용이 없으면 모델이 추측하지 않고 "가이드에 해당 내용이 없습니다"로 답합니다 (`src/gemini.js`의 system instruction).

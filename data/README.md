# DB 데이터

챗봇이 답변에 사용하는 **유일한** 데이터 소스입니다. 이 폴더의 `.md` / `.csv` 파일만 읽습니다.

## 넣는 방법

1. 이 폴더에 markdown / CSV 파일을 넣습니다. **파일명이 챗봇의 주제(홈 카테고리 칩) 이름이 됩니다.**
2. `src/build.md`의 빌드를 다시 실행합니다 → 내용이 `index.html` 안으로 인라인됩니다.
3. Figma에서 플러그인을 껐다 켭니다.

플러그인은 로컬 폴더를 직접 읽을 수 없으므로, 파일을 넣기만 하고 빌드를 건너뛰면 반영되지 않습니다.
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

## 현재 등록된 파일

| 파일 | 주제 | 섹션 수 |
|---|---|---|
| `01_Color.md` | Color | 12 |
| `02_Typeface.md` | Typeface | 13 |
| `03_Spacing.md` | Spacing | 9 |
| `04_CTAButton.md` | CTA Button | 8 |
| `05_UtilityButton.md` | Utility Button | 7 |
| `06_Popup.md` | Popup | 10 |
| `07_DimmedShadow.md` | Dimmed & Shadow | 6 |
| `08_Iconography.md` | Iconography | 16 |
| `09_Radius.md` | Radius | 11 |
| `10_Badge.md` | Badge | 8 |
| `11_Chip.md` | Chip | 10 |
| `12_SelectionControl.md` | Selection Control | 7 |
| `13_Indicator.md` | Indicator | 5 |
| `14_Divider.md` | Divider | 7 |
| `15_OptionChip.md` | Option Chip | 4 |
| `16_OptionSelector.md` | Option Selector | 9 |

총 142개 chunk. 홈 카테고리 칩은 파일명 순서대로 나열되고, 넘치면 스크롤됩니다.

## 답변 범위

Gemini 연결 시에도 이 폴더 밖의 지식은 사용하지 않습니다. 관련 내용이 없으면 모델이 추측하지 않고 "가이드에 해당 내용이 없습니다"로 답합니다 (`src/gemini.js`의 system instruction).

# 랜딩메뉴 (고정 답변)

카테고리를 열면 나오는 타이틀·질문 칩과, 칩을 눌렀을 때 보여줄 **정해진 답변**입니다. Gemini를 거치지 않고, 진행 문구 없이 바로 카드가 하나씩 나옵니다.

```
data/landingmenu/
  <카테고리명>/
    text/landing.md     타이틀 · 칩 · 칩별 답변 (마크다운)
    images/img_*.png    답변 이미지 (Figma img_ 레이어 전체를 PNG 3x로)
```

- 폴더명 = 카테고리명 (전체 메뉴 칩 이름과 똑같이). `&`는 폴더명에 못 써서 ` - `로 바꿔요 (`Dimmed & Shadow` → `Dimmed - Shadow`).
- 현재 22개: Color, Typeface, Spacing, CTA Button, CTA Button Icon, Popup, Dimmed & Shadow, Iconography, Radius, Badge, Chip, Selection Control, Indicator, Divider, Option Chip, Option Selector, Tooltip, Tab, List, Menu, Filter, Text Field
- 이미지 = Figma에서 `img_`로 시작하는 레이어 전체(회색 배경·여백 포함)를 내보낸 파일. 파일명 = 레이어명 + `.png`

## landing.md 작성법

```markdown
# 타이틀
CTA Button의 구성이에요.
어떤게 궁금하신가요?

## 핵심만 보기            ← 질문 칩 (순서대로 칩이 생김)

### CTA Button의 공통 규칙   ← 답변 카드 제목 (### 하나 = 카드 하나)
카드 본문. 줄바꿈 그대로 보여요.

| Default | 40px |         ← 왼쪽 항목 / 오른쪽 값
| Small | 32px |

※ 회색 안내 문구

![](img_CTA Button_all_01)  ← images/ 폴더의 파일명 (.png 생략). 여러 줄 쓰면 이미지 여러 장
![](Menu/img_menu_all_01)  ← 다른 카테고리 폴더의 이미지를 같이 쓸 때 (카테고리/파일명)

추가 질문: 스펙 및 토큰      ← 답변 아래 칩 (쉼표로 여러 개)
```

- 카드 제목 안에서 줄을 바꾸려면 `\n`을 쓰세요. 제목 없는 카드는 `###`만 쓰면 돼요.
- `추가 질문`에 카테고리 이름(예: Popup)을 쓰면 누를 때 그 카테고리로 이동해요.
- `※` 줄은 여러 개 쓸 수 있어요 (줄마다 회색 안내 문구 하나).
- `적용: A, B` 줄은 본문으로 보여요 (핵심만 보기 카드의 적용 컴포넌트).
- `- 제목: 설명` 줄은 제목 아래 설명이 붙는 1열 항목으로 보여요.
- `| 이름 | #HEX |` 줄은 컬러칩(16×16 색 견본, 2열)으로 보여요.
- `##` 칩 아래에 `###`이 없으면, 그 칩은 일반 챗봇 답변으로 넘어가요.

## 반영

- 웹·플러그인 모두 실행 중에 `text/landing.md`를 다시 읽어요 (플러그인은 GitHub main, push하면 반영).
- 오프라인용 내장본(`window.MOA_LANDING`)은 `src/ui.src.html`에 있어요. md를 크게 바꾸면 함께 갱신해 주세요.

# Iconography (아이콘)

DB 등록: 2차
담당자: semi
분류: 01. Foundation
작업: 2026년 9월 10일 오후 2:52
작업상태: 진행 중

## 0. 메타

- **분류(Category)**: Foundation / Icon — Iconography Guideline (v1.6에서 정책 요약 추가)
- **타입 종류(Types)**: `Creation`, `Usage(Stroke Type: Bold/Regular/Light)`, `Grid & Keyline`, `Anatomy`, `Stroke Terminal`, `Corners`, `Angle`, `Typeface Align`, `Logo`, `Spaces`
- **Figma Node ID**: 미정(TBD)

---

## 1. 개요

### 1.1. 정의

- Icon DB는 디자인 시스템에서 쓰는 아이콘의 **제작·명명·사용 규칙**을 정의한 가이드다.
- 그리드/키라인 기준, 아이콘 구조(Anatomy) 용어, 스트로크(굵기/말단/코너), 각도(Angle), 텍스트 포함 아이콘의 정렬, 브랜드 로고 사용법, 여백(Clearance/터치 영역) 규칙을 포함한다.

### 1.2. 적용 상황

- 새 아이콘을 제작할 때 그리드/키라인 기준이 궁금할 때 → `Grid & Keyline`
- 어떤 굵기(Bold/Regular/Light)와 사이즈를 써야 할지 → `Usage(Stroke Type)`
- 열린 도형의 끝 처리, 모서리 처리 기준이 궁금할 때 → `Stroke Terminal` / `Corners`
- 대각선·화살표·시계 아이콘의 각도 기준 → `Angle`
- 텍스트가 들어간 아이콘의 정렬 기준 → `Typeface Align`
- 브랜드 로고 아이콘을 써야 할 때 → `Logo`
- 아이콘 주변 여백·터치 영역이 궁금할 때 → `Spaces`

---

## 2. 사용 규칙 (Usage Rules)

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[ALLOW]`: 예외 허용 · `[AVOID]`: 금지
> 

### 2.1. 공통 규칙 (Creation)

- `[MUST]` 아이콘은 `96 × 96px` 아트보드에서 제작해 정렬과 확장성을 유지한다.
- `[MUST]` 스트로크 굵기·말단(terminal)·코너·각도는 아래 아이콘 디자인 규칙(2.8~2.10)을 일관되게 적용한다.
- `[MUST]` 아이콘은 아웃라인(선) 방식으로 제작해 왜곡을 방지하고, `96 × 96px` 프레임 안에 SVG로 export한다.
- `[MUST]` 외부에서 사용하기 전에 디자인 시스템 팀 리뷰를 받는다.

### 2.2. Type 선택 규칙 (Stroke Type: Bold / Regular / Light)

- `[MUST]` 컨텍스트에 맞는 stroke type(`Bold`/`Regular`/`Light`)을 적용한다.
- `[AVOID]` 하나의 아이콘 그룹 안에서 서로 다른 stroke type을 섞어 쓰지 않는다.
- `[MUST]` 각 stroke type마다 정의된 사이즈 규칙(2.3~2.5)을 따른다.

### 2.3. Type=Bold 규칙

- Exterior stroke `8px`, Interior stroke `7 / 7.5px`
- 사이즈 variation: `12×12` / `16×16` / `24×24`

### 2.4. Type=Regular 규칙

- Exterior stroke `5px`, Interior stroke `4 / 4.5px`
- 사이즈 variation: `24×24` / `36×36` / `48×48`

### 2.5. Type=Light 규칙

- Exterior stroke `3px`, Interior stroke `3px`
- 사이즈 variation: `64×64` / `72×72` / `96×96`

### 2.6. Grid & Keyline 규칙

- `[MUST]` `96 × 96` 그리드를 기준으로 제작한다 (100%/300% 확대 시에도 그리드·키라인 비율은 동일).
- `[MUST]` Keyline 도형별 기준 크기를 따른다: `Square 82×82`, `Circle 86×86`, `Vertical rectangle 66(w)×86(h)`, `Horizontal rectangle 88(w)×60(h)` (3.2 참고).
- `[MUST]` Keyline 테두리는 **중앙 정렬(Borders Align: Center)** 기준으로 맞춘다.

### 2.7. Anatomy (구조 용어 정의)

> 규칙이 아니라, 아이콘의 각 부분을 지칭하는 공통 용어입니다. 챗봇이 "Exterior stroke가 뭐야?" 같은 질문에 답할 때 참고합니다.
> 
- `Exterior stroke` / `Interior stroke`: 외곽선 / 내부선
- `Exterior stroke terminal` / `Interior stroke terminal`: 외곽선 끝단 / 내부선 끝단
- `Corner`: 모서리
- `Fill`: 채워진 면
- `Counter`: 도형 안쪽의 빈 공간
- `Gap`: 선과 선 사이의 틈

### 2.8. Stroke Terminal 규칙

- `[MUST]` 열린 도형(open shape)의 끝 타입은 **Butt Cap**을 기본으로 한다.
- `[ALLOW]` 얼굴 표정, 인체, 원형 등의 케이스는 **Round Cap**을 예외로 허용한다.

### 2.9. Corners 규칙

- `[MUST]` 도형 내 각(angle)의 join 타입은 **Miter Join**, radius(round corner)는 `1px`을 기본으로 한다.
- `[ALLOW]` Arrow, Time, Check, Door, 작은 사각형, Zigzag line 케이스는 radius `0px`(Miter Join은 유지)를 예외로 허용한다.

### 2.10. Angle 규칙

- `[MUST]` 대각선을 쓸 때 기본 `45°` 각도를 적용한다. 더 정밀한 표현이 필요하면 `5°` 단위로 조정할 수 있다.
- `[MUST]` 부정적 상태(Off, Inactive, Rejected, Prohibited 등)를 표현할 때는 `135°(-45°)` 각도를 아이콘 메타포에 포함시킨다.
- `[MUST]` 화살표 머리(Arrowhead)는 `45°` 단위로 각도를 준다.
- `[MUST]` 시계 아이콘의 시침·분침은 **3시 방향(90°)**으로 고정한다.
- `[ALLOW]` 보조 메타포와 시각적으로 겹치는 경우, **9시 방향(270°)**을 대안으로 사용할 수 있다.

### 2.11. Typeface Align 규칙 (텍스트 포함 아이콘)

- `[MUST]` 텍스트만 있는 아이콘은 **중앙 정렬**(Text only – Center align)한다.
- `[MUST]` 아이콘 내부에 텍스트가 있으면 **중앙 정렬**(Inside – Center align)한다.
- `[SHOULD]` 아이콘 하단에 텍스트가 있으면 컨텍스트에 따라 **중앙 정렬**(Bottom – Center align, 예: "FREE") 또는 **우측 정렬**(Bottom – Right align, 예: "OFF")을 선택한다.

### 2.12. Logo 규칙

- `[MUST]` 브랜드 로고는 항상 해당 브랜드가 제공하는 **공식 로고 파일**을 사용한다. 임의로 새로 그리지 않는다.

### 2.13. Spaces(여백) 규칙

- `[MUST]` `24px` 아이콘 기준으로 **터치 타겟 영역 40px**을 확보한다.
- `[MUST]` 아이콘 주변에 **Clearance area(여백)**를 확보해 다른 요소와 겹치지 않게 한다.

---

## 99. 관련 피그마 좌표 (Figma Coordinate)

- **Section Link**: 미정(TBD)
- **Component Set Link**: 미정(TBD)
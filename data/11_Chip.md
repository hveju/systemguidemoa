# Chip (칩)

DB 등록: 2차
담당자: Daisy
분류: 02. Element
작업: 2026년 8월 21일 오전 11:24
작업상태: 진행 중
하위 항목: Action (https://app.notion.com/p/Action-3c315929183280888900ca1e465174e4?pvs=21), Select (https://app.notion.com/p/Select-3c31592918328046a5f3ea0eee23d10e?pvs=21)

# Chip (칩)

## 0. 메타

### 0.1. 분류 (Category)

1. Component / Chip

### 0.2. 타입 종류 (Types)

`action`, `select`

### 0.3. 타입 별 요소 (keyword)

- **action** : `동적액션` `필터버튼` `태그버튼` `바로가기` `옵션선택`
- **select** : `선택된태그` `제거가능필터` `삭제버튼` `멀티선택` `x버튼`

### 0.4. Figma Node ID

`미정(TBD)`

## 1. 개요

### 1.1. 정의

정보를 효과적으로 분류, 필터링하거나 신속한 단독 액션을 실행하기 위해 사용되는 컴팩트한 알약(`Pill`) 형태의 대화형 UI 요소.

### 1.2. 적용 상황

- 특정 키워드나 카테고리를 눌러 단일 액션을 실행하거나 필터를 토글할 때 → `type=action` 사용
- 선택된 필터 항목을 명시적으로 나열하고, 오른쪽 `x` 버튼으로 항목을 삭제/해제할 때 → `type=select` 사용

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- **[공통][MUST]** 칩 컴포넌트의 모서리 곡률은 항상 `Pill` 규격(`height 1/2` 또는 `9999px`)을 준수한다.
- **[공통][MUST]** 너비 속성은 `Hug Contents`를 기본으로 하여 레이블 길이에 맞춰 가변 적용한다.
- **[공통][SHOULD]** 반응형 디바이스 환경(`PC` / `MO`)에 맞춰 정의된 크기 옵션을 일관되게 적용한다.
- **[공통][AVOID]** 양식 제출이나 폼의 핵심 확인을 담당하는 Primary 버튼 용도로 칩을 혼용하는 것을 금지한다.

### 2.2. Type 선택 규칙

- **[공통][MUST]** 단독 액션 유도 또는 단순 선택/비선택 상태 전환에는 `type=action`을 적용한다.
- **[공통][MUST]** 선택 결과값을 태그 형태로 나열하고 즉시 제거 기능을 제공해야 하는 경우 `type=select`를 적용한다.

### 2.3. Type별 규칙

- **[type=action][MUST]** 디바이스에 맞춰 `PC` 환경에서는 `small`, `medium`, `large` 중 선택하며, `MO` 환경에서는 `small`, `medium` 중 선택하여 적용한다.
- **[type=select][MUST]** 레이블 우측에 삭제 액션을 위한 `x` 아이콘을 반드시 포함한다.
- **[type=select][SHOULD]** `x` 아이콘 영역 선택 시 해당 칩이 목록에서 즉시 제거되는 삭제 인터랙션을 제공한다.

## 3. 스펙 및 토큰 (Design Tokens)

### 3.1. 공통

- **너비(Width)**: `Hug Contents`
- **정렬(Align)**: 수평 스택, 가운데 정렬
- **레이블 폰트(Label Font)**: `SamsungOne`
- **레이블 굵기(Font Weight)**: `700`
- **라운드 규칙(Radius Rule)**: `type=Pill` (`height 1/2` 또는 `9999px`)
- **라벨이 한글일 경우**: `Samsung One Korean` 적용 권장

### 3.2. type = action

- **디바이스별 크기 범위**:
    - `PC` : `small`, `medium`, `large`
    - `MO` : `small`, `medium`
- **size = small**:
    - **높이(Height)**: `28px`
    - **패딩(Padding)**: `4px 12px 4px 12px`
    - **폰트 크기(Font Size)**: `12px`
    - **행간(Line Height)**: `16px`
- **size = medium**:
    - **높이(Height)**: `32px`
    - **패딩(Padding)**: `6px 16px 6px 16px`
    - **폰트 크기(Font Size)**: `14px`
    - **행간(Line Height)**: `18px`
- **size = large (PC 전용)**:
    - **높이(Height)**: `40px`
    - **패딩(Padding)**: `8px 20px 8px 20px`
    - **폰트 크기(Font Size)**: `16px`
    - **행간(Line Height)**: `22px`

### 3.3. type = select

- **구성 요소**: Label + Trailing Icon (`x`)
- **높이(Height)**: `32px` (`medium` 기준 기본값)
- **패딩(Padding)**: `6px 12px 6px 16px` (상 우 하 좌)
- **아이콘 간격(Gap)**: `4px`
- **아이콘 크기(Icon Size)**: `16px`
- **폰트 크기(Font Size)**: `14px`
- **행간(Line Height)**: `18px`

## 4. 상태별 가이드 (States)

### 4.1. theme = light_bg

- **normal**: 배경 `Primary/White` 또는 `Gray 100` · 테두리 `Gray 300` 1px · 텍스트 `Gray 900`
- **hover**: 배경 `Gray 200` · 테두리 `Gray 400` 1px · 텍스트 `Black`
- **disabled**: 배경 `Gray 100` · 테두리 `Gray 200` 1px · 텍스트 `Gray 400` · 전체 투명도 `40%` · `click = false`
- **pressed**: 배경 `Gray 300` · 테두리 `Gray 500` 1px · 텍스트 `Black`
- **focused**: 테두리 `Primary Color` 2px (`focus` 아웃라인 적용)

### 4.2. theme = dark_bg

- **normal**: 배경 `Gray 800` · 테두리 `Gray 600` 1px · 텍스트 `White`
- **hover**: 배경 `Gray 700` · 테두리 `Gray 500` 1px · 텍스트 `White`
- **disabled**: 배경 `Gray 900` · 테두리 `Gray 800` 1px · 텍스트 `Gray 600` · 전체 투명도 `40%` · `click = false`
- **pressed**: 배경 `Gray 600` · 테두리 `Gray 400` 1px · 텍스트 `White`
- **focused**: 테두리 `Primary Color` 2px (`focus` 아웃라인 적용)
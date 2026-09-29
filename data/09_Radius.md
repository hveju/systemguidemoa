# Radius

DB 등록: 2차
담당자: Daisy
분류: 01. Foundation
작업: 2026년 8월 12일 오후 1:36
작업상태: 진행 중
하위 항목: Pill (https://app.notion.com/p/Pill-3ba15929183280c390cbec83a305bf22?pvs=21), Control (https://app.notion.com/p/Control-3ba1592918328097b57df0bac6575a38?pvs=21), Surface (https://app.notion.com/p/Surface-3ba15929183280c59f7ff6b2a6e8cf37?pvs=21), Overlay (https://app.notion.com/p/Overlay-3ba1592918328043a4e4f981b4bddafc?pvs=21)

# Radius (라운드)

## 0. 메타

### 0.1. 분류 (Category)

1. Foundation / Radius

### 0.2. 타입 종류 (Types)

Pill, Control, Surface, Overlay

### 0.3. 타입 별 요소 (keyword)

- **Pill** : 완전라운드 알약버튼 칩 뱃지 태그
- **Control** : 버튼 입력필드 체크박스 토글 소형컨트롤
- **Surface** : 카드 레이아웃컨테이너 섹션 패널
- **Overlay** : 모달 팝업 바텀시트 툴팁 대화상자

### 0.4. Figma Node ID

미정(TBD)

## 1. 개요

### 1.1. 정의

UI 요소의 모서리 곡률(Corner Radius)을 제어하여 컴포넌트의 목적, 크기, 그리고 시각적 위계(대화형 컨트롤, 면적 컨테이너, 플로팅 레이어)를 직관적으로 구분하기 위한 곡률 디자인 토큰 시스템.

### 1.2. 적용 상황

- 알약 형태의 완전한 둥근 컴포넌트를 구성할 때 → **Pill** 사용
- 버튼, 입력 필드 등 사용자가 직접 조작하는 대화형 요소일 때 → **Control** 사용
- 카드, 패널 등 화면 내부의 인라인 면적을 구획할 때 → **Surface** 사용
- 모달, 바텀시트 등 화면 위에 뜨는 최상위 플로팅 레이어일 때 → **Overlay** 사용

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- **[공통][MUST]** 모서리 곡률에 임의의 px 수치를 직접 입력하지 않고, 반드시 정의된 Radius 토큰을 적용한다.
- **[공통][MUST]** 요소의 화면 위계 및 면적 크기(Control < Surface < Overlay)에 비례하여 더 큰 Radius 토큰을 사용한다.
- **[공통][SHOULD]** 부모 컨테이너 안에 자식 요소가 중첩될 때, 자식 요소의 Radius는 부모 요소의 Radius보다 작거나 같게 설정하여 시각적 불균형을 방지한다.
- **[공통][AVOID]** 한 화면 내 동위 계층의 컴포넌트에 서로 다른 Radius 타입을 혼용하는 것을 금지한다.

### 2.2. Type 선택 규칙

- **[공통][MUST]** 양 끝이 반원 형태를 유지해야 하는 요소에는 `type=Pill`을 적용한다.
- **[공통][MUST]** 사용자 인터랙션이 발생하는 UI 컨트롤 요소에는 `type=Control`을 적용한다.
- **[공통][MUST]** 화면 상의 정적 콘텐츠를 담는 컨테이너 요소에는 `type=Surface`를 적용한다.
- **[공통][MUST]** 화면 상단에 레이어로 떠오르는 오버레이 요소에는 `type=Overlay`를 적용한다.

### 2.3. Type별 규칙

- **[type=Pill][MUST]** 높이 값에 수동 대응하도록 높이의 1/2 값 또는 9999px을 적용하여 완전한 알약 형태를 유지한다.
- **[type=Control][MUST]** 컴포넌트의 크기 및 높이에 맞춰 4px ~ 12px 범위 내에서 선택 적용한다.
- **[type=Surface][MUST]** 컨테이너의 면적 크기에 맞춰 12px ~ 20px 범위 내에서 선택 적용한다.
- **[type=Overlay][MUST]** 반응형 디바이스 환경에 따라 PC 환경은 24px, Mobile 환경은 12px을 구분 적용한다.

## 3. 스펙 및 토큰 (Design Tokens)

### 3.1. 공통

- **너비(Width)**: 해당 없음(N/A) — 대상 컴포넌트 스펙에 따름
- **정렬(Align)**: 해당 없음(N/A)
- **레이블 폰트(Label Font)**: 해당 없음(N/A)
- **레이블 굵기(Font Weight)**: 해당 없음(N/A)
- **라운드 규칙(Radius Rule)**: 위계 및 공간 스케일 준수 (Pill: Height 1/2 · Control: 4~12px · Surface: 12~20px · Overlay: PC 24px / Mo 12px)
- **라벨이 한글일 경우**: 해당 없음(N/A)

### 3.2. type = Pill

- **라운드(Radius)**: 높이의 1/2 (또는 9999px)
- **적용 컴포넌트 예시**: Pill Button, Chip, Badge, Tag

### 3.3. type = Control

- **라운드(Radius)**: 4px ~ 12px
- **적용 컴포넌트 예시**: Button, Input Field, Checkbox, Toggle, Dropdown Menu

### 3.4. type = Surface

- **라운드(Radius)**: 12px ~ 20px
- **적용 컴포넌트 예시**: Card, Container, Panel, Section Box

### 3.5. type = Overlay

- **라운드(Radius)**: PC = 24px / Mobile = 12px
- **적용 컴포넌트 예시**: Modal, Dialog, Bottom Sheet, Toast, Tooltip, Popover

## 4. 상태별 가이드 (States)

Radius 토큰은 파운데이션(Foundation) 스타일 속성이므로 hover, disabled, pressed, focused 등 컴포넌트 상태 변화와 관계없이 동일한 라운드 값을 유지한다.

###
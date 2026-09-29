# Option Chip

DB 등록: 2차
담당자: Rhea
분류: 02. Element
작업: 2026년 9월 10일 오후 3:33
작업상태: 진행 중
하위 항목: Color (https://app.notion.com/p/Color-3b415929183280189706d8dd36864708?pvs=21), Label (https://app.notion.com/p/Label-3b415929183280678f44e4982bec5c08?pvs=21), 백업 (https://app.notion.com/p/3d715929183280bc9b98f862574b391c?pvs=21)

# Option Chip

## 0. 메타

### 0.1. 분류(Category)

- `Option Chip`
- `Element`

### 0.2. 타입 종류 (Types)

- `Color`, `Label`

### 0.3. 타입 별 요소 (kyeword)

- Color : 테마별 사용규칙, 상태별 가이드, 컬러그룹
- Label : 테마별 사용규칙, 상태별 가이드

### 0.4. Figma Node ID

---

## 1. 개요

- **정의:** 사용자가 여러 옵션 중 하나 또는 복수의 항목을 선택하거나 필터링할 수 있도록 제공하는 컴포넌트입니다.
- **사용 목적:** 상품 옵션 선택, 필터 조건 지정, 세부 항목 토글 등 직관적인 선택 액션을 제공할 때 사용합니다.
- **기본 구성 (Anatomy):**
    1. Inner circle (내부 원형 요소)
    2. Border (칩 외곽 테두리)
    3. Inner circle border (내부 원 테두리)
    4. Label (텍스트 라벨)
    5. Container (전체 컨테이너 영역)

---

## 2. 사용 규칙 (Usage Rules)

- `[공통][MUST]` 옵션 칩의 높이, 패딩, 라운드, 상태별 색상 토큰은 Figma에 정의된 값을 임의로 수정하지 않고 그대로 따릅니다.
- `[공통][MUST]` 배경 테마(`light_bg` / `dark_bg`)에 따라 정의된 텍스트 및 테두리 색상 반전 규칙을 준수합니다.
- `[공통][SHOULD]` 텍스트 라벨이 포함된 경우 `PC` 환경과 모바일 `MO` 환경의 폰트 사이즈 및 패딩 기준을 구분하여 적용합니다.
- `[공통][SHOULD]` 비활성(`disabled`) 상태의 요소는 전체 요소 혹은 지정된 속성에 `20%` 투명도를 적용합니다.
- `[Type = Color_group][MUST]` 여러 개의 칩이 나열될 때 칩과 하단 컬러 속성명 레이블 사이의 간격 (`Gap`)은 `4px`, 개별 칩 사이의 간격은 `8px`를 유지하며 좌측 정렬(Left-aligned)을 적용합니다.
- `[Type = Label][MUST]` 좌우 8px는 공통 유지, 상하 패딩은 플랫폼별 스펙표 참조

---

## 3. 상태별 가이드 (States)

- **Normal:** 기본 대기 상태 (`Element Opacity 100%`)
- **Hover:** 마우스 포인터가 위치한 상태 (`Element Opacity 70%` 또는 외곽 테두리 활성화)
- **Selected:** 옵션이 선택된 상태 (외곽 Border 활성화)
- **Disabled:** 비활성화 상태 (`Element Opacity 20%`, 인터랙션 불가)

---

## 4. 제약 및 예외 사항 (Edge Cases)

- If theme = `light_bg` -> 텍스트 및 테두리 기본 색상으로 블랙 (`#000000`) 계열을 적용합니다.
- If theme = `dark_bg` -> 텍스트 및 테두리 기본 색상으로 화이트 (`#FFFFFF`) 계열을 적용합니다.
- If state = `disabled` -> 전체 요소 또는 투명도 속성에 `20%`를 강제 적용합니다.
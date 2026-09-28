# Option Chip (옵션 칩)

DB 등록: 2차
담당자: Rhea
분류: 02. Element
작업: 2026년 9월 10일 오후 3:33
작업상태: 진행 중
하위 항목: Color (https://app.notion.com/p/Color-3b415929183280189706d8dd36864708?pvs=21), Label (https://app.notion.com/p/Label-3b415929183280678f44e4982bec5c08?pvs=21), 백업 (https://app.notion.com/p/3d715929183280bc9b98f862574b391c?pvs=21)

## 0. 메타

### 0.1. 분류

- `Element / Option Chip`

### 0.2. 타입 종류

- `Color`, `Label`

### 0.3. 타입별 요소 (키워드)

- Color : 테마별 사용규칙, 상태별 가이드, 컬러그룹
- Label : 테마별 사용규칙, 상태별 가이드

### 0.4. Figma Node ID

- N/A

---

## 1. 개요

### 1.1. 정의

- **정의:** 사용자가 여러 옵션 중 하나 또는 복수의 항목을 선택하거나 필터링할 수 있도록 제공하는 컴포넌트입니다.
- **사용 목적:** 상품 옵션 선택, 필터 조건 지정, 세부 항목 토글 등 직관적인 선택 액션을 제공할 때 사용합니다.

### 1.2. 기본 구성 (Anatomy)

- **기본 구성 (Anatomy):**
    1. Inner circle (내부 원형 요소)
    2. Border (칩 외곽 테두리)
    3. Inner circle border (내부 원 테두리)
    4. Label (텍스트 라벨)
    5. Container (전체 컨테이너 영역)

---

## 2. 사용 규칙

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[ALLOW]`: 예외 허용 · `[AVOID]`: 금지

- `[공통][MUST]` 옵션 칩의 높이, 패딩, 라운드, 상태별 색상 토큰은 Figma에 정의된 값을 임의로 수정하지 않고 그대로 따릅니다.
- `[공통][MUST]` 배경 테마(`light_bg` / `dark_bg`)에 따라 정의된 텍스트 및 테두리 색상 반전 규칙을 준수합니다.
- `[공통][SHOULD]` 텍스트 라벨이 포함된 경우 `PC` 환경과 모바일 `MO` 환경의 폰트 사이즈 및 패딩 기준을 구분하여 적용합니다.
- `[공통][SHOULD]` 비활성(`disabled`) 상태의 요소는 전체 요소 혹은 지정된 속성에 `20%` 투명도를 적용합니다.
- `[Type = Color_group][MUST]` 여러 개의 칩이 나열될 때 칩과 하단 컬러 속성명 레이블 사이의 간격 (`Gap`)은 `4px`, 개별 칩 사이의 간격은 `8px`를 유지하며 좌측 정렬(Left-aligned)을 적용합니다.
- `[Type = Label][MUST]` 좌우 8px는 공통 유지, 상하 패딩은 플랫폼별 스펙표 참조

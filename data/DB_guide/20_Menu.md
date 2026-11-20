# 20_Menu (메뉴)

DB 등록: 3차
담당자: Daisy
분류: 03. Component
작업: 2026년 11월 18일 오후 4:09
작업상태: 1차 완료
하위 항목: Dropdown menu (Dropdown%20menu%2038a15929183280849fc1d28192ee2196.md), Icon leading menu (Icon%20leading%20menu%2038a15929183280e89542ff6f0e034003.md), Select Field (Select%20Field%2038a159291832804e9081fbc4fbb039d0.md)

# menu (메뉴)

## 0. 메타

### 0.1. 분류

- category: Menu
- group: Component

### 0.2. 타입 목록

- Dropdown Menu: 여러 선택지 중 하나를 선택하여 콘텐츠의 카테고리나 항목을 변경하는 메뉴
- Icon Leading Menu: 아이콘이나 버튼을 통해 옵션 목록을 일시적으로 표시하는 메뉴
- Select Field: 여러 선택지 중 하나를 선택하여 콘텐츠를 정렬하거나 정보를 지정하는 메뉴

### 0.3. 검색 키워드

- Dropdown Menu: `드롭다운`, `목록 선택`, `카테고리 선택`, `단일 선택`
- Icon Leading Menu: `아이콘 메뉴`, `버튼 메뉴`, `옵션 목록`, `임시 메뉴`
- Select Field: `셀렉트 필드`, `정렬 옵션`, `선택 필드`, `정보 선택`

## 1. 개요

### 1.1. 정의

- Menu는 사용자 인터랙션에 따라 선택 가능한 옵션 목록을 표시하고, 정의된 항목 중 하나를 선택할 수 있도록 하는 UI 컴포넌트입니다.
- 사용 목적과 메뉴를 호출하는 방식에 따라 Dropdown Menu, Icon Leading Menu, Select Field로 구분합니다.

### 1.2. 적용 상황

- 
- 
- 

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
    
    content: 메뉴는 정의된 아이콘, 버튼, 필드 등 특정 요소의 사용자 인터랙션을 통해 표시되어야 하며, 독립적으로 표시하지 않습니다.
    
- status: MUST
    
    content: 사용자가 정의된 옵션 목록에서 하나의 항목을 선택할 수 있도록 구성합니다.
    

### 2.2. 타입 선택 기준

- Dropdown Menu:
    - 콘텐츠의 카테고리나 분류 등 여러 옵션 중 하나를 선택해야 할 때 사용합니다.
    - 정의된 목록에서 단일 항목을 선택하는 인터랙션에 적용합니다.
- Icon Leading Menu:
    - 아이콘이나 버튼을 통해 메뉴를 호출하고, 관련 옵션 목록을 일시적으로 표시해야 할 때 사용합니다.
    - 특정 요소와 연관된 옵션에 접근할 수 있도록 제공할 때 적용합니다.
- Select Field:
    - 정렬 기준이나 정보 설정 등 현재 선택값을 지정하거나 변경해야 할 때 사용합니다.
    - 여러 옵션 중 하나를 선택하여 콘텐츠의 표시 조건이나 정보를 변경할 때 적용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Dropdown Menu

- status: MUST
content: 현재 선택 상태를 명확하게 알 수 있도록 기본 선택값을 표시합니다.
- status: MUST
content: Dropdown Menu는 Select Field 등 정의된 요소의 사용자 인터랙션을 통해 표시하며, 독립적으로 표시하지 않습니다.

#### 2.3.2. Type: Icon Leading Menu

- status: MUST
content: 아이콘이나 버튼을 트리거로 사용하며, 사용자 인터랙션에 따라 옵션 목록을 일시적으로 표시합니다.

#### 2.3.3. Type: Select Field

- status: MUST
content: 현재 선택된 값을 표시하여 사용자가 설정 상태를 확인할 수 있도록 합니다.
- status: MUST
content: Select Field를 선택하면 해당 필드에 연결된 Dropdown Menu를 표시하여 옵션을 선택할 수 있도록 합니다.

### 2.5. 내부 운영 규칙

#### 2.5.1. 아이콘

- status: MUST
content: Select Field의 화살표 아이콘 컨테이너는 PC 환경에서 24×24px, MO 환경에서 18×18px을 적용합니다.
- status: MUST
content: Icon Leading Menu의 아이콘 컨테이너는 PC와 MO 환경 모두 24×24px을 적용합니다.
- status: AVOID
content: Select Field에 정의된 Arrow 아이콘을 다른 아이콘으로 임의 변경하지 않습니다.
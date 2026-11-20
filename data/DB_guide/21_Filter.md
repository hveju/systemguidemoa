# 21_Filter

DB 등록: 3차
담당자: semi
분류: 03. Component
작업: 2026년 11월 4일 오후 5:23
작업상태: 1차 완료

# Filter (필터)

## 0. 메타

### 0.1. 분류

- category: `Filter`
- group: `Component`

### 0.2. 타입 목록

- `Standard`

### 0.3. 검색 키워드

- `Standard` : `기본 필터`, `필터 버튼`, `필터 메뉴`, `Dropdown`, `필터 선택`

## 1. 개요

### 1.1. 정의

- Filter: 여러 옵션이나 상세 조건을 선택하여 원하는 콘텐츠를 탐색할 수 있도록 돕는 UI 컴포넌트입니다. 메뉴를 열고 닫는 방식으로 조건을 확인하고 적용할 수 있습니다.
- 구성 기준: 기본 타입(`Standard`)을 중심으로 필터의 기능(`Function`), 디바이스별 표현(`Viewport`), 적용 결과 안내(`Feedback`) 및 상태별 스타일·구성 요소·레이아웃 기준을 정의합니다.

### 1.2. 적용 상황

- 다양한 조건을 선택하거나 조합하여 원하는 콘텐츠와 검색 결과를 탐색할 때 적용합니다.
- PC·모바일 등 디바이스 환경에 따라 필터의 배치와 메뉴 노출 방식을 구분할 때 적용합니다.
- 필터의 선택·적용 상태와 검색 결과를 명확하게 전달하여 사용자가 현재 조건을 인지할 수 있도록 할 때 적용합니다.

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
    
    content: 필터의 적용·미적용 상태와 메뉴의 열림·닫힘 상태를 시각적으로 명확하게 구분합니다.
    
- status: MUST
    
    content: 디바이스 환경에 따라 정의된 필터 레이아웃과 메뉴 노출 방식을 적용합니다.
    
- status: MUST
    
    content: 필터 적용 후 선택된 조건과 결과를 사용자가 확인할 수 있도록 관련 정보를 표시합니다.
    
- status: SHOULD
    
    content: 여러 필터를 사용하는 경우 일관된 크기와 간격을 유지하여 탐색과 조작이 용이하도록 구성합니다.
    

### 2.2. 타입 선택 기준

- Standard: 여러 선택 옵션이나 상세 조건을 제공하고, 메뉴의 열림·닫힘을 통해 필터를 설정해야 하는 경우 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Standard

- status: MUST
    
    content: `Standard`는 여러 필터 조건을 개별적으로 선택할 수 있도록 구성하며, 메뉴의 열림·닫힘을 통해 상세 옵션을 제공합니다.
    
- status: MUST
    
    content: 필터가 적용된 상태와 적용되지 않은 상태를 명확하게 구분하고, 선택 결과를 화면에 반영합니다.
    
- status: SHOULD
    
    content: 여러 필터를 함께 제공하는 경우 동일한 컴포넌트 구조와 정렬 기준을 유지합니다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. Function

- status: MUST
    
    content: 필터의 적용 여부와 메뉴의 열림·닫힘 상태를 시각적으로 명확하게 구분합니다.
    
- status: MUST
    
    content: 필터를 선택한 경우 선택 여부를 명확하게 표시하여 현재 적용 상태를 인지할 수 있도록 합니다.
    

#### 2.4.2. Viewport

- status: MUST
    
    content: PC에서는 여러 필터를 가로 방향으로 배치하고, 모바일에서는 컴팩트한 `Button` 형태로 제공합니다.
    
- status: MUST
    
    content: PC에서는 열림·닫힘 아이콘(`▼/▲`)이 포함된 `Dropdown`을 사용하고, 모바일에서는 `Bottom Sheet Popup`을 사용합니다.
    

#### 2.4.3. Feedback

- status: MUST
    
    content: 필터 적용 후에는 선택된 필터 개수, 검색 결과 수 및 현재 적용된 정렬 조건을 표시합니다.
    
- status: SHOULD
    
    content: 선택된 필터 조건을 사용자가 쉽게 확인할 수 있도록 표시하고, 필터를 해제할 수 있는 기능을 제공합니다.
    

#### 2.4.4. Anatomy

필터를 구성하는 요소의 명칭과 역할을 구분하기 위한 공통 용어입니다.

- `Container` : 필터의 전체 영역을 구성하는 컨테이너
- `Label` : 필터의 명칭이나 선택 조건을 표시하는 텍스트
- `Border` : 필터 영역의 경계를 구분하는 테두리
- `Icon` : 필터의 기능이나 메뉴 상태를 나타내는 아이콘
- `Button (CTA)` : 선택된 필터 조건을 초기화하는 등 관련 동작을 실행하는 버튼

#### 2.4.5. States

- status: MUST
    
    content: `Standard`는 `Normal`, `Hover`, `Dropdown_opened`, `Selected` 상태를 구분하여 적용합니다.
    
- status: MUST
    
    content: `Normal`은 기본 상태로 표시하고, `Dropdown_opened`는 메뉴가 열린 상태를 아이콘 방향으로 구분합니다.
    
- status: MUST
    
    content: `Selected`는 필터가 선택된 상태를 테두리 스타일로 구분합니다.
    
- status: MUST
    
    content: `Hover` 상태에서는 `Element Opacity 70%`를 적용하며, 그 외 정의된 상태에서는 `100%`를 적용합니다.
    

#### 2.4.6. Layout

- status: MUST
    
    content: PC 필터 영역은 최대 너비 `1440px`을 기준으로 구성하며, 필터 버튼 높이는 `40px`을 적용합니다.
    
- status: MUST
    
    content: PC 필터 영역의 좌우 여백은 `24px`, 필터 간 간격은 `12px`을 기준으로 적용합니다.
    
- status: MUST
    
    content: 필터 컴포넌트의 `Corner Radius`는 `8px`을 적용합니다.
    
- status: SHOULD
    
    content: 모바일에서는 필터 버튼을 컴팩트하게 구성하며, 장표에 정의된 최대 너비 `145px`을 기준으로 적용합니다.
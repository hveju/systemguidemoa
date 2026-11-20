# 18_Tab (탭)

DB 등록: 3차
담당자: Rhea
분류: 03. Component
작업: 2026년 11월 19일 오후 2:39
작업상태: 1차 완료

# Tab (탭)

## 0. 메타

### 0.1. 분류

- category: `Tab`
- group: `Element`

### 0.2. 타입 목록

**글로벌 타입**

- `Standard / Anchor` : 텍스트 레이블과 하단 Underline을 활용하는 기본 탭
- `Icon` : 아이콘과 텍스트 레이블을 함께 제공하는 카드형 탭

**한총 전용 타입 (`Only_SEC`)**

- `Outlined` : 둥근 외곽 Border로 선택 상태를 표현하는 탭
- `Filled` : 선택된 항목의 배경색을 채워 선택 상태를 표현하는 탭
- `Toggle` : 선택된 항목의 Container와 Border를 강조하는 탭
- `Underlined / Standard / Primary` : PC에서 사용하는 한총 전용 Underline 탭

### 0.3. 검색 키워드

- Standard / Anchor : `기본 탭`, `텍스트 탭`, `앵커 탭`, `Anchor`, `Underline`, `밑줄 탭`, `콘텐츠 전환`
- Icon : `아이콘 탭`, `아이콘 레이블`, `카드형 탭`, `아이콘 내비게이션`, `콘텐츠 전환`
- Outlined : `아웃라인 탭`, `테두리 탭`, `외곽선 탭`, `Pill 탭`, `둥근 테두리`, `선택 테두리`
- Filled : `채움형 탭`, `배경형 탭`, `배경색 선택`, `검정 배경`, `텍스트 탭`
- Toggle : `토글 탭`, `토글형 탭`, `선택 전환`
- Underlined / Standard / Primary : `언더라인 탭`, `밑줄 탭`, `텍스트 탭`

---

## 1. 개요

### 1.1. 정의

- **정의:** Tab은 동일한 화면에서 연관된 콘텐츠를 구분하고, 사용자가 원하는 콘텐츠 영역을 선택하여 전환할 수 있도록 제공하는 내비게이션 컴포넌트이다.
- **사용 목적:** 콘텐츠를 카테고리별로 구분하고 현재 선택된 항목을 명확하게 표시한다.
- **기본 구성:** 글로벌 `Standard / Anchor`, `Icon`과 한총 전용 `Outlined`, `Filled`, `Toggle`, `Underlined / Standard / Primary`로 구분한다.
- **기본 요소:** 타입에 따라 `Label`, `Underline`, `Container`, `Border`, `Icon` 등을 적용한다.
- **기본 원칙:** 선택된 탭은 시각적으로 구분하고, 탭 선택 시 연결된 콘텐츠를 함께 전환한다.
- **플랫폼:** 각 타입에 정의된 `PC`, `Mobile` 규격과 상태를 구분하여 적용한다.

### 1.2. 적용 상황

- `Standard / Anchor` : 텍스트 중심의 카테고리를 구분하고, 선택 항목을 하단 Underline으로 표시할 때 사용한다.
- `Icon` : 아이콘과 레이블을 함께 사용하여 카테고리를 시각적으로 구분할 때 사용한다.
- `Outlined` : 둥근 외곽 테두리를 통해 선택 항목을 강조할 때 사용한다.
- `Filled` : 선택 항목의 배경색을 변경하여 활성 상태를 명확하게 표현할 때 사용한다.
- `Toggle` : 선택된 항목의 컨테이너와 테두리를 강조하는 방식으로 탭을 구성할 때 사용한다.
- `Underlined / Standard / Primary` : 한총 PC 환경에서 텍스트와 Underline으로 선택 상태를 표현할 때 사용한다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: `MUST`
    
    content: 하나의 Tab 그룹에서는 한 번에 하나의 항목만 선택된 상태로 유지한다.
    
- status: `MUST`
    
    content: 탭 선택 시 기존 선택 항목을 선택 해제하고, 새롭게 선택된 항목에 선택 상태를 적용한다.
    
- status: `MUST`
    
    content: 탭 선택 시 연결된 콘텐츠 영역도 함께 전환한다.
    
- status: `MUST`
    
    content: 선택 상태는 각 타입에 정의된 `Underline`, `Border`, `Container` 등의 스타일을 기준으로 표시한다.
    
- status: `MUST`
    
    content: 글로벌 타입과 한총 전용 타입을 구분하고, 해당 타입에 정의된 규격을 적용한다.
    
- status: `MUST`
    
    content: 각 타입에 정의된 플랫폼, 상태, 서체, 컬러 및 구성 요소 규격을 임의로 변경하지 않는다.
    
- status: `SHOULD`
    
    content: 탭 항목의 수와 화면 너비를 고려하여 모든 항목을 표시하거나 가로 스크롤 방식으로 제공한다.
    

### **2.2. Type 선택 규칙**

- `Standard / Anchor`:
    - 텍스트 레이블을 중심으로 카테고리를 구분하고 하단 `Underline`으로 선택 상태를 표시할 때 사용합니다.
    - 글로벌 규격에 따라 텍스트 기반의 콘텐츠를 전환할 때 사용합니다.
- `Icon`:
    - 아이콘과 텍스트 레이블을 함께 제공하여 각 항목의 의미를 시각적으로 구분할 때 사용합니다.
    - 글로벌 규격에 따라 카테고리를 아이콘과 함께 직관적으로 표시할 때 사용합니다.
- `Outlined`:
    - 둥근 외곽 `Border`의 색상과 두께를 통해 선택 상태를 강조할 때 사용합니다.
    - 한총 전용 규격에 따라 테두리형 탭을 구성할 때 사용합니다.
- `Filled`:
    - 선택된 항목의 배경색을 채워 활성 상태를 명확하게 구분할 때 사용합니다.
    - 한총 전용 규격에 따라 배경색을 활용한 강조형 탭을 구성할 때 사용합니다.
- `Toggle`:
    - 선택된 항목의 `Container`와 `Border`를 강조하여 선택 상태를 구분할 때 사용합니다.
    - 한총 전용 규격에 따라 토글 형태의 탭을 구성할 때 사용합니다.
- `Underlined / Standard / Primary`:
    - 텍스트 레이블 하단의 `Underline`으로 선택 상태를 표시할 때 사용합니다.
    - 한총 전용 `PC Only` 규격에 따라 텍스트 기반의 콘텐츠를 전환할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Standard / Anchor

- status: `MUST`
    
    content: 텍스트 `Label`과 선택 항목의 하단 `Underline`으로 구성한다.
    
- status: `MUST`
    
    content: `PC`와 `Mobile`에 정의된 상태 및 서체 규격을 구분하여 적용한다.
    
- status: `MUST`
    
    content: 선택된 항목에 `2px` 높이의 Underline을 표시한다.
    
- status: `MUST`
    
    content: 탭 그룹의 구분선은 `#DDDDDD`, `1px` 규격을 적용한다.
    

#### 2.3.2. Type: Icon

- status: `MUST`
    
    content: `Icon`과 `Label`을 함께 제공하며, 두 요소를 중앙 정렬한다.
    
- status: `MUST`
    
    content: `PC`의 Icon은 `32×32px`, `Mobile`의 Icon은 `24×24px` 규격을 적용한다.
    
- status: `MUST`
    
    content: 탭 항목의 Border는 `2px`, Radius는 `8px`을 적용한다.
    
- status: `MUST`
    
    content: 각 플랫폼에 정의된 상태별 Border 컬러를 적용한다.
    

#### 2.3.3. Type: Outlined

- status: `MUST`
    
    content: 둥근 Border를 가진 텍스트 탭으로 구성한다.
    
- status: `MUST`
    
    content: Radius는 `999`로 정의된 규격을 적용한다.
    
- status: `MUST`
    
    content: 기본 상태는 `1px`, 선택 상태는 `2px` Border를 적용한다.
    
- status: `MUST`
    
    content: `PC`와 `Mobile`의 상태별 Label 및 Border 컬러를 구분하여 적용한다.
    

#### 2.3.4. Type: Filled

- status: `MUST`
    
    content: 선택되지 않은 항목에는 흰색 Container와 기본 Border를 적용하고, 선택된 항목에는 검정색 Container를 적용한다.
    
- status: `MUST`
    
    content: 선택된 항목의 Label은 흰색으로 표시한다.
    
- status: `MUST`
    
    content: `PC`는 `20px`, `Mobile`은 `8px` Radius를 적용한다.
    
- status: `MUST`
    
    content: `Normal`, `Selected` 상태를 기준으로 적용한다.
    

#### 2.3.5. Type: Toggle

- status: `MUST`
    
    content: `Normal`, `Selected` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `PC`는 `32px`, `Mobile`은 `24px` Radius를 적용한다.
    
- status: `MUST`
    
    content: 선택된 항목에는 흰색 Container와 검정색 `2px` Border를 적용한다.
    
- status: `MUST`
    
    content: 선택된 항목의 Label은 검정색으로 표시한다.
    

#### 2.3.6. Type: Underlined / Standard / Primary

- status: `MUST`
    
    content: `PC`에서만 사용한다.
    
- status: `MUST`
    
    content: 선택된 항목의 Label 하단에 `2px` Underline을 적용한다.
    
- status: `MUST`
    
    content: `Normal`, `Hover`, `Selected`, `Selected_hover` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Samsung One Korean 700`, `18px`의 Label 규격을 적용한다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. PC 상태 및 인터랙션

- status: `MUST`
    
    content: `Standard / Anchor`, `Icon`, `Outlined`, `Underlined / Standard / Primary`는 `Normal`, `Hover`, `Selected`, `Selected_hover` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Filled`, `Toggle`은 제공된 가이드에 정의된 `Normal`, `Selected` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Hover`는 마우스 포인터가 위치한 상태로, `Selected_hover`는 선택된 항목에 마우스 포인터가 위치한 상태로 구분한다.
    

#### 2.4.2. Mobile 상태 및 인터랙션

- status: `MUST`
    
    content: `Standard / Anchor`, `Icon`, `Outlined`는 `Normal`, `Pressed`, `Selected`, `Pressed_selected` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Filled`, `Toggle`은 제공된 가이드에 정의된 `Normal`, `Selected` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Underlined / Standard / Primary`는 Mobile에 적용하지 않는다.
    

#### 2.4.3. 배치 및 스크롤

- status: `SHOULD`
    
    content: 탭 항목이 지정된 영역 안에 모두 표시되는 경우 고정 배치 방식으로 제공한다.
    
- status: `MUST`
    
    content: 가로 스크롤 방식으로 구성한 경우 화면 밖의 항목도 스크롤을 통해 접근할 수 있도록 한다.
    
- status: `SHOULD`
    
    content: 모바일 화면에서 일부 항목이 보이지 않는 경우 가이드에 정의된 좌우 이동 컨트롤을 활용한다.
    

---

### 2.5. 내부 운영 규칙

#### 2.5.1. 한총 전용 타입 구분

- status: `MUST`
    
    content: `Outlined`, `Filled`, `Toggle`, `Underlined / Standard / Primary`는 가이드에 `Only_SEC`로 표시된 한총 전용 타입으로 구분한다.
    
- status: `MUST`
    
    content: 한총 전용 타입은 글로벌 `Standard / Anchor`, `Icon`과 별도 규격으로 관리한다.
    

#### 2.5.2. Outlined와 Filled의 차이

- status: `MUST`
    
    content: `Outlined`는 둥근 외곽 Border의 색상과 두께를 변경하여 선택 상태를 표시한다.
    
- status: `MUST`
    
    content: `Filled`는 선택된 항목의 Container를 검정색으로 채우고 Label을 흰색으로 표시한다.
    
- status: `AVOID`
    
    content: `Filled`를 Border만 변경하는 스타일로 해석하거나 `Outlined`와 혼용하지 않는다.
    

#### 2.5.3. Toggle 적용 규격

- status: `MUST`
    
    content: `Toggle`은 `Normal`, `Selected` 상태로 구분하며, 선택된 항목에 흰색 Container와 검정색 Border를 적용한다.
    
- status: `MUST`
    
    content: 플랫폼별 Radius는 `PC 32px`, `MO 24px`을 적용한다.
    

#### 2.5.4. Underlined / Standard / Primary 적용 범위

- status: `MUST`
    
    content: `Underlined / Standard / Primary`는 한총 전용 `PC Only` 타입으로 구분한다.
    
- status: `AVOID`
    
    content: `MO`에 해당 타입을 임의로 확장하여 사용하지 않는다.
    

#### 2.5.5. 탭 노출 개수 및 배치 기준

- status: `ALLOW`
    
    content: 하나의 탭 그룹 내 구성할 수 있는 탭 항목의 개수에는 제한을 두지 않는다.
    
- status: `SHOULD`
    
    content: 디바이스별 화면 뷰포트(`Viewport`)를 고려하여 탭 항목을 배치하고, 가용 영역 내에서 `1줄` 노출을 권장한다.
    
- status: `ALLOW`
    
    content: 탭 항목이 화면 뷰포트의 가로 영역을 초과하는 경우 `2줄 배치` 또는 `가로 스크롤` 방식으로 구성할 수 있다.
    
- status: `MUST`
    
    content: 가로 스크롤 적용 시 화면 밖의 모든 탭 항목에 접근하고 선택할 수 있도록 구성한다.
    
- status: `MUST`
    
    content: `MO`에서 탭 항목이 화면 뷰포트를 초과하여 가로 스크롤을 적용하는 경우, 탭 항목과 좌우 이동 버튼이 겹치는 영역에는 딤 처리(`Dimmed`)와 `Arrow Icon`이 결합된 컴포넌트를 적용하며 기존 형태를 유지한다.
    
- status: `MUST`
    
    content: 배치 방식에 관계없이 각 타입에 정의된 컴포넌트 규격을 유지한다.
# 15_Option Chip

DB 등록: 2차
담당자: Rhea
분류: 02. Element
작업: 2026년 11월 19일 오후 2:38
작업상태: 1차 완료
하위 항목: Color (Color%203b415929183280189706d8dd36864708.md), Label (Label%203b415929183280678f44e4982bec5c08.md)

# Option Chip (옵션 칩)

## 0. 메타

### 0.1. 분류

- category: `Option Chip`
- group: `Element`

### 0.2. 타입 목록

- `Colorchip` : 제품의 색상 옵션을 원형 컬러 칩으로 표시하고 선택할 수 있도록 제공하는 타입
- `Label` : 텍스트를 통해 제품의 사양이나 옵션을 표시하고 선택할 수 있도록 제공하는 타입

**그룹 구성**

- `Colorchip_group` : 여러 개의 `Colorchip`과 선택된 색상의 속성명 Label을 함께 제공하는 그룹 구성

### 0.3. 검색 키워드

- Colorchip : `컬러 칩`, `색상 칩`, `색상 선택`, `컬러 옵션`, `제품 색상`, `Colorchip`, `Inner Circle`, `선택 테두리`
- Colorchip_group : `컬러 그룹`, `색상 그룹`, `컬러칩 그룹`, `색상 속성명`, `Colorchip_group`
- Label : `라벨 칩`, `텍스트 옵션`, `옵션 선택`, `사양 선택`, `저장 용량`, `크기 선택`, `용량 선택`, `옵션 필터`, `선택 테두리`

---

## 1. 개요

### 1.1. 정의

- **정의:** Option Chip은 사용자가 색상이나 텍스트 기반 옵션을 선택할 수 있도록 제공하는 컴포넌트이다.
- **사용 목적:** 제품의 색상 및 사양을 직관적으로 표시하고, 선택 여부와 사용 가능 상태를 시각적으로 구분한다.
- **기본 구성:** `Colorchip`, `Label`의 2개 타입과 `Colorchip_group` 구성으로 구분한다.
- **기본 요소:** 타입에 따라 `Inner Circle`, `Inner Circle Border`, `Border`, `Label` 등을 적용한다.
- **기본 원칙:** 옵션의 성격에 적합한 타입을 선택하고, 각 타입에 정의된 상태 및 스타일 규격을 준수한다.
- **플랫폼:** `Colorchip`과 `Colorchip_group`은 `Common`, `Label`은 `PC`, `Mobile` 규격을 적용한다.

### 1.2. 적용 상황

- `Colorchip` : 제품의 색상 옵션을 시각적으로 표시하고 원하는 색상을 선택할 때 사용한다.
- `Colorchip_group` : 여러 색상 옵션을 나열하고 선택된 색상의 속성명을 함께 표시할 때 사용한다.
- `Label` : 저장 용량, 크기 등 텍스트 기반 옵션을 표시하고 선택할 때 사용한다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: `MUST`
    
    content: 옵션의 성격에 따라 `Colorchip` 또는 `Label` 타입을 선택하여 사용한다.
    
- status: `MUST`
    
    content: 선택된 옵션과 선택되지 않은 옵션은 각 타입에 정의된 스타일로 구분한다.
    
- status: `MUST`
    
    content: 각 타입에 정의된 상태, 컬러, 크기, Border 및 서체 규격을 준수한다.
    
- status: `MUST`
    
    content: `Disabled` 상태는 선택할 수 없는 옵션으로 구분하고 사용자 인터랙션을 허용하지 않는다.
    
- status: `MUST`
    
    content: `Label`타입은  `PC`와 `Mobile`에 정의된 규격을 적용한다.
    
- status: `AVOID`
    
    content: 정의된 컴포넌트의 크기, 컬러, Border 및 서체 규격을 임의로 변경하지 않는다.
    

### **2.2. Type 선택 규칙**

- `Colorchip`:
    - 색상 자체가 선택 대상이며, 컬러 옵션을 시각적으로 제공해야 할 때 사용합니다.
    - 제품의 색상 옵션을 표시하고 원하는 색상을 선택할 때 사용합니다.
- `Colorchip_group`:
    - 여러 컬러 칩을 그룹으로 구성하고 선택된 색상의 속성명을 함께 표시할 때 사용합니다.
    - 독립적인 옵션 타입이 아닌 `Colorchip`의 그룹 구성으로 사용합니다.
- `Label`:
    - 텍스트로 구분되는 제품의 옵션이나 사양을 선택할 때 사용합니다.
    - 저장 용량, 크기 등 텍스트 기반의 옵션을 표시하고 선택할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Colorchip

- status: `MUST`
    
    content: `Inner Circle`, `Inner Circle Border`, `Border`로 구성된 원형 컬러 칩을 사용한다.
    
- status: `MUST`
    
    content: `Normal`, `Hover`, `Selected`, `Disabled` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Inner Circle`은 `24×24px` 크기를 적용한다.
    
- status: `MUST`
    
    content: `Inner Circle Border`는 `#000000`, `20%`, `1px (Inline)` 규격을 적용한다.
    
- status: `MUST`
    
    content: `Hover` 상태에서는 `32×32px`, `#000000`, `70%`, `1px (Inline)`의 외곽 Border를 적용한다.
    
- status: `MUST`
    
    content: `Selected` 상태에서는 `32×32px`, `#000000`, `1px (Inline)`의 외곽 Border를 적용한다.
    
- status: `MUST`
    
    content: `Disabled` 상태에서는 `Inner Circle`에 `20%` Opacity를 적용하고 외곽 Border를 표시하지 않는다.
    
- status: `MUST`
    
    content: `Normal` 상태에서는 선택 상태를 나타내는 외곽 Border를 표시하지 않는다.
    

#### 2.3.2. Type: Label

- status: `MUST`
    
    content: 텍스트 `Label`과 선택 상태를 나타내는 `Border`로 구성한다.
    
- status: `MUST`
    
    content: `PC`는 `Normal`, `Hover`, `Selected`, `Disabled` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Mobile`은 `Normal`, `Selected`, `Disabled` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: `Normal` 상태에서는 Border 없이 기본 Label을 표시한다.
    
- status: `MUST`
    
    content: `Selected` 상태에서는 `#000000`, `1px (Inline)` Border와 `4px` Radius를 적용한다.
    
- status: `MUST`
    
    content: `Selected` 상태의 Label은 `Samsung One Korean 700`을 적용한다.
    
- status: `MUST`
    
    content: `Disabled` 상태에서는 `20%` Opacity를 적용하고 Border를 표시하지 않는다.
    
- status: `MUST`
    
    content: `PC`와 `Mobile`에 정의된 서체 크기 및 상태별 Opacity를 구분하여 적용한다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. Colorchip_group

- status: `MUST`
    
    content: 여러 개의 `Colorchip`과 선택된 색상의 속성명을 표시하는 `Label`로 구성한다.
    
- status: `MUST`
    
    content: 색상 속성명 Label은 `Samsung One Korean 400`, `12px`, `#000000` 규격을 적용한다.
    

---

### 2.5. 내부 운영 규칙

#### 2.5.1. 타입 및 그룹 구성 구분

- status: `MUST`
    
    content: `Colorchip`, `Label`은 개별 옵션 타입으로, `Colorchip_group`은 여러 컬러 칩과 색상 속성명을 함께 제공하는 그룹 구성으로 구분한다.
    
- status: `AVOID`
    
    content: `Colorchip_group`을 독립적인 옵션 타입으로 분류하거나 `Label` 타입과 혼용하지 않는다.
    

#### 2.5.2. 플랫폼별 규격 적용

- status: `MUST`
    
    content: `Colorchip`, `Colorchip_group`은 `PC`, `MO`에서 동일한 규격을 적용한다.
    
- status: `MUST`
    
    content: `Label`은 `PC`, `MO`에 각각 정의된 상태 및 서체 규격을 적용한다.
    

#### 2.5.3. Option Selector와 Option Chip의 사용 영역 구분

- status: `MUST`
    
    content: `Option Selector`의 컬러 선택 타입은 `PF` 영역에서 사용하며, `Option Chip`의 `Colorchip` 타입은 `PD` 영역의 프로덕트 카드 내부에서 사용한다.
    
- status: `AVOID`
    
    content: 두 컴포넌트는 동일한 색상 선택 기능을 제공하더라도 정의된 사용 영역을 벗어나 혼용하지 않는다.
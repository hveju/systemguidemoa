# 22_Text Field

DB 등록: 3차
담당자: Rhea
분류: 03. Component
작업: 2026년 11월 19일 오후 2:40
작업상태: 1차 완료

# Text Field (텍스트 필드)

## 0. 메타

### 0.1. 분류

- category: `Text Field`
- group: `Component`

### 0.2. 타입 목록

**글로벌 타입**

- `Single Line` : 한 줄의 짧은 텍스트를 입력하는 라인형 입력 필드
- `Multi Line` : 여러 줄의 긴 텍스트를 입력하는 박스형 입력 필드
- `Single Entry` : PC 필터 패널에서 가격을 입력하는 박스형 입력 필드

**한총 전용 타입 (`Only_SEC`)**

- `Single Line(SEC)` : 한총 전용 박스형 한 줄 입력 필드

### 0.3. 검색 키워드

- Single Line : `한 줄 입력`, `단일 행`, `라인형 인풋`, `라인형 입력 필드`, `글로벌 입력 필드`
- Multi Line : `여러 줄 입력`, `여러 줄 입력 필드`, `박스형 인풋`, `긴 텍스트 입력 필드`, `메시지 입력`
- Single Entry : `가격 입력`, `가격 조정`, `금액 입력`, `가격 필터`, `필터 패널`, `박스형 인풋`, `숫자 입력`
- Single Line(SEC) : `한 줄 입력`, `단일 행`, `박스형 인풋`, `박스형 입력 필드`, `한총 입력 필드`, `한국총괄 입력 필드`, `SEC 입력 필드`

---

## 1. 개요

### 1.1. 정의

- **정의:** Text Field는 사용자가 텍스트 콘텐츠를 입력하거나 수정할 수 있는 컴포넌트이다.
- **사용 목적:** 사용자의 입력을 수집하고, 입력 항목의 목적과 조건을 안내하며, 입력 오류 및 유효성 검사 결과를 전달한다.
- **기본 구성:** 글로벌 `Single Line`, `Multi Line`, `Single Entry`와 한총 전용 `Single Line(SEC)`으로 구분한다.
- **기본 요소:** `Input Line`, `Label`, `Input Text`, `Assistive Text`, `Text Counter`, `Icon`, `Container`, `Border` 등으로 구성하며, 타입에 따라 적용 요소가 다르다.
- **기본 원칙:** 입력 목적과 길이, 적용 규격에 따라 타입을 선택하고 각 타입에 정의된 상태 및 구성 요소 규격을 준수한다.

### 1.2. 적용 상황

- `Single Line` : 글로벌 라인형 입력 필드로, 한 줄의 짧은 텍스트를 입력할 때 사용한다.
- `Multi Line` : 글로벌 박스형 입력 필드로, 여러 줄의 긴 설명이나 메시지를 입력할 때 사용한다.
- `Single Entry` : 글로벌 박스형 입력 필드로, PC 필터 패널에서 가격을 입력할 때 사용한다.
- `Single Line(SEC)` : 한총 전용 박스형 입력 필드로, 한 줄의 텍스트를 입력할 때 사용한다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: `MUST`
    
    content: 입력 목적과 적용 규격에 따라 `Single Line`, `Multi Line`, `Single Entry`, `Single Line(SEC)` 중 적절한 타입을 선택한다.
    
- status: `MUST`
    
    content: 글로벌 타입과 한총 전용 타입을 구분하고, 해당 타입에 정의된 구성 요소와 상태 규격을 적용한다.
    
- status: `MUST`
    
    content: 입력 오류 및 유효성 검사 결과는 해당 타입에 정의된 상태와 안내 요소를 통해 표시한다.
    
- status: `MUST`
    
    content: 각 타입에 정의된 서체, 컬러, 크기, Border 및 Radius 규격을 임의로 변경하지 않는다.
    
- status: `SHOULD`
    
    content: 입력 항목의 목적을 알 수 있도록 `Label`을 제공하고, 추가 안내가 필요한 경우 해당 타입에 정의된 보조 텍스트를 사용한다.
    
- status: `AVOID`
    
    content: 글로벌 라인형 입력 필드와 한총 전용 박스형 입력 필드의 스타일을 혼용하지 않는다.
    

### **2.2. Type 선택 규칙**

- `Single Line`:
    - 한 줄의 짧은 텍스트를 입력할 때 사용합니다.
    - 글로벌 규격에 따라 입력 영역을 하단 `Input Line`으로 구분하는 라인형 입력 필드를 제공할 때 사용합니다.
- `Multi Line`:
    - 여러 줄의 긴 텍스트를 입력할 때 사용합니다.
    - 글로벌 규격에 따라 상세 설명, 메시지 등을 입력하는 박스형 입력 필드를 제공할 때 사용합니다.
- `Single Entry`:
    - 가격을 입력하거나 조정할 때 사용합니다.
    - `PC Only` 규격에 따라 필터 패널 내 가격 입력 필드를 제공할 때 사용합니다.
- `Single Line(SEC)`:
    - 한 줄의 짧은 텍스트를 입력할 때 사용합니다.
    - 한총 전용 규격에 따라 `Container`와 `Border`로 구성된 박스형 입력 필드를 제공할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Single Line

- status: `MUST`
    
    content: 하단 `Input Line`으로 입력 영역을 구분하는 라인형 입력 필드로 구성한다.
    
- status: `MUST`
    
    content: `PC`와 `Mobile`에 각각 정의된 상태 및 구성 요소 규격을 적용한다.
    
- status: `MUST`
    
    content: `Resting`, `Resting_disabled`, `Input_disabled`, `Input`, `Typing`, `Error`, `Input_success`, `Typing_success`, `Uneditable` 상태를 기준으로 적용한다.
    
- status: `ALLOW`
    
    content: 입력 목적에 따라 `Label`, `Assistive Text`, `Icon` 등 정의된 선택 요소를 적용할 수 있다.
    
- status: `MUST`
    
    content: 입력 오류와 성공 결과는 `Error`, `Input_success`, `Typing_success` 상태에 정의된 스타일로 표시한다.
    

#### 2.3.2. Type: Multi Line

- status: `MUST`
    
    content: 여러 줄의 텍스트를 입력할 수 있는 박스형 입력 필드로 구성한다.
    
- status: `MUST`
    
    content: `PC`와 `Mobile`에 각각 정의된 상태 및 구성 요소 규격을 적용한다.
    
- status: `MUST`
    
    content: `Resting`, `Resting_disabled`, `Input_disabled`, `Input`, `Typing`, `Error`, `Input_success`, `Typing_success`, `Scroll` 상태를 기준으로 적용한다.
    
- status: `ALLOW`
    
    content: 입력 목적에 따라 `Label`, `Assistive Text`, `Text Counter` 등 정의된 선택 요소를 적용할 수 있다.
    
- status: `MUST`
    
    content: 입력 영역의 Border와 Radius는 각 상태에 정의된 규격을 적용한다.
    
- status: `MUST`
    
    content: 입력 내용이 고정 높이의 입력 영역을 초과하는 경우(3줄 이상) 내부 세로 스크롤을 제공한다.
    

#### 2.3.3. Type: Single Entry

- status: `MUST`
    
    content: `PC`에서만 사용한다.
    
- status: `SHOULD`
    
    content: 필터 패널에서 가격을 입력하거나 조정할 때 사용한다.
    
- status: `MUST`
    
    content: `Resting`, `Hover`, `Typing`, `Disabled`, `Error` 상태를 기준으로 적용한다.
    
- status: `MUST`
    
    content: 입력 영역의 Container와 Border는 각 상태에 정의된 규격을 적용한다.
    
- status: `ALLOW`
    
    content: 입력 오류를 안내하는 경우 정의된 `Assistive Text`를 적용할 수 있다.
    

#### 2.3.4. Type: Single Line(SEC)

- status: `MUST`
    
    content: `Container`와 `Border`로 입력 영역을 구분하는 한총 전용 박스형 입력 필드로 구성한다.
    
- status: `MUST`
    
    content: `Resting`, `Input`, `Typing`, `Uneditable` 상태를 기준으로 적용한다.
    
- status: `ALLOW`
    
    content: 입력 목적에 따라 `Label`, `Required`, `Hint Text`, `Input Text` 등 정의된 요소를 적용할 수 있다.
    
- status: `MUST`
    
    content: Container와 Border의 Radius는 `6px`을 적용한다.
    
- status: `MUST`
    
    content: Border는 `#DDDDDD`, `1px` 규격을 적용한다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. Single Line 구성 요소

- `Input Line` : 입력 영역을 구분하는 하단 선
- `Label` : 입력 항목의 유형과 목적을 안내하는 선택 요소
- `Input Text` : 사용자가 입력하거나 수정하는 텍스트
- `Assistive Text` : 추가 안내와 오류 및 성공 결과를 표시하는 선택 요소
- `Icon` : 입력 목적에 따라 적용하는 선택 요소

#### 2.4.2. Multi Line 구성 요소

- `Label` : 입력 항목의 유형과 목적을 안내하는 선택 요소
- `Input Text` : 여러 줄로 입력하는 텍스트
- `Assistive Text` : 추가 안내와 오류 및 성공 결과를 표시하는 선택 요소
- `Text Counter` : 입력된 텍스트 수를 표시하는 선택 요소
- `Input Line` : 입력 영역의 외곽선과 상태별 스타일을 구성하는 요소

#### 2.4.3. Single Entry 구성 요소

- `Input Text` : 가격 등 입력값을 표시하는 텍스트
- `Assistive Text` : 오류 발생 시 안내 문구를 표시하는 선택 요소
- `Container` : 입력 영역을 구성하는 박스형 컨테이너
- `Border` : 입력 영역의 상태를 구분하는 외곽 테두리

#### 2.4.4. 한총 Single Line(SEC) 구성 요소

- `Label` : 입력 항목의 유형과 목적을 안내하는 요소
- `Required` : 필수 입력 항목을 표시하는 요소
- `Hint Text` : 입력 내용에 대한 추가 안내를 제공하는 요소
- `Input Text` : 사용자가 입력하거나 수정하는 텍스트
- `Container` : 입력 영역을 구성하는 박스형 컨테이너
- `Border` : 입력 영역의 경계를 표시하는 요소

---

### 2.5. 내부 운영 규칙

#### 2.5.1. 한총 전용 타입 구분

- status: `MUST`
    
    content: `Single Line(SEC)`은 가이드에 `Only_SEC`로 표시된 한총 전용 타입으로 구분하여 사용한다.
    
- status: `MUST`
    
    content: 한총 전용 `Single Line(SEC)`은 글로벌 `Single Line`과 별도 규격으로 관리하며, 정의된 구성 요소와 상태를 적용한다.
    

#### 2.5.2. 글로벌과 한총 입력 형태 구분

- status: `MUST`
    
    content: 글로벌 `Single Line`은 하단 `Input Line`을 사용하는 라인형, 한총 전용 `Single Line(SEC)`은 `Container`와 `Border`를 사용하는 박스형으로 구분한다.
    
- status: `AVOID`
    
    content: 두 타입 모두 한 줄 입력을 지원하더라도 형태와 상태 규격을 혼용하거나 동일한 타입으로 적용하지 않는다.
    

#### 2.5.3. 한총 전용 플랫폼 및 상태 적용

- status: `MUST`
    
    content: `Single Line(SEC)`은 PC, MO 공통 규격을 적용한다.
    
- status: `MUST`
    
    content: `Resting`, `Input`, `Typing`, `Uneditable` 상태를 기준으로 적용하며, 글로벌 `Single Line`의 추가 상태를 임의로 확장하여 사용하지 않는다.
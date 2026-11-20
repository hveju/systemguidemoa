# 11_Chip (칩)

DB 등록: 2차
담당자: Daisy
분류: 02. Element
작업: 2026년 11월 18일 오후 4:07
작업상태: 1차 완료
하위 항목: Action Chip (Action%20Chip%203c315929183280888900ca1e465174e4.md), Select Chip (Select%20Chip%203c31592918328046a5f3ea0eee23d10e.md)

# Chip (칩)

## 0. 메타

### 0.1. 분류

- category: Chip
- group: Component

### 0.2. 타입 목록

- Action Chip: 항목 선택 시 관련 동작을 실행하거나 해당 항목과 연관된 콘텐츠를 표시하는 칩
- Select Chip: 여러 항목을 선택하거나 해제하고, 선택 결과에 따라 콘텐츠나 조건을 변경하는 칩

### 0.3. 검색 키워드

- Action Chip: `액션 칩`, `필터 버튼`, `항목 선택`, `단독 액션`
- Select Chip: `선택 칩`, `선택 해제`, `선택된 항목`, `삭제 아이콘`, `다중 선택`

## 1. 개요

### 1.1. 정의

- Chip은 간결한 속성이나 항목을 표시하며, 사용자가 항목을 선택하여 콘텐츠를 필터링하거나 특정 동작을 실행할 수 있도록 하는 UI 컴포넌트입니다.
- 사용 목적과 선택 방식에 따라 Action Chip과 Select Chip으로 구분합니다.

### 1.2. 적용 상황

- Action Chip:
    - 항목 선택 시 관련 동작을 실행하거나 해당 항목과 연관된 콘텐츠를 표시할 때 사용합니다.
    - 간결한 속성이나 항목을 선택하여 콘텐츠를 필터링하거나 특정 동작을 실행할 때 사용합니다.
- Select Chip:
    - 여러 항목을 선택하거나 선택 해제하고, 선택 결과에 따라 콘텐츠나 조건을 변경할 때 사용합니다.
    - 선택된 항목을 표시하고, 사용자가 개별 항목을 직접 삭제하거나 선택 해제할 수 있도록 할 때 사용합니다.

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
    
    content: 칩의 모서리 곡률은 Radius의 Max 토큰을 적용하여 양 끝이 둥근 Pill 형태를 유지합니다.
    
- status: MUST
    
    content: 너비는 Hug Contents를 기본으로 설정하여 레이블 길이에 따라 유동적으로 적용합니다.
    
- status: MUST
    
    content: 칩 레이블은 최대 22자로 제한하고 한 줄로 표시합니다.
    
- status: SHOULD
    
    content: PC와 MO 환경에 맞게 정의된 크기 옵션을 일관되게 적용합니다.
    
- status: SHOULD
    
    content: 칩 레이블은 간결하고 명확하게 작성하며, 쉽게 알아볼 수 있도록 일관된 스타일을 유지합니다.
    
- status: AVOID
    
    content: 양식 제출이나 폼의 핵심 확인 동작을 담당하는 Primary Button 용도로 사용하지 않습니다.
    

### 2.2. 타입 선택 기준

- Action Chip:
    - 단일 항목을 선택하여 관련 동작을 실행하거나 콘텐츠를 표시할 때 사용합니다.
    - 항목의 선택 및 비선택 상태를 전환하여 필터링 등의 기능을 수행할 때 사용합니다.
    - 적용 컴포넌트: `Option Chip`, `Filter`, `Tab`
- Select Chip:
    - 여러 항목을 선택하거나 선택 해제하고, 선택된 항목을 개별적으로 제거할 때 사용합니다.
    - 선택 결과를 태그 형태로 표시하거나, 선택 상태에 따라 콘텐츠나 조건을 변경할 때 사용합니다.
    - 적용 컴포넌트: `Option Chip`, `Selection Control`

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Action Chip

- status: MUST
content: PC 환경에서는 Small, Medium, Large, Extra Large 중 선택하고, MO 환경에서는 Small, Medium 중 선택하여 적용합니다.

#### 2.3.2. Type: Select Chip

- status: MUST
    
    content: 사용자가 선택된 항목을 삭제하거나 선택 해제할 수 있도록 레이블 오른쪽에 삭제 아이콘을 배치합니다.
    
- status: SHOULD
    
    content: 삭제 아이콘을 선택하면 해당 칩이 목록에서 즉시 제거되도록 인터랙션을 제공합니다.
    

### 2.5. 내부 운영 규칙

#### 2.5.1. 칩 간격

- status: SHOULD
content: 칩이 두 줄 이상으로 배치되는 경우, 줄 사이의 세로 간격은 칩 간 가로 간격과 같거나 큰 값을 사용하는 것을 권장합니다.

#### 2.5.2. 칩 패딩

- status: MUST
content: 칩은 사이즈별 정의된 높이를 기준으로 제작하며, 좌우 패딩은 각 사이즈에 맞게 적용합니다.
- status: MUST
content: Small(sm) 사이즈의 좌우 패딩은 각각 12px을 적용합니다.
- status: MUST
content: Medium(md) 사이즈의 좌우 패딩은 각각 16px을 적용합니다.
- status: MUST
content: Large(lg) 사이즈의 좌우 패딩은 각각 20px을 적용합니다.
- status: MUST
content: Extra Large(xlg) 사이즈의 좌우 패딩은 각각 24px을 적용합니다.
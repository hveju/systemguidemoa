# 07_Dimmed & Shadow

DB 등록: 2차
담당자: semi
분류: 01. Foundation
작업: 2026년 11월 18일 오후 1:50
작업상태: 1차 완료
하위 항목: Dimmed (Dimmed%20400159291832800f921cc731764e2bf1.md), Shadow (Shadow%204001592918328020abf7d81e32f9257e.md)

# Dimmed & Shadow (딤드 & 그림자)

## 0. 메타

### 0.1. 분류

- category: `Dimmed & Shadow`
- group: `Foundation`

### 0.2. 타입 목록

- `Dimmed`
- `Shadow`

### 0.3. 검색 키워드

- `Dimmed` : `Dimmed 01`, `Dimmed 02`, `반투명`, `딤`, `딤드`, `오버레이`, `팝업 배경`
- `Shadow` : `Shadow 01`, `Shadow 02`, `그림자`, `입체감`, `깊이감`, `시각적 위계`, `Elevation`

## 1. 개요

### 1.1. 정의

- Dimmed: 팝업·모달 노출 시 배경을 어둡게 처리하는 오버레이 효과입니다. `Black(#000000)`을 기반으로 투명도에 따라 2단계(01/02)로 구분합니다.
- Shadow: UI 요소에 입체감과 시각적 위계를 부여하는 그림자 효과입니다. `Black(#000000)`을 기반으로 투명도 20%를 유지하며, `Offset`·`Blur`·`Spread` 값에 따라 2단계(01/02)로 구분합니다.

### 1.2. 적용 상황

- 팝업·모달 노출 시 배경을 어둡게 처리하여 주요 콘텐츠에 집중하도록 유도할 때 적용합니다.
- 카드·버튼 등 UI 요소에 입체감과 깊이감을 부여하고, 요소 간 시각적 위계를 구분할 때 적용합니다.
- 화면의 목적과 구성에 따라 적절한 효과를 선택하고, 일관된 시각적 표현을 유지할 때 적용합니다.

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
    
    content: `Dimmed`와 `Shadow`는 모두 `Black(#000000)`을 기반으로 정의하며, 다른 색상을 사용하지 않습니다.
    
- status: SHOULD
    
    content: 일관된 시각적 표현을 위해 정의된 `Dimmed`와 `Shadow` 스타일 및 수치를 우선 사용합니다.
    
- status: AVOID
    
    content: 명확한 사용 목적 없이 기존 스타일과 유사한 효과 값을 신규 생성하지 않습니다.
    

### 2.2. 타입 선택 기준

- Dimmed: 팝업·모달 등의 배경을 어둡게 처리하여 주요 콘텐츠에 집중시켜야 하는 경우 사용합니다.
- Shadow: UI 요소에 입체감과 깊이감을 부여하거나, 요소 간 시각적 위계를 구분해야 하는 경우 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Dimmed

- status: MUST
    
    content: 일반적인 팝업·모달에는 투명도 60%의 `Dimmed 01`을 기본값으로 사용합니다.
    
- status: MUST
    
    content: 영상 재생 팝업에는 투명도 90%의 `Dimmed 02`를 사용합니다.
    
- status: MUST
    
    content: 영상 재생 팝업의 닫기(X) 버튼은 팝업 내부가 아닌 바깥쪽 `Dimmed` 영역에 배치합니다.
    
- status: SHOULD
    
    content: 적용 기준이 명확하지 않은 경우, 기본값인 `Dimmed 01`을 우선 사용합니다.
    

#### 2.3.2. Type: Shadow

- status: MUST
    
    content: `Shadow`는 `Shadow 01`, `Shadow 02` 두 단계만 공식 스타일로 정의하며, 임의로 새로운 공식 스타일을 추가하지 않습니다.
    
- status: SHOULD
    
    content: 실제 UI에서는 다양한 `Shadow` 수치가 사용되고 있으나, 모든 값을 별도 규칙으로 정의하지는 않습니다. 기존 스타일과 유사한 경우 `Shadow 01` 또는 `Shadow 02` 중 가까운 값으로 통일하는 것을 우선 검토합니다.
    

### 2.4. 내부 운영 규칙

- status: ALLOW
content: 기존 공식 스타일로 화면에 필요한 위계를 표현하기 어려운 경우, 적용 대상과 사유를 기록하고 해당 화면에서만 Shadow 수치를 조정할 수 있습니다.이때 `Black(#000000)`은 유지하며, `Opacity` · `Offset`·`Blur`·`Spread` 범위에서 조정합니다.
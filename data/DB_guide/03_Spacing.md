# 03_Spacing (여백)

DB 등록: 1차
담당자: Daisy
분류: 01. Foundation
작업: 2026년 11월 19일 오후 2:32
작업상태: 1차 완료
하위 항목: Inset (Inset%2039815929183280409a8ede3d218060f9.md), Gap (Gap%20398159291832807fbe1fd946c7322c0a.md), Grid (Grid%20398159291832807a9f4af34867452d02.md)

# Spacing (간격)

## 0. 메타

### 0.1. 분류

- category: Spacing
- group: Foundation

### 0.2. 타입 종류

- Inset: 컴포넌트 및 요소 내부의 여백 기준
- Gap: 요소와 요소 사이의 간격 기준
- Grid: 그리드 기반 반복 요소의 간격 기준

### 0.3. 검색 키워드

- Inset: 패딩, 내부 여백, 안쪽 여백, 컨테이너 여백
- Gap: 요소 간 간격, 컴포넌트 간격, 섹션 간격, 사이 여백
- Grid: 그리드 간격, 그리드 배치, 행·열 간격, 그리드 거터

---

## 1. 개요

### 1.1. 정의

- Spacing은 UI 요소 내부의 여백과 요소 간 간격을 제어하여 정보의 구조와 시각적 위계를 형성하는 디자인 토큰 시스템입니다.
- 적용 대상과 목적에 따라 Inset, Gap, Grid로 구분하며, 정의된 Spacing Token을 사용하여 일관된 레이아웃을 구성합니다.
- 기본적으로 4px 단위의 스케일을 기준으로 하며, 각 타입에 정의된 간격 값을 적용합니다.

### 1.2. 적용 상황

- 요소 및 컴포넌트 내부의 여백을 설정할 때 적용합니다.
- 연관된 요소 간의 간격을 조정하여 정보의 가독성과 그룹 간 관계를 명확히 할 때 적용합니다.
- 섹션 간 경계를 구분하거나, 섹션 내부에 반복 배치되는 요소의 간격을 균일하게 설정할 때 적용합니다.

---

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
content: 모든 여백과 간격은 정의된 Spacing Token 값을 사용하며, 타입별 적용 기준을 준수합니다.
- status: MUST
content: 기본 간격은 8px 단위의 토큰을 사용하고, 8px 이하의 간격이 별도로 정의된 경우 해당 토큰을 적용합니다.
- status: SHOULD
content: 개별 수치를 직접 입력하기보다 Figma에 정의된 Spacing Token을 사용하여 일관성을 유지합니다.
- status: SHOULD
content: 동일한 위계와 구조를 가진 요소에는 일관된 간격을 적용합니다.
- status: ALLOW
content: 좁은 화면이나 복잡한 영역에서는 정의된 토큰 범위 내에서 한 단계 작은 간격을 일괄 적용할 수 있습니다.
- status: AVOID
content: 정의되지 않은 임의의 간격 값이나 홀수 값을 사용하지 않습니다.
- status: AVOID
content: 원하는 여백을 만들기 위해 서로 다른 토큰 값을 임의로 더하거나 중첩하여 사용하지 않습니다.

### 2.2. Type 선택 규칙

- Inset:
    - 요소, 컴포넌트, 섹션의 외곽 경계와 내부 콘텐츠 사이에 여백을 설정할 때 사용합니다.
    - 버튼, 입력 필드, 카드, 모달 등 컨테이너 내부의 패딩을 설정할 때 사용합니다.
- Gap:
    - 요소와 요소, 컴포넌트와 컴포넌트 또는 섹션과 섹션 사이에 간격을 설정할 때 사용합니다.
    - 텍스트와 아이콘, 버튼 그룹, 칩 그룹 등 여러 요소를 나란히 배치하거나 반복할 때 사용합니다.
- Grid:
    - 섹션 내부에서 그리드 기반으로 반복 배치되는 요소의 간격을 설정할 때 사용합니다.
    - 여러 카드나 모듈을 행과 열로 정렬하고 균일한 간격을 유지할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Inset

- status: MUST
content: 버튼, 카드, 모달, 입력 필드 등 요소와 컴포넌트의 내부 패딩을 설정할 때 사용합니다.
- status: MUST
content: 요소 내부의 콘텐츠와 외곽 경계 사이에 적용하며, 외부 요소 간 간격에는 사용하지 않습니다.
- status: SHOULD
content: 요소와 컴포넌트의 크기 및 위계에 따라 적절한 Inset 스케일을 적용합니다.
- status: ALLOW
content: 필요한 경우 상하좌우의 패딩을 다르게 설정할 수 있지만, 정의된 Spacing Token 내에서 적용합니다.
- status: AVOID
content: 요소 간 외부 간격을 조정하기 위해 Inset을 Margin 용도로 사용하지 않습니다.

#### 2.3.2. Type: Gap

- status: MUST
content: 인접한 요소와 컴포넌트 사이의 가로 또는 세로 간격을 설정할 때 사용합니다.
- status: MUST
content: 텍스트와 아이콘이 결합된 구조에는 정의된 4px 간격을 적용합니다.
- status: MUST
content: 메인 타이틀과 서브 설명 문구가 결합된 구조에는 정의된 4px 간격을 적용합니다.
- status: MUST
content: 가격과 통화 단위, 할인율 등 데이터와 단위가 결합된 구조에는 정의된 간격 스펙을 적용합니다.
- status: SHOULD
content: 요소의 배치 방향과 관계에 따라 적절한 Gap 타입과 간격 값을 선택합니다.
- status: ALLOW
content: 가로와 세로 방향의 간격이 다른 경우 정의된 Spacing Token 내에서 각각 다르게 적용할 수 있습니다.
- status: AVOID
content: 요소와 컴포넌트의 내부 여백을 설정하기 위해 Gap을 사용하지 않습니다.
- status: AVOID
content: 섹션 간 간격에 Element Gap이나 Component Gap을 혼용하지 않고 Section Gap을 사용합니다.

#### 2.3.3. Type: Grid

- status: MUST
content: 섹션 내부에서 여러 요소를 그리드 형태로 반복 배치할 때 사용합니다.
- status: SHOULD
content: 카드, 모듈 등 동일한 구조의 반복 요소에는 일정한 간격을 적용하여 정렬과 시각적 일관성을 유지합니다.
- status: SHOULD
content: 그리드의 행과 열 사이에는 레이아웃 구조에 적합한 Spacing Token을 적용합니다.
- status: ALLOW
content: 레이아웃 구성에 따라 가로와 세로 방향의 Grid 간격을 다르게 적용할 수 있습니다.
- status: AVOID
content: 단일 요소 간 간격이나 컴포넌트 내부 패딩을 설정하기 위해 Grid를 사용하지 않습니다.
- status: AVOID
content: 그리드 구조와 관계없는 개별 요소나 단순 나열 구조에 Grid를 혼용하지 않습니다.

### 2.5. 내부 운영 규칙

#### 2.5.1. 화면 좌우 여백

- status: MUSTcontent: PC 1440px 화면에서는 좌우 24px의 여백을 제외한 1392px을 콘텐츠 작업영역으로 사용합니다.
- status: MUSTcontent: 모바일 및 Fold 환경에서는 화면 좌우에 각각 24px의 여백을 적용합니다.

#### 2.5.2. 섹션 간격

- status: SHOULDcontent: PC 환경에서 섹션 간 세로 간격은 100~160px 사용을 권장합니다.
- status: SHOULDcontent: 모바일 및 Fold 환경에서 섹션 간 세로 간격은 60~100px 사용을 권장합니다.

#### 2.5.3. 타이틀 및 디스클레이머 간격

- status: SHOULDcontent: 타이틀과 디스클레이머 사이에는 고정된 간격이 정의되어 있지 않으며, Element Gap 기준으로 주변 컴포넌트 간격보다 좁게 적용하는 것을 권장합니다.
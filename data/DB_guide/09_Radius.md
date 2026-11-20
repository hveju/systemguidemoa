# 09_Radius (라운드)

DB 등록: 2차
담당자: Daisy
분류: 01. Foundation
작업: 2026년 11월 18일 오후 4:05
작업상태: 1차 완료
하위 항목: 4px (4px%203ba1592918328097b57df0bac6575a38.md), 6px (6px%203ba15929183280c59f7ff6b2a6e8cf37.md), 8px (8px%203ba1592918328043a4e4f981b4bddafc.md), 20px (20px%203ff1592918328080bceed6fc882c09e3.md), 24px (24px%203ff15929183280178c94dcb8f0745947.md), Max (Max%203ba15929183280c390cbec83a305bf22.md), None (None%203ff1592918328019867eee43152b0526.md)

# Radius (라운드)

## 0. 메타

### 0.1. 분류

- category: Radius
- group: Foundation

### 0.2. 타입 목록

- 4px: 배지, 체크박스 등 작은 UI 요소의 모서리 곡률
- 6px: 버튼, 툴팁 등 중간 크기 컨트롤의 모서리 곡률
- 8px: 드롭다운 등 비교적 큰 컴포넌트의 모서리 곡률
- 20px: 카드, 배너, 이미지 등 콘텐츠 컨테이너의 모서리 곡률
- 24px: 팝업 등 여러 UI 요소로 구성된 복합 컴포넌트의 모서리 곡률
- Max: 높이에 따라 양 끝이 둥근 형태를 유지하는 최대 곡률
- None: 모서리 곡률을 적용하지 않는 직각 형태

### 0.3. 검색 키워드

- 4px: `작은 UI`, `배지`, `체크박스`, `소형 컨트롤`
- 6px: `툴팁`, `텍스트 필드`, `스낵바`
- 8px: `드롭다운`, `옵션 셀렉터`, `그룹화 버튼`
- 20px: `카드 라운드`, `배너 모서리`, `이미지 라운드`
- 24px: `팝업 라운드`, `PC 팝업`, `복합 컨테이너`
- Max: `완전 라운드`, `알약 형태`, `CTA 버튼`
- None: `라운드 없음`, `직각 모서리`, `전체 화면 팝업`

## 1. 개요

### 1.1. 정의

- Radius는 UI 요소의 모서리 곡률을 제어하여 컴포넌트의 목적, 크기 및 시각적 위계를 구분하는 디자인 토큰 시스템입니다.
- 작은 컨트롤부터 콘텐츠 컨테이너, 팝업 등 다양한 UI 요소에 일관된 곡률을 적용하여 화면의 시각적 통일성을 유지합니다.
- 정의된 Radius Token을 기준으로 모서리 곡률을 설정하며, 완전한 라운드 형태와 곡률이 없는 형태도 포함합니다.

### 1.2. 적용 상황

- 요소와 컴포넌트의 크기 및 역할에 따라 적절한 모서리 곡률을 설정할 때 적용합니다.
- 컨트롤, 콘텐츠 컨테이너, 오버레이 등 UI 요소의 성격과 시각적 위계를 구분할 때 적용합니다.
- 동일한 역할의 컴포넌트에 일관된 곡률을 적용하여 화면의 통일성을 유지할 때 적용합니다.

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
content: 모서리 곡률에 임의의 수치를 직접 입력하지 않고, 정의된 Radius Token을 적용합니다.
- status: SHOULD
content: 컴포넌트의 크기와 시각적 위계를 고려하여 적절한 Radius 타입을 선택합니다. 일반적으로 작은 컨트롤보다 큰 콘텐츠 컨테이너나 팝업에 더 큰 곡률을 적용합니다.
- status: SHOULD
content: 부모 컨테이너 안에 자식 요소가 중첩되는 경우, 자식 요소의 Radius를 부모 요소보다 작거나 같게 설정하여 시각적 균형을 유지합니다.
- status: AVOID
content: 동일한 역할과 위계를 가진 컴포넌트에 서로 다른 Radius 타입을 혼용하지 않습니다.

### 2.2. 타입 선택 기준

- 4px:
    - 배지, 체크박스, 옵션 칩 등 크기가 작은 UI 요소에 사용합니다.
    - 적용 컴포넌트: `Badge(Filled)`, `Option Chip(Label)`, `Option Selector(Label)`, `Selection Control(CheckBox)`, `Spec(Highlight/Mobile)`
- 6px:
    - 버튼, 툴팁, 텍스트 필드 등 중간 크기의 컨트롤과 피드백 요소에 사용합니다.
    - 적용 컴포넌트: `Snackbar`, `Text Field(MultiLine)`, `Tooltip(Marked)`, `Tooltip(Multiple Language)`, `Option Selector(Image/Standard)`, `Option Selector(Image/Bezel)`
- 8px:
    - 드롭다운 메뉴, 옵션 셀렉터 등 비교적 큰 컴포넌트나 그룹화된 컨트롤에 사용합니다.
    - 적용 컴포넌트: `Menu(Dropdown)`, `Option Selector`
- 20px:
    - 카드, 배너, 이미지 등 콘텐츠를 포함하는 중간 크기의 컨테이너에 사용합니다.
    - 적용 컴포넌트: `Card`, `Banner`, `Image`
- 24px:
    - 여러 UI 요소로 구성된 PC 팝업 등 복합 컴포넌트에 사용합니다.
    - 적용 컴포넌트: `Popup(PC)`
- Max:
    - CTA 버튼, 인디케이터 등 높이를 기준으로 양 끝이 완전히 둥근 형태를 유지해야 하는 요소에 사용합니다.
    - 적용 컴포넌트: `Button(CTA)`, `Indicator`, `Number Counter`, `Scroll`, `Search Field`
- None:
    - 리스트, 전체 화면 팝업 등 모서리 곡률 없이 화면 너비를 가득 채우는 컨테이너에 사용합니다.
    - 적용 컴포넌트: `List`, `Popup(Full Screen)`

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: 4px

- status: SHOULD
content: Badge - Filled, Option Chip - Label, Option Selector - Label, Selection Control - Check Box 등 작은 UI 요소에 적용합니다.

#### 2.3.2. Type: 6px

- status: SHOULD
content: Snackbar, Text Field, Tooltip 등 중간 크기의 컨트롤과 피드백 요소에 적용합니다.
- status: SHOULD
content: 이미지형 Option Selector 및 여러 언어를 지원하는 Tooltip 등에도 컴포넌트 규격에 따라 적용합니다.

#### 2.3.3. Type: 8px

- status: SHOULD
content: Menu - Dropdown, Option Selector 등 비교적 큰 컨트롤이나 그룹화된 요소에 적용합니다.

#### 2.3.4. Type: 20px

- status: SHOULD
content: Card, Banner, Image 등 콘텐츠를 담는 컨테이너의 외곽 모서리에 적용합니다.

#### 2.3.5. Type: 24px

- status: SHOULD
content: PC 환경에서 여러 UI 요소로 구성된 Popup 등 복합 컴포넌트의 외곽 모서리에 적용합니다.

#### 2.3.6. Type: Max

- status: MUST
content: 요소의 양 끝이 완전히 둥근 알약 형태를 유지하도록 Max Radius Token을 적용합니다.
- status: ALLOW
content: 컴포넌트 규격에 따라 높이의 50%에 해당하는 곡률 값을 적용할 수 있습니다.
- status: SHOULD
content: Button - CTA, Indicator, Number Counter, Scroll, Search Field 등 완전한 라운드 형태가 필요한 요소에 적용합니다.

#### 2.3.7. Type: None

- status: MUST
content: 모서리 곡률을 적용하지 않고 0px로 설정합니다.
- status: SHOULD
content: List, Popup - Full Screen 등 화면 너비를 가득 채우는 컨테이너에 적용합니다.

### 2.5. 내부 운영 규칙

- status: ALLOW
content: 12px과 16px은 공식 Radius 타입에는 포함되지 않지만, 8px과 20px 사이의 중간 곡률이 필요한 경우 정의된 토큰을 사용할 수 있습니다.
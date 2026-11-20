# 19_List

DB 등록: 3차
담당자: Joy
분류: 03. Component
작업: 2026년 10월 28일 오후 7:12
작업상태: 1차 완료

## **0. 메타**

### **0.1. 분류**

- category: List
- group: Element

### **0.2. 타입 종류**

- Header: 하위 항목 그룹을 대표하며, 클릭이나 탭으로 리스트를 펼치거나 접는 제목 영역
- Item / Default: Header 아래의 하위 항목으로, 각 항목을 대표하는 제목 영역
- Item / Indent: 단일 선택이 필요한 항목을 나열하는 들여쓰기 항목
- Item / Selection: 여러 항목을 보면서 복수 선택할 수 있는 선택형 항목

### **0.3. 검색 키워드**

- Header: 리스트 헤더, 아코디언, 펼치기 접기, 그룹 제목, 카테고리 제목
- Item / Default: 리스트 아이템, 하위 항목, 목록 항목
- Item / Indent: 들여쓰기 항목, 단일 선택 목록, 하위 목록
- Item / Selection: 체크박스 리스트, 다중 선택 목록, 선택 리스트, 필터 목록

---

## **1. 개요**

### **1.1. 정의**

- List는 여러 콘텐츠 항목을 구조적이고 일관된 규칙에 따라 배열하여, 사용자가 쉽게 비교하고 선택할 수 있게 하는 컴포넌트입니다.
- 그룹을 대표하는 Header와 그 아래의 Item(Default, Indent, Selection)으로 구성합니다.
- 구조화된 정보를 사용자가 빠르게 훑어보고 이해하도록 돕습니다.

### **1.2. 적용 상황**

- 여러 항목을 카테고리별로 묶어 비교하고 선택하게 할 때 적용합니다.
- 항목이 많아 일부 카테고리를 접어서 보여줘야 할 때 적용합니다.
- 여러 항목 중 하나 또는 여러 개를 선택해야 할 때 적용합니다.

---

## **2. 사용 규칙**

### **2.1. 공통 규칙**

- status: MUST content: 기본적으로 상위 세 개의 카테고리만 펼치고, 나머지 카테고리는 접어 둡니다.
- status: MUST content: 관련 항목은 계층에 따라 그룹으로 묶고, 구분선과 간격으로 그룹을 명확히 구분합니다.
- status: SHOULD content: 선택할 수 없는 항목은 Disabled 상태로 표시합니다.
- status: AVOID content: 모든 카테고리를 기본으로 펼쳐 두지 않습니다.
- status: AVOID content: 구분선이나 간격 없이 서로 다른 그룹의 항목을 이어 붙이지 않습니다.

### **2.2. Type 선택 규칙**

- Header:
    - 하위 항목을 묶는 그룹의 제목이 필요할 때 사용합니다.
    - 클릭이나 탭으로 리스트를 펼치거나 접어야 할 때 사용합니다.
- Item / Default:
    - Header 아래에서 각 항목의 제목 영역을 표시할 때 사용합니다.
- Item / Indent:
    - 여러 항목 중 하나만 선택해야 하는 목록에 사용합니다.
- Item / Selection:
    - 여러 항목을 보면서 복수 선택해야 하는 목록에 사용합니다.

### **2.3. 타입별 사용 규칙**

#### **2.3.1. Type: Header**

- status: MUST content: 하위 항목 그룹을 대표하는 제목 영역으로 사용하며, 클릭이나 탭으로 펼침(Expanded)과 접힘(Collapsed)을 전환합니다.
- status: MUST content: 기본적으로 상위 세 개의 Header만 펼치고 나머지는 접어 둡니다.
- status: SHOULD content: Header 사이에는 구분선을 두어 그룹 간 경계를 구분합니다.
- status: SHOULD content: Header 라벨은 대문자로 표기합니다. [확인 필요: GUI 예시는 대문자이나 PDF에 규칙으로 명시되어 있지 않음]

#### **2.3.2. Type: Item / Default**

- status: MUST content: Header 아래의 하위 항목으로, 각 항목을 대표하는 제목 영역에 사용합니다.
- status: SHOULD content: 선택된 항목은 Selected 상태로 표시하여 다른 항목과 구분합니다.
- status: ALLOW content: 하위 항목이 있는 경우 펼침과 접힘을 적용하고, 아이콘으로 상태를 표시할 수 있습니다.

#### **2.3.3. Type: Item / Indent**

- status: MUST content: 여러 항목 중 하나만 선택해야 하는 항목을 나열할 때 사용합니다.
- status: SHOULD content: 선택된 항목은 Selected 상태로 표시하여 다른 항목과 구분합니다.
- status: AVOID content: 여러 항목을 동시에 선택해야 하는 경우에는 Item / Indent를 사용하지 않고 Item / Selection을 사용합니다.

#### **2.3.4. Type: Item / Selection**

- status: MUST content: 여러 항목을 보면서 복수 선택해야 할 때 사용합니다.
- status: MUST content: 선택 컨트롤(Check Box)과 라벨을 함께 배치하며, 선택 동작은 Selection Control의 Check Box 규칙을 따릅니다.
- status: ALLOW content: 라벨 옆에 괄호 숫자(Count Text)를 함께 표시할 수 있습니다. [확인 필요: 숫자가 나타내는 의미가 PDF에 정의되어 있지 않음]
- status: AVOID content: 하나만 선택해야 하는 경우에는 Item / Selection을 사용하지 않고 Item / Indent를 사용합니다.
# 13_Indicator (인디케이터)

DB 등록: 2차
담당자: Joy
분류: 02. Element
작업: 2026년 11월 18일 오후 1:36
작업상태: 1차 완료
하위 항목: Dot (Dot%2038a1592918328066b886c7cde382f735.md), Arrow (Arrow%2038a15929183280bd89fdf438401c7383.md), Number (Number%2038a159291832804c8c62e7e31ea62352.md), Scroll Indicator (Scroll%20Indicator%2038a15929183280d2b13fc594f89aabb2.md), Bar (Bar%2038a1592918328049bacef35539590d6f.md)

# **Indicator (인디케이터)**

## **0. 메타**

### **0.1. 분류**

- category: Indicator
- group: Element

### **0.2. 타입 종류**

- Dot: 카드형 콘텐츠의 범위와 현재 위치를 점으로 표시하는 인디케이터
- Arrow: 이전 또는 다음 콘텐츠로 이동하는 화살표 인디케이터
- Number: 현재 위치와 전체 개수를 숫자로 표시하는 인디케이터
- Scroll: 보이는 영역 밖의 콘텐츠를 가로로 탐색하는 스크롤 인디케이터
- Bar: 재생 시간이 있는 미디어 콘텐츠의 위치와 진행 상황을 막대로 표시하는 인디케이터

### **0.3. 검색 키워드**

- Dot: 닷 인디케이터, 점 인디케이터, 페이지네이션, 캐러셀 인디케이터, 슬라이드 위치
- Arrow: 화살표 인디케이터, 이전 다음 버튼, 좌우 화살표, 캐러셀 화살표
- Number: 숫자 인디케이터, 페이지 번호, 현재 위치 숫자, 1/5 표시
- Scroll: 스크롤 인디케이터, 스크롤바, 가로 스크롤, 스크롤 위치
- Bar: 바 인디케이터, 영상 진행바, 재생 진행 표시, 미디어 진행 막대

---

## **1. 개요**

### **1.1. 정의**

- Indicator는 탐색 가능한 콘텐츠의 범위와 현재 항목의 위치를 표시하고, 콘텐츠 간 이동을 돕는 컴포넌트입니다.
- 시각적 단서로 콘텐츠의 흐름을 보여주며, 콘텐츠 구조와 화면 크기에 따라 Dot, Arrow, Number, Scroll, Bar로 구분합니다.

### **1.2. 적용 상황**

- 캐러셀처럼 카드 단위로 나뉜 콘텐츠의 범위와 현재 위치를 보여줄 때 적용합니다.
- 가로로 이어지는 연속 스크롤 콘텐츠를 탐색하게 할 때 적용합니다.
- 영상처럼 재생 시간이 있는 콘텐츠의 위치와 진행 상황을 보여줄 때 적용합니다.
- 이전 또는 다음 콘텐츠로 이동하는 컨트롤을 제공할 때 적용합니다.

---

## **2. 사용 규칙**

### **2.1. 공통 규칙**

- status: MUST
content: 인디케이터는 기본적으로 콘텐츠 영역의 하단 중앙에 배치합니다. 타입별 배치 기준이 정의된 경우 해당 기준을 따릅니다.
- status: MUST
content: 인디케이터는 콘텐츠의 가독성과 다른 요소의 조작을 방해하지 않는 위치에 배치합니다.
- status: SHOULD
content: 화면 폭과 레이아웃에 맞는 인디케이터 타입을 선택합니다.
- status: SHOULD
content: 화면 밖에 추가 콘텐츠가 있는 경우, 다음 항목의 일부 노출, 스크롤 위치 표시, 이전·다음 화살표 등으로 더 탐색할 수 있음을 안내합니다.
- status: MUST
content: 서비스에서 스와이프나 드래그를 통한 탐색을 자체 구현한 경우, 이전·다음 버튼 등 탭이나 클릭으로도 같은 탐색을 할 수 있도록 합니다.
- status: MUST
content: 이전·다음 화살표는 키보드로 조작할 수 있어야 하며, 스크린 리더에서 각 버튼의 역할을 알 수 있도록 `이전 콘텐츠`, `다음 콘텐츠`와 같은 이름을 제공합니다.
- status: SHOULD
content: 모바일 캐러셀에 화살표를 제공하는 경우, 각 버튼의 터치 영역을 충분히 확보합니다. 버튼의 터치 영역을 시각적 크기보다 넓게 설정할 수 있습니다.
- status: MUST
content: 화살표의 터치 영역을 확장하는 경우, 각 화살표 버튼이 스크린 리더에서 하나의 조작 요소로 인식되도록 합니다.

### **2.2. Type 선택 규칙**

- Dot:
    - 캐러셀처럼 카드 단위로 나뉜 콘텐츠에 사용합니다.
    - 좁은 화면에서 Bar를 대신해 사용합니다.
- Arrow:
    - 이전 또는 다음 콘텐츠로 넘기는 컨트롤이 필요할 때 사용합니다.
- Number:
    - 현재 위치와 전체 개수를 숫자로 명확히 보여줘야 할 때 사용합니다.
    - 콘텐츠 개수가 많아 점으로 보여주기 어려울 때 사용합니다. [확인 필요: Dot과 Number의 선택 기준이 PDF에 없음]
- Scroll:
    - 가로로 이어지는 연속 스크롤 콘텐츠에 사용합니다.
- Bar:
    - 여러 배너를 넘겨 보는 영역에서 현재 배너의 위치를 막대로 표시하거나, 재생 시간이 있는 콘텐츠의 진행 상태를 보여줄 때 사용합니다.

### **2.3. 타입별 사용 규칙**

#### **2.3.1. Type: Dot**

- status: MUST
content: 캐러셀처럼 카드 단위로 나뉜 콘텐츠에 사용합니다.
- status: MUST
content: 기본형은 최대 7개까지, Play/Pause 컨트롤 없이 사용합니다.
- status: SHOULD
content: 콘텐츠가 7개를 넘으면 끝쪽 점이 작아지는 More than 7 타입을 사용합니다.
- status: SHOULD
content: 자동 재생 콘텐츠에는 Play/Pause 아이콘이 붙은 타입을 사용합니다.
- status: SHOULD
content: 좁은 화면(Mobile)에서는 Bar 대신 Play/Pause가 붙은 Dot을 사용합니다.
- status: AVOID
content: Medium, Small 크기의 점은 More than 7 타입 외에는 사용하지 않습니다.

#### 2.3.2. Type: Arrow

- status: MUST
    
    content: `Arrow`는 현재 콘텐츠에서 이전 또는 다음 콘텐츠로 이동할 때 사용합니다.
    
- status: MUST
    
    content: 첫 항목에서는 다음 방향만, 중간 항목에서는 양쪽 방향 모두, 마지막 항목에서는 이전 방향만 조작할 수 있도록 합니다.
    
- status: ALLOW
    
    content: 모바일에서 화살표를 콘텐츠 위에 배치하는 경우, 이전 버튼은 콘텐츠 왼쪽에, 다음 버튼은 오른쪽에 배치할 수 있습니다. 텍스트와 다른 조작 요소를 가리지 않도록 배치합니다.
    
- status: MUST
    
    content: 모바일 캐러셀에서 화살표의 터치 영역을 확장하는 경우, 콘텐츠 좌우 가장자리 안쪽에 충분한 조작 영역을 확보합니다. 확장된 터치 영역은 기본 화면에서 투명하게 처리합니다.
    
- status: MUST
    
    content: 화살표 아이콘과 확장된 터치 영역은 방향별로 하나의 버튼으로 구현합니다. 키보드로 버튼에 포커스를 이동해 조작할 수 있도록 하며, 스크린 리더에서는 각 버튼이 `이전 콘텐츠` 또는 `다음 콘텐츠`로 한 번만 인식되도록 합니다.
    

#### **2.3.3. Type: Number**

- status: MUST
content: 현재 위치와 전체 개수를 "현재 / 전체"(예: 1 / 5) 형식으로 표시합니다.
- status: SHOULD
content: 현재 숫자는 진하게, 전체 숫자는 연하게 표시하여 구분합니다.
- status: SHOULD
content: PC와 Mobile에 각각 정의된 크기를 적용합니다.
- status: AVOID
content: 99개를 넘는 콘텐츠의 위치 표시에는 사용하지 않습니다.

#### **2.3.4. Type: Scroll**

- status: MUST
content: 가로로 이어지는 연속 스크롤 콘텐츠에 사용합니다.
- status: MUST
content: 막대가 스크롤 위치를 따라 늘어나며 Default, Scrolled, End 상태를 표시합니다.
- status: SHOULD
content: PC에서는 오른쪽에 이전·다음 화살표를 함께 두고, Mobile에서는 화살표 없이 막대만 사용합니다.
- status: SHOULD
content: 처음에는 이전 화살표를, 끝에서는 다음 화살표를 비활성화합니다.
- status: ALLOW
content: Mobile에서 콘텐츠 위에 이전·다음 화살표를 제공하는 경우, 스크롤 위치를 표시하는 막대를 생략할 수 있습니다.
- status: AVOID
content: 카드 단위로 나뉜 콘텐츠에는 Scroll을 사용하지 않고 Dot을 사용합니다.

#### 2.3.5. Type: Bar

- Variant: `Standard A`, `Standard B`

**Standard A**

- status: MUST
content: `Standard A`는 PC에서만 사용합니다.
- status: MUST
content: 재생 시간이 있는 미디어 콘텐츠의 위치와 진행 상황을 보여줄 때 사용합니다.
- status: ALLOW
content: 아이템 라벨을 사용할 수 있습니다. 라벨을 사용하는 경우, 해당 아이템에 `Hover`하면 막대 위에 표시합니다.
- status: MUST
content: 라벨은 15자 이내로 작성합니다.
- status: MUST
content: 아이템은 최소 1개에서 최대 7개까지 사용합니다.

**Standard B**

- status: MUST
content: PC와 Mobile에서 각각 정의된 `Standard B` 규격을 적용합니다. 각 아이템은 라벨 없이 막대로 표시합니다.
    
    

### 2.5. 내부 운영 규칙

- status: SHOULD
content: 여러 카드를 한 장씩 넘겨 보는 카드형 콘텐츠 영역에는 `Dot`을 사용하여 현재 위치를 표시합니다.
- status: SHOULD
content: 페이지 중간에 배치된 작은 띠 배너가 여러 장으로 구성된 경우, `Number`를 사용하여 현재 순서와 전체 개수를 표시합니다.
- status: SHOULD
content: PC 페이지 최상단의 `KV` 배너에는 `Bar`의 `Standard A`를 우선 사용합니다.
- status: SHOULD
content: `PD` 페이지의 슬라이드 배너에는 PC와 Mobile에 각각 정의된 `Bar`의 `Standard B` 규격을 우선 적용합니다.
- status: ALLOW
content: Mobile의 연속 가로 스크롤 영역에서 콘텐츠 위에 이전·다음 화살표를 제공하는 경우, `Scroll`의 위치 표시 막대를 생략할 수 있습니다. 화살표는 콘텐츠의 가독성과 다른 요소의 조작을 방해하지 않는 위치에 배치합니다.
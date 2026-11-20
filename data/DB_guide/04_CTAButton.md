# 04_CTA Button (액션 버튼)

DB 등록: 1차
담당자: Joy
분류: 02. Element
작업: 2026년 11월 19일 오후 2:22
작업상태: 1차 완료
하위 항목: Primary Action Button (Primary%20Action%20Button%20398159291832807b835af36f91ac6531.md), Secondary Action Button (Secondary%20Action%20Button%203981592918328061ad30cd34bcb6ff79.md), Tertiary Action Button (Tertiary%20Action%20Button%203981592918328044bd34e7eef49b65dd.md)

## **0. 메타**

### **0.1. 분류**

- category: CTA Button
- group: Element

### **0.2. 타입 종류**

- Filled / Primary: 우선순위가 높은 주요 액션에 사용하는 강조 버튼
- Filled / Emphasis: 즉각적인 주목이 필요한 최우선 액션에 사용하는 최고 강조 버튼
- Outlined: 중간 수준의 강조가 필요한 보조 액션에 사용하는 테두리 버튼
- Underlined: 강조를 최소화한 3순위 액션에 사용하는 밑줄 버튼
- Label: 시각적 강조 없이 부가적인 3순위 액션에 사용하는 텍스트 버튼

### **0.3. 검색 키워드**

- Filled / Primary: 프라이머리 버튼, 주요 버튼, 메인 CTA, 채움 버튼, 검정 버튼
- Filled / Emphasis: 강조 버튼, 엠퍼시스 버튼, 최우선 CTA, 파란 버튼
- Outlined: 아웃라인 버튼, 테두리 버튼, 세컨더리 버튼, 보조 버튼
- Underlined: 밑줄 버튼, 언더라인 버튼, 터셔리 버튼, 텍스트 링크
- Label: 라벨 버튼, 텍스트 버튼, 부가 액션, 아이콘 텍스트 버튼

---

## **1. 개요**

### **1.1. 정의**

- CTA Button(Call to Action)은 특정 액션을 실행하도록 돕고, 사용자를 다른 페이지로 안내하는 버튼 컴포넌트입니다.
- 액션의 역할과 중요도에 따라 Primary, Secondary, Tertiary, Emphasis의 4단계 위계로 구분하고, 위계에 맞는 타입을 적용합니다.
- 맥락에 맞는 라벨과 아이콘을 사용하여 버튼을 눌렀을 때의 결과를 예측할 수 있게 합니다.

### **1.2. 적용 상황**

- 구매 페이지 이동, 장바구니 담기 등 사용자가 실행해야 할 액션을 제공할 때 적용합니다.
- 추가 정보 확인, 전체 목록 보기 등 다른 페이지나 팝업으로 이동하도록 안내할 때 적용합니다.
- 여러 액션을 함께 제공하면서 액션 간 우선순위를 시각적으로 구분해야 할 때 적용합니다.
- 페이지 이동 없이 같은 페이지에서 콘텐츠를 더 펼쳐 보여줄 때 적용합니다.

---

## **2. 사용 규칙**

### **2.1. 공통 규칙**

- status: MUST content: 액션의 역할과 중요도에 따라 Primary, Secondary, Tertiary, Emphasis 위계를 정하고, 위계에 맞는 타입을 사용합니다.
- status: MUST content: 맥락에 맞는 라벨과 아이콘을 사용하여 버튼을 눌렀을 때의 결과를 예측할 수 있게 합니다.
- status: MUST content: 같은 액션에는 화면 전체에서 같은 라벨을 사용합니다.
- status: MUST content: 라벨은 동사로 시작하고 첫 단어를 대문자로 시작하며, 26자 이내로 작성합니다.
- status: MUST content: 여러 CTA를 함께 배치할 때 PC는 가로로 배치하고 우선순위가 높은 CTA를 오른쪽에 두며, Mobile은 세로로 배치하고 우선순위가 높은 CTA를 위에 둡니다.
- status: SHOULD content: 여러 CTA를 함께 사용할 때는 정의된 위계 조합(Secondary + Primary, Tertiary + Primary, Tertiary + Secondary)으로 우선순위를 시각적으로 드러냅니다.
- status: SHOULD content: 배경색에 따라 Light BG 버전과 Dark BG 버전을 구분하여 사용합니다.
- status: SHOULD content: 최대 너비 (max-width)는 모바일은 Fill로 사용하고, 태블릿/데스크톱은 팝업사이즈나 컨텐츠 폼 너비에 Fill로 맞추거나, 312px~480px 사이의 4의 배수로 컨텐츠 메인 영역을 침범하지 않도록 지정합니다.
- status: SHOULD content: 아이콘이랑 레이블 사이 간격은은 4px 또는 8px으로 적용합니다.
- status: AVOID content: 동일한 액션에 화면마다 다른 라벨을 사용하지 않습니다.
- status: AVOID content: 정의된 용도와 다른 목적으로 상위 위계의 버튼을 사용하지 않습니다.

### **2.2. Type 선택 규칙**

- Filled / Primary:
    - 페이지에서 우선순위가 가장 높은 주요 액션(Primary)에 사용합니다.
    - Secondary 또는 Tertiary 버튼과 함께 쓸 때 가장 중요한 액션에 사용합니다.
- Filled / Emphasis:
    - 즉각적인 주목이 필요한 최우선 액션을 강하게 강조해야 할 때만 사용합니다.
    - 일반적인 주요 액션에는 Emphasis가 아닌 Filled / Primary를 사용합니다.
- Outlined:
    - 중간 수준의 강조가 필요한 보조 액션(Secondary)에 사용합니다.
    - Primary와 함께 의사결정이나 주요·보조 액션을 묶어 제공할 때 사용합니다.
- Underlined:
    - 강조를 최소화한 3순위 액션(Tertiary)에 사용합니다.
    - Primary 또는 Secondary와 함께 낮은 우선순위의 선택지를 제공할 때 사용합니다.
- Label:
    - 시각적 강조 없이 부가적으로 제공하는 3순위 액션(Tertiary)에 사용합니다.
    - 버튼 형태 없이 텍스트(또는 텍스트와 아이콘)만으로 액션을 제공할 때 사용합니다.

### **2.3. 타입별 사용 규칙**

#### **2.3.1. Type: Filled / Primary**

- status: MUST content: 페이지에서 우선순위가 가장 높은 주요 액션에 사용합니다.
- status: MUST content: 여러 CTA와 함께 배치할 때는 PC에서 가장 오른쪽, Mobile에서 가장 위에 둡니다.
- status: SHOULD content: Outlined(Secondary) 또는 Underlined(Tertiary) 버튼과 조합하여 액션 간 우선순위를 드러냅니다.
- status: ALLOW content: 배치 영역에 따라 Default 또는 Small 크기를 사용할 수 있습니다.
- status: ALLOW content: 필요한 경우 라벨 뒤에 아이콘을 붙인 Icon_trailing 형태를 사용할 수 있습니다.
- status: AVOID content: 하나의 CTA 그룹 안에 Primary 버튼을 여러 개 두지 않습니다. [확인 필요: PDF에 명시된 규칙 없음]

#### **2.3.2. Type: Filled / Emphasis**

- status: MUST content: 즉각적인 주목이 필요한 최우선 액션을 강조할 때만 사용합니다.
- status: SHOULD content: 최우선 액션을 강하게 강조해야 할 때는 화면의 오른쪽 상단에 배치합니다.
- status: ALLOW content: 최우선 액션을 콘텐츠 섹션 안에 배치해야 하는 경우에는 섹션 안에 Emphasis 버튼을 둘 수 있습니다.
- status: ALLOW content: 배치 영역에 따라 Default 또는 Small 크기를 사용하고, 필요한 경우 Icon_trailing 형태를 사용할 수 있습니다.
- status: AVOID content: 한 페이지에 Emphasis 버튼을 여러 개 사용하지 않습니다. 단, 최우선 액션을 콘텐츠 섹션 안에 배치해야 하는 경우는 예외입니다.
- status: AVOID content: 리뷰 페이지 이동처럼 최우선 액션이 아닌 용도에 Emphasis 버튼을 사용하지 않습니다.

#### **2.3.3. Type: Outlined**

- status: MUST content: 중간 수준의 강조가 필요한 보조 액션(Secondary)에 사용합니다.
- status: SHOULD content: Primary와 함께 쓸 때는 Outlined + Filled / Primary 조합으로 의사결정이나 주요·보조 액션을 함께 제공합니다.
- status: SHOULD content: 우선순위가 낮은 선택지를 제공하거나 액션 위계를 낮출 때는 Underlined 버튼과 조합합니다.
- status: ALLOW content: 배치 영역에 따라 Default 또는 Small 크기를 사용할 수 있습니다.
- status: ALLOW content: 맥락에 따라 라벨 앞뒤에 아이콘을 붙인 Icon_leading 또는 Icon_trailing 형태를 사용할 수 있습니다.

#### **2.3.4. Type: Underlined**

- status: MUST content: 강조를 최소화한 3순위 액션(Tertiary)에 사용합니다.
- status: SHOULD content: Primary와 함께 쓸 때는 콘텐츠에 따라 두 가지 선택지를 제공하는 용도로 사용합니다.
- status: SHOULD content: Outlined와 함께 쓸 때는 우선순위가 낮은 선택지를 제공하거나 액션 위계를 낮추는 용도로 사용합니다.
- status: ALLOW content: 배치 영역에 따라 Default 또는 Large 크기를 사용할 수 있으며, Mobile에서는 Small 크기를 사용할 수 있습니다.
- status: ALLOW content: MKT PD에서는 같은 페이지 안의 다른 섹션으로 이동하는 용도로 사용할 수 있습니다.

#### **2.3.5. Type: Label**

- status: MUST content: 시각적 강조 없이 부가적으로 제공하는 3순위 액션(Tertiary)에 사용합니다.
- status: ALLOW content: 맥락에 따라 라벨 앞뒤에 아이콘을 붙인 Icon_leading 또는 Icon_trailing 형태를 사용할 수 있습니다.
- status: AVOID content: 페이지의 주요 액션이나 강조가 필요한 액션에 Label 버튼을 사용하지 않습니다.

### **2.4. 세부 적용 규칙**

#### **2.4.1. CTA 조합 규칙**

- Secondary + Primary (Outlined + Filled / Primary): 의사결정이나 주요·보조 액션을 함께 제공할 때 사용합니다. 주로 PF에서 MKT PD나 Buying PD로 이동할 때 사용합니다.
- Tertiary + Primary (Underlined + Filled / Primary): 콘텐츠에 따라 두 가지 선택지를 제공할 때 사용합니다. 주로 Shop에서 Buying PD나 Cart / Checkout으로 이동할 때 사용합니다.
- Tertiary + Secondary (Underlined + Outlined): 우선순위가 낮은 선택지를 제공하거나 액션 위계를 낮출 때 사용합니다. 주로 Home에서 MKT PD나 Buying PD로 이동할 때, MKT PD에서 Buying PD로 이동할 때 사용합니다.
- 위 조합은 대표적인 예시이며, 전체 페이지와 사용자 흐름별 상세 배치는 Operation Toolkit을 참고합니다.

#### **2.4.2. 라벨 작성 규칙**

- Buy: 제품 구매 페이지로 이동할 때 사용합니다.
- Buy now: 구매 페이지 안에서 구매 흐름의 다음 단계로 이동할 때 사용합니다.
- Learn more: 새 페이지나 팝업에서 제품 또는 콘텐츠의 추가 정보를 확인할 때 사용합니다.
- Add to cart: 선택한 제품을 장바구니에 담을 때 사용합니다.
- View more: 페이지 이동 없이 같은 페이지에서 콘텐츠를 더 펼쳐 보여줄 때 사용합니다.
- View all: 전체 제품 목록이나 필터가 적용된 목록 페이지로 이동할 때 사용합니다.

#### **2.4.3. 아이콘 사용 규칙**

- 새 창으로 열리는 액션에는 라벨 뒤에 바깥 방향 화살표(↗) 아이콘을 붙여 새 창이 열린다는 것을 알려줍니다.
- 같은 페이지에서 콘텐츠를 더 펼치는 View more에는 아래 방향 화살표 아이콘을 붙입니다.
- Filled 타입은 Icon_trailing 형태만 제공하고, Outlined와 Label 타입은 Icon_leading과 Icon_trailing 형태를 모두 제공합니다.
- 아이콘만으로 구성된 버튼은 CTA Button Icon (아이콘 버튼) 카테고리를 따릅니다.

2.5.1. Large 사이즈

- status: ALLOW
- content: Filled / Primary 버튼은 기본 높이 40px보다 큰 Large 사이즈(높이 48px)를 사용할 수 있습니다.
- status: ALLOW
- content: Filled / Emphasis 버튼은 기본 높이 40px보다 큰 Large 사이즈(높이 48px)를 사용할 수 있습니다.

2.5.2. 추가 버튼 형태

- status: ALLOW
- content: 현재 상태와 드롭다운 탐색을 하나의 좁은 CTA로 압축해 보여줘야 할 때는 Icon trailing number 버튼을 사용할 수 있습니다.
- status: ALLOW
- content: 화면 공간을 절약하면서 특정 기능을 바로 실행해야 할 때는 Icon only 버튼을 사용할 수 있으며, 높이 40px 버튼 안에 24px × 24px 아이콘을 배치합니다.

2.5.3. 폰트

- status: MUST
- content: CTA 버튼의 영문, 한글, 숫자에는 모두 SamsungOneKoreanOTF 폰트 700을 사용합니다.
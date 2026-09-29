# Badge (뱃지)

DB 등록: 2차
담당자: Rhea
분류: 02. Element
작업: 2026년 9월 10일 오후 3:10
작업상태: 진행 중
하위 항목: Filled (https://app.notion.com/p/Filled-39815929183280b59c0df8020be565e8?pvs=21), Label (https://app.notion.com/p/Label-39815929183280b5a381d3b546b94736?pvs=21), Dot (https://app.notion.com/p/Dot-398159291832802e91efd66fba6a2335?pvs=21), Number (https://app.notion.com/p/Number-39815929183280828893e3df3dab2785?pvs=21), Icon (https://app.notion.com/p/Icon-39d159291832804680eac15aa79867fb?pvs=21), 백업 (https://app.notion.com/p/3d71592918328037bc68e9d8193cf736?pvs=21)

# **Badge (뱃지)**

## 0. 메타

### 0.1. 분류(Category)

- `Badge`
- `Element`

### 0.2. 타입 종류 (Types)

- `filled`, `label`, `dot`, `number`, `icon`

### 0.3. 타입 별 요소 (kyeword)

- `filled`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `label`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `dot`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `number`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `icon`: 사용규칙, 사용처 정의, 스펙 및 토큰

### 0.4. Figma Node ID

---

## 1. 개요 (Overview)

### 1.1. 정의

- 정의: 추가 정보나 상태를 직관적으로 인지할 수 있도록 텍스트, 숫자, 점(`Dot`), 독립 벡터 에셋 형태로 정보를 제공하는 컴포넌트입니다.
- 사용 목적: 사용자의 시선을 끌어 특정 영역에 새로운 정보나 주의가 필요한 세일즈 포인트가 존재함을 직관적으로 인지시킵니다.
- 기본 원칙: 목적에 맞는 올바른 `type`을 선택하고, 본 가이드에 지정된 디자인 토큰 및 가드레일을 준수합니다.

### 1.2. 타입별 적용 상황

- `filled`: 혜택, 프로모션, 핵심 세일즈 텍스트 강조 시 적용
- `label`: 프로덕트 카드 내부 및 단독 텍스트 노출 필요 시 적용
- `dot`: 업데이트, 신규 정보 존재 여부를 최소한의 레이아웃으로 전달할 때 적용
- `number`: 장바구니, 알림 목록 등 데이터의 수량을 카운팅할 때 적용
- `icon`: 오늘보장, 빠른배송 등 물류/배송 브랜딩 특화 에셋 노출 시 적용

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙 (Common Rules)

- `[공통]` `[MUST]` 콘텐츠의 성격(상태 표시, 숫자 카운트, 신규 콘텐츠 알림 등)에 맞는 적절한 뱃지 타입을 선택하여 적용한다.
- `[공통]` `[AVOID]` 피그마 컴포넌트 내의 뱃지 높이, 패딩, 라운드, 폰트 스펙을 임의로 해제(`Detach`)하거나 수정하여 사용하는 행위를 금지한다.
- `[공통]` `[AVOID]` 각 케이스별 지정된 컨테이너 컬러와 텍스트 컬러 토큰 조합을 디자인 가이드 외에 다른 임의의 컬러로 변경하는 것을 금지한다.

### 2.2. Type별 선택 규칙 (Selection Rules)

- `[공통]` `[SHOULD]` 배경 색상 채움과 텍스트가 함께 강조되어야 하는 핵심 세일즈 정보(예: 추천 기획전 썸네일 우상단, 구매 혜택 등)를 표기할 때는 `type = filled`를 사용한다.
- `[공통]` `[MUST]` 프로덕트 카드 내부나 텍스트 리스트 등 화면 내 요소가 밀집되어 있어 배경색이 채워진 타입을 썼을 때 시각적 노이즈가 발생하는 영역에서는 `type = label`을 사용한다.
- `[공통]` `[MUST]` 구체적인 텍스트나 숫자 없이 화면 영역 및 공간 제약이 극심한 상황에서 알림의 존재 여부만 최소한으로 표현할 때는 `type = dot`을 사용한다.
- `[공통]` `[MUST]` 알림이나 장바구니 등 확인해야 할 정보의 구체적인 수량 및 양적 직관성을 표현할 때는 `type = number`를 사용한다.
- `[공통]` `[MUST]` 오늘보장, 빠른배송 등 물류 상태를 파편화 없이 강력하고 정형화된 비주얼로 표현할 때는 `type = icon`을 사용한다.

---

## 3. 제약 및 예외 사항 (Edge Cases)

### 3.1. 공통 및 영역 진입 제약 사항

- `[component = product_card]`일 때, `[AVOID]` 해당 영역에 `type = filled` 적용은 불가하며, `[MUST]` 오직 `type = label` 스펙만 강제 적용한다.
- `[type = label]`일 때, `[MUST]` `container = none`, `border = none` 속성을 유지하며, 임의로 테두리나 배경색을 추가할 수 없다.
- `[type = dot]`일 때, `[MUST]` 어떠한 경우에도 `width: hug_contents` 속성을 적용할 수 없으며, 오직 `width: 4px`, `height: 4px` 고정 크기만 허용한다.
- `[type = dot]`일 때, `[MUST]` `label: none`, `border: none` 규칙을 강제 유지해야 하며, 임의의 레이블 폰트나 테두리를 추가할 수 없다.

### 3.2. 데이터 수량 및 형태 가변 제약 사항

- `[type = number]`이고 `[count > 99]`일 때, `[MUST]` `case = max`, `label = '99+'`, `widthType = fixed`, `width = 23px`, `height = 16px` 고정 크기 속성을 강제 적용하며 가변(`Hug Contents`) 속성을 원천 배제한다.
- `[type = number]`이고 `[count <= 99]`일 때, `[MUST]` 동적 가변(`Hug`) 및 너비 확장 행위를 일체 금지하며, 어떠한 상황에서도 배지 형태가 찌그러지지 않도록 항상 고정 크기 `width = 16px`, `height = 16px`를 강제 유지한다.
- `[type = number]`일 때, `[MUST]` `label = [0-9]` 규칙을 준수하여 오직 숫자만 허용하며, 특수 기호 및 한글/영어 문자 단독 표기를 절대 금지한다. (단, `case = max`일 때의 `99+` 레이블은 예외로 허용한다.)
- `[layoutContext = flexible_font]`일 때, `[SHOULD]` 결합하는 컴포넌트 가이드라인에 특수 규격이 명시되어 있는 경우 가독성 확보를 위해 예외적으로 레이블 폰트 크기(`fontSize`)를 해당 컴포넌트에 맞춰 가변 적용할 수 있다. 단, 케이스별 지정된 고유 컬러 토큰 스펙은 변경 없이 그대로 유지해야 한다.

### 3.3. 결합형 레이아웃 및 앵커링 정렬 제약 사항

- `[content = typography_or_icon]`일 때, `[MUST]` 텍스트 또는 아이콘 컴포넌트 우상단에 결합할 경우 글자의 어센더(`Ascender`) 라인 및 행간 레이아웃을 침범하지 않도록 상대 위치(`Absolute Positioning`) 마진 규칙을 준수한다. `(상세 마진 수치 기준: 미정/TBD)`
- `[placement = icon_context]`일 때, `[MUST]` 아래의 상대 위치 가이드라인 및 대칭 정렬 규격을 준수하여 결합한다.
    - `parentTargetSize` : `40px 40px` (GNB 아이콘 터치 영역 박스)
    - `childIconSize` : `24px 24px` (터치 영역 내부 실제 그래픽 아이콘 크기)
    - `badgeSize` : `[MUST] 동적 가변 속성 없이 오직 아래의 2가지 고정 치수(Fixed Size) 규격만 적용`한다.
        - `[case = default (1~99)]` : `16px 16px` (정형 서클)
        - `[case = max (99+)]` : `23px 16px` (캡슐형 타원)
    - `anchorPoint` : `childIcon(24x24px)`의 우상단 꼭짓점 (`Top-Right Corner`)
    - `alignmentAnchor` : `[MUST] 배지의 대칭 배치 구조 정밀 검수를 위해 아래의 앵커 매칭 규칙을 강제`한다.
        - `[case = default (1~99)]` : 뱃지 컨테이너의 `우상단(Top-Right)` 꼭짓점을 `anchorPoint`에 물리적으로 고정한다.
        - `[case = max (99+)]` : 뱃지 컨테이너의 `좌상단(Top-Left)` 꼭짓점을 `anchorPoint`에 물리적으로 고정한다.
    - `horizontalMarginCheck` : `[MUST] 뱃지 종류와 관계없이 시각적 안정감을 위해 반대편 잔여 여백은 항상 24px 대칭 구조를 유지해야 한다.`
        - `[case = default (1~99)]` : 우상단 고정 배치로 인해 뱃지 좌측에 `24px` 고정 여백이 확보되어야 한다. (`40px - 16px = 24px`)
        - `[case = max (99+)]` : 좌상단 고정 배치로 인해 뱃지 우측에 `24px` 고정 여백이 대칭되게 확보되어야 한다. (이를 위해 뱃지 좌측 영역이 터치 영역 경계 밖으로 자연스럽게 확장되는 것을 허용한다.)
    - `verticalMarginCheck` : `[MUST]` GNB(헤더) 컴포넌트 상단 가장자리(`Top Edge`)로부터 배지 상단 끝선까지의 수직 거리(마진)는 케이스와 상관없이 항상 `24px`를 유지한다.
    - `widthVariableRule` : `[MUST]` 동적 가변(`Hug`)이 불가하므로, 1~99 상태에서 99+ 상태로 전환 시 가변 확장 방식이 아닌 뱃지 컴포넌트 자체의 고정 에셋 스위칭 방식(16px -> 23px) 및 정렬 축 대칭 전환 규칙(우상단 밀착 -> 좌상단 밀착)을 적용해야 하며, 이 과정에서 `anchorPoint`의 시작 좌표점은 밀리지 않고 고정 상태를 유지해야 한다.
- `[type = icon]`일 때, `[MUST]` `assetStatus = locked`를 적용하며 `sizeScaleDown = false`를 강제한다. 즉, 고정 해상도 `width: 69px, height: 24px`를 절대적으로 유지해야 하며, 텍스트 가독성 확보를 위해 임의로 스케일을 줄이거나 축소할 수 없다.
- `[color = customization]`일 때, `[MUST]` 뱃지의 메인 색상은 지정된 브랜드 컬러인 `#2189FF`를 고정 적용하며, 임의의 컬러 변경을 금지한다.
- `[layoutContext = list_placement]`일 때, `[MUST]` 뱃지가 상위/부모 콘텐츠 컴포넌트(예: 컬러 칩 영역, 텍스트 라인 등) 하단에 수직으로 배치될 경우 아래의 플랫폼별 정해진 간격 및 정렬 규격을 강제 준수한다.
    - `pcVerticalGap` : `4px`
    - `moVerticalGap` : `8px`
    - `alignment` : `center_middle` (콘텐츠 기준 중앙정렬 레이아웃 상속)

### 3.4. 외부 데이터 연동 및 Fallback Policy

- `[MUST]` Figma Component Variant 또는 노션 DB 연동이 유효할 경우 해당 최신 스펙을 우선 조회하여 응답합니다.
- `[MUST]` 연동이 불가하거나 스펙이 미정(`TBD`)인 상태에서 질문을 받을 경우, 본 문서의 요약 스펙을 기반으로 답변하되 "최신 디자인 시스템 피그마 라이브러리와 수치가 일부 다를 수 있음"을 안내 메시지에 명시합니다.
- `[SHOULD]` 질문자의 용어가 모호할 경우(예: "알림 점", "카운트 마크"), Aliases 매핑 테이블을 거쳐 정확한 Badge Type을 역추출한 뒤 안내합니다.
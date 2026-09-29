# Utility Button (기능 버튼)

DB 등록: 1차
담당자: Joy
분류: 02. Element
작업: 2026년 9월 14일 오후 2:57
작업상태: 진행 중

## 1. 개요

- 정의: 아이콘이 버튼 의미를 구성하거나 라벨과 함께 액션 방향/기능을 보조하는 버튼군이다.
- 목적: 아이콘이 액션 인지, 방향성, 상태 전환, 수량 정보, 쿠폰성 액션, 재생/정지 기능을 보조하거나 대표하는 경우에 사용한다.
- 기본 원칙: 아이콘은 장식 요소가 아니라 버튼의 의미를 빠르게 인지하게 만드는 보조 정보 또는 단독 액션 단서로 사용한다.
- 사용 용도/기준: Figma에 별도 설명 문구로 작성되어 있지는 않으므로, 이 문서에서는 Figma의 component 이름, variant 구조, state, icon 위치를 기준으로 운영 기준을 정의한다.
- 관리 방식: Figma에 여러 target/variant로 나뉘어 있는 아이콘 버튼도 이 문서에서는 하나의 Icon Action Button 정보로 통합해 관리한다.
- 기본 분기:
    - `Outlined Icon`: Outlined 형태에 아이콘이 포함된 버튼
    - `Underlined Icon`: Underlined 형태에 trailing icon이 포함된 버튼
    - `Label`: 컨테이너 없이 라벨 중심으로 구성된 버튼
    - `Icon Only`: 아이콘만으로 구성된 버튼
    - `Toggle Icon`: on/off 상태가 있는 아이콘 버튼
    - `Play Icon`: play/pause 기능이 있는 아이콘 버튼
    - `Coupon Icon Button`: 쿠폰성 액션에서 아이콘 섹션이 포함된 버튼
- 아이콘 위치 분기:
    - `Icon_leading`: 라벨 앞에서 액션의 성격이나 대상을 먼저 암시하는 아이콘
    - `Icon_trailing`: 라벨 뒤에서 이동, 후속 단계, 펼침, 보조 정보를 암시하는 아이콘
    - `Icon_only`: 라벨 없이 아이콘만으로 실행하는 액션
    - `Number + Icon_trailing`: 라벨, 숫자 정보, trailing icon이 함께 들어가는 구성
- 화면 width 분기(권장 운영 기준):
    - `Mobile`: 화면 width `0-767px`
    - `PC`: 화면 width `768px 이상`
- 크기 분기(권장 운영 기준):
    - `Mobile / default`: 모바일의 주요 비디오/미디어 영역 위 재생 컨트롤에 사용한다. 미디어 영역 width가 `320px 이상`일 때 우선 검토한다.
    - `Mobile / small`: 모바일의 썸네일, 카드형 미디어, 인디케이터 주변 보조 컨트롤에 사용한다. 미디어 영역 width가 `319px 이하`이거나 컨트롤 영역 높이가 `40px 이하`일 때 우선 검토한다.
    - `PC / default`: PC의 주요 비디오/히어로 미디어 영역 위 재생 컨트롤에 사용한다. 미디어 영역 width가 `640px 이상`일 때 우선 검토한다.
    - `PC / small`: PC의 카드형 미디어, 썸네일, 인디케이터 주변 보조 컨트롤에 사용한다. 미디어 영역 width가 `320-639px`이거나 컨트롤 영역 높이가 `48px 이하`일 때 우선 검토한다.
- 상태 분기:
    - `normal`: 기본 노출 상태
    - `hover`: 마우스 오버 상태
    - `pressed`: `Icon / Play`의 mobile outlined에서 확인되는 상태
    - `disabled`: 일부 icon/label 계열에서 확인되는 비활성화 상태
    - `toggle on/off`: Toggle Icon 계열에서 확인되는 선택/해제 상태
    - `play/pause`: Play Icon 계열에서 확인되는 기능 상태
- 모드 분기:
    - `light_bg`: 현재 Figma에서 확인된 기준
    - `dark_bg`: 미정(TBD)
- Figma 내 설명 문구: 각 섹션의 설명 영역은 `Description text` placeholder로 확인됨. 실제 설명 문구는 확인되지 않음.
- 주의: 아이콘 이름 목록, 접근성 라벨 문구, 최소 터치 영역 정책은 Figma 값으로 확인되지 않았으므로 별도 정의가 필요하다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- `[공통]` `[MUST]` 현재 확인된 스펙은 `theme=light_bg` 기준으로 사용한다.
- `[공통]` `[MUST]` 아이콘 크기, 라벨 간격, 상태별 opacity는 Figma variant 값을 따른다.
- `[공통]` `[MUST]` `Icon_leading`, `Icon_trailing`, `Label`, `Icon`, `Toggle`, `Play`, `Coupon` 계열 값을 이 문서에서 함께 관리한다.
- `[공통]` `[SHOULD]` 아이콘만으로 의미가 불명확하면 라벨이 있는 variant를 우선 검토한다.
- `[공통]` `[SHOULD]` 아이콘은 버튼 라벨의 의미를 반복하기보다 액션의 방향, 상태, 대상, 기능을 보조하도록 사용한다.
- `[공통]` `[DON'T]` Figma에 없는 아이콘 이름이나 기능을 임의로 만들어 안내하지 않는다.
- `[공통]` `[DON'T]` `dark_bg` 기준 스펙은 아직 정의되지 않았으므로 확정값처럼 안내하지 않는다.

### 2.2. Figma 구성별 사용 기준

| Figma 구성 | 아이콘 구성 | 사용 용도 | 사용 기준 |
| --- | --- | --- | --- |
| `Outlined / Icon_leading` | 라벨 + leading icon | 버튼 형태의 보조 액션에서 아이콘이 액션의 성격이나 대상을 먼저 보조 | 아이콘을 먼저 보고 액션의 맥락을 이해해야 할 때 사용 |
| `Outlined / Icon_trailing` | 라벨 + trailing icon | 버튼 형태의 보조 액션에서 아이콘이 이동, 다음 단계, 후속 동작을 보조 | 라벨 뒤에 방향성이나 후속 동작 단서가 필요할 때 사용 |
| `Outlined / Icon_trailing / Number` | 라벨 + 숫자 + trailing icon | 버튼 안에서 숫자 정보와 후속 동작 단서가 함께 필요한 액션 | 숫자가 버튼 의미에 포함되고 trailing icon이 다음 동작을 보조할 때 사용 |
| `Outlined / Icon_only` | outlined container + icon only | 외곽선이 있는 아이콘 단독 액션 | 라벨 없이도 아이콘 의미가 명확하고 버튼형 터치 영역이 필요할 때 사용 |
| `Underlined / Icon_trailing` | underlined label + trailing icon | 텍스트 링크형 보조 액션에서 후속 동작을 보조 | 자세히 보기, 더보기, 이동성 액션처럼 가벼운 액션에 사용 |
| `Label / Standard` | label only | 컨테이너 없이 라벨만 제공하는 낮은 강조 액션 | 아이콘이나 외곽선 없이 텍스트만으로 충분할 때 사용 |
| `Label / Icon_leading` | label + leading icon | 낮은 강조 액션에서 아이콘이 액션 대상을 먼저 보조 | 버튼 외곽선 없이 라벨 앞 아이콘이 필요한 경우 사용 |
| `Label / Icon_trailing` | label + trailing icon | 낮은 강조 액션에서 아이콘이 후속 동작을 보조 | 버튼 외곽선 없이 라벨 뒤 아이콘이 필요한 경우 사용 |
| `Icon / Standard` | icon only | 가장 기본적인 아이콘 단독 액션 | 공간이 좁고 아이콘 의미가 명확한 경우 사용 |
| `Icon / Toggle_standard` | icon only + on/off state | 상태를 전환하는 아이콘 액션 | 찜하기처럼 선택/해제 상태 자체가 중요한 액션에 사용 |
| `Icon / Toggle_contained` | contained icon + on/off state | 컨테이너가 있는 상태 전환 아이콘 액션 | 토글 상태를 더 명확하게 보여야 할 때 사용 |
| `Icon / Play` | play/pause icon | 미디어 재생/정지 액션 | play/pause 기능이 필요한 영역에서 사용 |
| `Outlined / Coupon` | coupon label + icon section | 쿠폰성 액션에서 아이콘 섹션이 의미를 보조 | 쿠폰 액션이 라벨과 아이콘 섹션을 함께 필요로 할 때 사용 |

### 2.3. 아이콘 위치 기준

| 아이콘 위치 | Figma 구성 | 사용 기준 |
| --- | --- | --- |
| `Icon_leading` | `Outlined / Icon_leading`, `Label / Icon_leading` | 아이콘이 라벨보다 먼저 액션의 성격, 대상, 카테고리를 보조해야 할 때 사용 |
| `Icon_trailing` | `Outlined / Icon_trailing`, `Underlined / Icon_trailing`, `Label / Icon_trailing` | 아이콘이 라벨 뒤에서 이동, 다음 단계, 더보기, 펼침 같은 후속 동작을 보조할 때 사용 |
| `Icon_trailing + Number` | `Outlined / Icon_trailing / Number` | 버튼 안에서 숫자 정보와 후속 동작 단서가 함께 필요한 경우 사용 |
| `Icon_only` | `Outlined / Icon_only`, `Icon / Standard` | 아이콘만으로 의미가 충분하거나 주변 문맥이 액션을 설명해주는 경우 사용 |
| `Toggle Icon` | `Icon / Toggle_standard`, `Icon / Toggle_contained` | 아이콘이 단순 실행이 아니라 on/off 상태를 표현해야 할 때 사용 |
| `Play Icon` | `Icon / Play` | 아이콘이 재생/정지 기능 상태를 표현해야 할 때 사용 |
| `Coupon Icon Section` | `Outlined / Coupon` | 쿠폰성 버튼 안에서 아이콘 섹션이 라벨과 함께 액션 의미를 보조할 때 사용 |

### 2.4. 화면/크기 선택 기준

> 아래 수치는 Figma의 breakpoint 정의가 아니라, `Icon / Play`, `Icon / Standard`, 아이콘 포함 버튼을 실제 화면에서 선택하기 위한 권장 운영 기준이다. 버튼 자체 크기와 아이콘 크기는 `4. 디자인 스펙 및 토큰`의 Figma 값을 따른다.
> 

| 화면 구간 | Size | 권장 사용 상황 | 영역 기준 | 연결되는 Figma 값 |
| --- | --- | --- | --- | --- |
| `Mobile`, `0-767px` | `default` | 모바일의 주요 비디오/미디어 영역 위 재생/정지 컨트롤 | 미디어 영역 width `320px 이상` | `Icon / Play`, `device=mobile`, `size=default`, `56x56` |
| `Mobile`, `0-767px` | `small` | 모바일 썸네일, 카드형 미디어, 인디케이터 주변 보조 컨트롤 | 미디어 영역 width `319px 이하` 또는 컨트롤 영역 높이 `40px 이하` | `Icon / Play`, `device=mobile`, `size=small`, `24x24` |
| `PC`, `768px 이상` | `default` | PC의 주요 비디오/히어로 미디어 영역 위 재생/정지 컨트롤 | 미디어 영역 width `640px 이상` | `Icon / Play`, `device=pc`, `size=default`, `96x96` |
| `PC`, `768px 이상` | `small` | PC의 카드형 미디어, 썸네일, 인디케이터 주변 보조 컨트롤 | 미디어 영역 width `320-639px` 또는 컨트롤 영역 높이 `48px 이하` | `Icon / Play`, `device=pc`, `size=small`, `36x36` |
| 공통 | `default` | 일반 아이콘 단독 액션, 라벨 없이도 클릭 영역이 명확해야 하는 액션 | 콘텐츠 영역 width `360px 이상` | `Icon / Standard`, `40x40` |
| 공통 | `small` | 좁은 툴바, 인디케이터 주변, 리스트/카드 내부의 낮은 강조 아이콘 액션 | 콘텐츠 영역 width `359px 이하` 또는 컨트롤 영역 높이 `40px 이하` | `Icon / Standard`, `24x24` |
- `[사이즈]` `[SHOULD]` 화면 width는 `Mobile`과 `PC`를 나누는 1차 기준으로 사용하고, 실제 크기는 아이콘이 놓이는 미디어/콘텐츠 영역 width로 다시 판단한다.
- `[사이즈]` `[SHOULD]` 비디오 위에 단독으로 떠 있는 주요 재생 버튼은 `default`를 우선 검토한다.
- `[사이즈]` `[SHOULD]` 인디케이터, 페이지네이션, 카드 썸네일 주변의 보조 컨트롤은 `small`을 우선 검토한다.
- `[사이즈]` `[DON'T]` 좁은 카드나 인디케이터 주변에 `PC / default` 재생 버튼을 사용하지 않는다.

### 2.5. 라벨 및 아이콘 작성 규칙

- `[라벨]` `[SHOULD]` 라벨이 있는 아이콘 버튼은 라벨 텍스트와 아이콘 의미가 충돌하지 않도록 한다.
- `[라벨]` `[SHOULD]` Icon only 버튼은 실제 서비스 적용 시 접근성 이름이 필요하다.
- `[라벨]` `[SHOULD]` 숫자가 포함된 버튼은 숫자가 무엇을 의미하는지 주변 문맥이나 라벨에서 함께 이해되어야 한다.
- `[상태]` `[SHOULD]` Toggle 버튼은 현재 상태가 `on`인지 `off`인지 응답에 함께 표기한다.
- `[상태]` `[SHOULD]` Play 버튼은 `play`와 `pause` 중 어떤 function인지 응답에 함께 표기한다.
- `[공통]` `[DON'T]` 아이콘 이름 목록, 접근성 라벨 문구, 최소 터치 영역 정책은 정의되지 않았으므로 임의로 안내하지 않는다.

### 2.6. 예외 규칙

- `[예외]` `[MUST]` `focused`, `loading` 상태는 Figma variant에서 확인되지 않았으므로 `미정(TBD)`로 안내한다.
- `[예외]` `[MUST]` `dark_bg` 기준의 Icon Action Button은 미정(TBD)으로 안내한다.
- `[예외]` `[MUST]` `Icon / Play`는 `target`, `device`, `style`, `size`, `function`, `state` 조건을 함께 확인한 뒤 답변한다.
- `[예외]` `[MUST]` Toggle 계열은 `toggle=on/off` 또는 `function=on/off` 조건을 함께 확인한 뒤 답변한다.
- `[예외]` `[MUST]` 쿠폰성 아이콘 버튼은 쿠폰 액션 맥락인지 먼저 확인한 뒤 답변한다.
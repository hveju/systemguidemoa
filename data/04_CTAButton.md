# CTA Button (액션 버튼)

DB 등록: 1차
담당자: Joy
분류: 02. Element
작업: 2026년 9월 14일 오후 2:56
작업상태: 진행 중
하위 항목: Primary Action Button (https://app.notion.com/p/Primary-Action-Button-398159291832807b835af36f91ac6531?pvs=21), Secondary Action Button (https://app.notion.com/p/Secondary-Action-Button-3981592918328061ad30cd34bcb6ff79?pvs=21), Tertiary Action Button (https://app.notion.com/p/Tertiary-Action-Button-3981592918328044bd34e7eef49b65dd?pvs=21)

### 0. 메타

- **분류(Category)**: Component / CTA Button — Primary·Secondary·Tertiary Action Button을 한 페이지로 통합
- **타입 종류(Types)**: `Primary Action Button`, `Secondary Action Button`, `Tertiary Action Button`
- **페이지**: `Button (CTA)`

### 1. 개요

#### 1.1. 정의

- CTA Button DB는 화면의 액션 우선순위에 따라 사용하는 버튼 3종을 정의한다.
- `Primary Action Button` / `Secondary Action Button` / `Tertiary Action Button` 버튼 중요도에 따라 3개 타입으로 나뉜다.
- **Primary**: 페이지 목적과 직접 연결되는 주요 액션에 쓰는 Filled 계열 버튼.
- **Secondary**: 없어도 페이지가 운영되지만 있으면 도움이 되는 보조 액션 버튼.
- **Tertiary**: Primary/Secondary보다 시각 강조를 더 낮춰야 하는 선택적 액션 버튼.

#### 1.2. 타입별 요약

| Type | 정의 | 기본 형태(variant) |  |
| --- | --- | --- | --- |
| `Primary Action Button` | 페이지 목적과 직접 연결되는 주요 CTA (Filled 계열) | `Filled / Primary`, `Filled / Emphasis` × `Standard`, `Icon_trailing` |  |
| `Secondary Action Button` | 필수는 아니지만 있으면 도움이 되는 보조 액션 | `Outlined / Standard`, `Outlined / Coupon`, `Underlined / Standard` |  |
| `Tertiary Action Button` | 더 낮은 시각 강조의 선택적 액션 (Black→Gray 예정 사양) | `Outlined / Standard` 형태값 참조 |  |

#### 1.3. 적용 상황 (액션 우선순위)

- 페이지의 핵심 목적과 직접 연결되는 필수 액션 → `Primary Action Button`
- 없어도 페이지가 운영되지만 있으면 도움이 되는 보조 액션 → `Secondary Action Button`
- Primary/Secondary보다 더 낮은 시각 강조가 필요한 선택적 액션 → `Tertiary Action Button`

**공통 액션 우선순위 선택 규칙**

| 판단 질문 | 기준에 맞는 경우 | 기준에 맞지 않는 경우 |
| --- | --- | --- |
| 이 액션이 페이지의 핵심 목적과 직접 연결되는가? | `Primary Action Button` 검토 | `Secondary` 또는 `Tertiary Action Button` 검토 |
| 이 버튼이 없어도 페이지가 정상 운영되는가? | `Primary Action Button`보다 낮은 우선순위 버튼 검토 | `Primary Action Button` 검토 |
| 보조 액션이지만 버튼 형태의 시각적 볼륨이 필요한가? | `Outlined`(Secondary) 검토 | `Underlined`(Secondary) 검토 |
| Outlined와 같은 형태이되 더 낮은 시각 강조가 필요한가? | `Tertiary Action Button` 검토 | `Secondary Action Button` 검토 |
| Figma에 등록된 확정 컴포넌트가 필요한가? | `Tertiary` 사용 불가, `Secondary` 검토 | `Tertiary`를 예정 사양으로 안내 가능 |

### 2. 사용 규칙 (Usage Rules)

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[DON'T]`: 금지
> 

#### 2.0. 공통 규칙 (3종 전체)

- `[MUST]` 현재 확인된 스펙은 `theme=light_bg` 기준으로 사용한다.
- `[MUST]` 버튼의 높이, 패딩, 반경, 아이콘 크기, 상태별 색상은 Figma에 정의된 값을 따른다.
- `[MUST]` Figma에 없는 상태·목적·개수 제한·라벨 최대 길이를 임의로 만들어 안내하지 않는다.
- `[MUST]` `pressed`, `focused`, `loading` 등 Figma variant에서 확인되지 않은 상태는 `해당 없음(N/A)` 또는 `미정(TBD)`로 안내한다.
- `[MUST]` `dark_bg` 기준 스펙은 아직 정의되지 않았으므로 확정값처럼 안내하지 않는다(미정(TBD)).
- `[MUST]` 고정 너비, 최소 너비, 최대 너비, Hug Contents 여부는 현재 문서에서 별도 확인되지 않았으므로 `미정(TBD)`로 안내한다.
- `[SHOULD]` 사이즈는 화면 width보다 버튼이 놓이는 콘텐츠 영역 width를 우선 기준으로 판단한다.
- `[SHOULD]` 값 판단 전에 `type`(Primary/Secondary/Tertiary), `variant`, `size`, `state`, `theme`가 불명확하면 되묻는다.
- `[DON'T]` 값이 Figma에 없으면 추측하지 않고 `해당 없음(N/A)`, `미정(TBD)`, `정의되지 않음` 중 하나로 답한다.

#### 2.1. Type = Primary Action Button

**2.1.1. 공통 규칙**

- `[MUST]` 꼭 필요한 페이지의 목적과 연결되는 CTA에만 사용한다.
- `[MUST]` `theme=light_bg` 기준으로 사용한다.
- `[MUST]` 높이·패딩·반경·아이콘 크기·상태별 색상은 Figma 정의값을 따른다.
- `[SHOULD]` 사용 여부 판단 시 먼저 해당 액션이 페이지 목적과 직접 연결되는지 확인한다.
- `[DON'T]` 없어도 페이지가 운영되는 하위 액션에 Primary Action Button을 사용하지 않는다.
- `[DON'T]` `dark_bg` 기준 스펙을 확정값처럼 안내하지 않는다.

**2.1.2. 타입(형태) 선택 규칙**

- `[MUST]` 검정 Filled CTA가 필요하면 `Filled / Primary`를 사용한다.
- `[MUST]` Skyblue Filled CTA가 필요하면 `Filled / Emphasis`를 사용한다.
- `[SHOULD]` 라벨만으로 액션 의미가 충분하면 `Standard`를 사용한다.
- `[SHOULD]` 라벨 뒤에 방향성/이동 의미를 보조하는 아이콘이 필요하면 `Icon_trailing`을 검토한다.
- `[DON'T]` `Filled / Primary`와 `Filled / Emphasis`의 의미 차이를 임의로 정의하지 않는다(상세 사용 구분 미정의).

**2.1.3. 사이즈 선택 기준**

> 아래 수치는 Figma의 고정/가변 width 규칙이 아니라 화면 설계·챗봇 응답용 권장 운영 기준이다. 버튼 자체 스펙은 4번 Figma 값을 따른다.
> 

| Size | 권장 사용 상황 | 콘텐츠/영역 width 기준 | 비고 |
| --- | --- | --- | --- |
| `small` | 카드, 리스트, 모듈 내부처럼 좁은 영역 안에서 핵심 액션을 제공할 때 | 콘텐츠 영역 `359px 이하`이거나, 버튼 2개 이상 한 줄 배치 시 각 버튼 가용 폭 `160px 이하` | 높이 `32px` 기준 |
| `default` | 일반 페이지, 폼, 상세 화면, 구매/신청 흐름의 기본 CTA | 모바일 `360-767px`, PC `480px 이상`에서 기본 사용 | 높이 `40px` 기준 |
| `large` | 히어로, 프로모션, 넓은 결제/신청 영역처럼 단독 CTA 강조가 필요할 때 | PC 또는 넓은 콘텐츠 영역 `768px 이상`에서 CTA가 단독/최상위 액션으로 배치될 때 | 높이 `48px` 기준 |
- `[SHOULD]` 같은 화면에서도 본문 하단 대표 CTA는 `default`, 카드 내부 CTA는 `small`을 사용할 수 있다.
- `[DON'T]` 페이지 목적과 직접 연결되지 않는 보조 액션을 크게 보이려고 Primary의 `large`를 사용하지 않는다.

**2.1.4. 라벨 작성 규칙**

- `[SHOULD]` 사용자가 실행할 행동을 직접적으로 표현한다.
- `[SHOULD]` 버튼 안에서 한 줄로 인지되도록 짧게 작성한다.
- `[SHOULD]` 동일 화면에서 Primary와 Secondary/Tertiary의 라벨 의미가 겹치지 않게 한다.
- `[DON'T]` 라벨 최대 글자 수·줄바꿈 허용 여부·고정 너비 규칙은 정의되지 않았으므로 임의 안내하지 않는다.

**2.1.5. 예외 규칙**

- `[MUST]` `pressed`, `focused`, `loading`은 Figma variant에서 확인되지 않으므로 `해당 없음(N/A)` 또는 `미정(TBD)`로 안내한다.
- `[MUST]` `dark_bg` 기준의 Primary Action Button은 `미정(TBD)`으로 안내한다.
- `[MUST]` 고정/최소/최대 너비, Hug Contents 여부는 `미정(TBD)`으로 안내한다.

#### 2.2. Type = Secondary Action Button

**2.2.1. 공통 규칙**

- `[SHOULD]` CTA 버튼이 없어도 페이지가 운영되거나, 있으면 도움이 되는 하위 버튼에 사용한다.
- `[MUST]` `theme=light_bg` 기준으로 사용한다.
- `[MUST]` 높이·패딩·반경·상태별 색상은 Figma 정의값을 따른다.
- `[MUST]` Figma에 없는 개수 제한, 라벨 최대 길이, focus/loading 상태는 임의로 안내하지 않는다.
- `[DON'T]` 페이지 목적과 직접 연결되는 필수 CTA에 Secondary Action Button을 사용하지 않는다.
- `[DON'T]` Icon 계열 variant는 이 문서에서 답변하지 않고 `Icon Action Button` 문서로 안내한다.
- `[DON'T]` `dark_bg` 기준 스펙을 확정값처럼 안내하지 않는다.

**2.2.2. 타입(형태) 선택 규칙**

- `[SHOULD]` 보조 액션이지만 버튼 형태의 시각적 볼륨이 필요하면 `Outlined`를 사용한다.
- `[SHOULD]` 텍스트 링크처럼 더 가벼운 보조 액션에는 `Underlined`를 검토한다.
- `[MUST]` 쿠폰 전용 버튼은 `Outlined / Coupon` 기준으로 안내한다.
- `[DON'T]` 아이콘이 포함된 Outlined/Underlined variant를 Secondary 문서의 일반 버튼처럼 안내하지 않는다.

**2.2.3. 사이즈 선택 기준**

> 아래 수치는 Figma의 고정/가변 width 규칙이 아니라 화면 설계·챗봇 응답용 권장 운영 기준이다. 버튼 자체 스펙은 4번 Figma 값을 따른다.
> 

| Size | 권장 사용 상황 | 콘텐츠/영역 width 기준 | 비고 |
| --- | --- | --- | --- |
| `small` | 카드, 리스트, 쿠폰 모듈, 좁은 툴바 안의 보조 액션 | 콘텐츠 영역 `359px 이하`이거나, 버튼 2개 이상 한 줄 배치 시 각 버튼 가용 폭 `160px 이하` | Outlined/Coupon 높이 `32px`, Underlined 높이 `18px` 기준 |
| `default` | 일반 페이지나 상세 화면에서 기본 보조 액션을 제공할 때 | 모바일 `360-767px`, PC `480px 이상`에서 기본 사용 | Outlined/Coupon 높이 `40px`, Underlined 높이 `22px` 기준 |
| `large` | 넓은 화면에서 보조 액션도 명확한 클릭 대상으로 보여야 할 때 | PC 또는 넓은 콘텐츠 영역 `768px 이상`에서 보조 액션이 독립 배치될 때 | `Outlined / Standard`, `Underlined / Standard`에서 확인됨 |
- `[SHOULD]` Primary와 함께 배치되는 보조 버튼은 같은 시각 체계 안에서 읽히도록 `default`를 우선 검토한다.
- `[SHOULD]` Underlined는 텍스트 흐름 안에 들어가면 주변 텍스트 크기·밀도에 맞춰 `small` 또는 `default`를 선택한다.
- `[DON'T]` 보조 액션을 Primary보다 강한 시각 위계로 보이려고 `large`를 사용하지 않는다.

**2.2.4. 라벨 작성 규칙**

- `[SHOULD]` Secondary 라벨은 Primary 라벨보다 낮은 우선순위 행동으로 읽히게 작성한다.
- `[SHOULD]` Outlined와 Underlined가 같은 화면에 함께 있을 때는 중요도가 더 높은 보조 액션에 Outlined를 사용한다.
- `[SHOULD]` Underlined 라벨은 이동/자세히 보기/보조 확인처럼 가벼운 행동에 적합한지 검토한다.
- `[DON'T]` 라벨 최대 글자 수·줄바꿈 허용 여부·고정 너비 규칙은 정의되지 않았으므로 임의 안내하지 않는다.

**2.2.5. 예외 규칙**

- `[MUST]` `pressed` 상태는 `Underlined / Standard`의 `size=small`에서만 확인되므로, 다른 경우에는 `해당 없음(N/A)` 또는 `미정(TBD)`로 안내한다.
- `[MUST]` `focused`, `loading`은 Figma variant에서 확인되지 않으므로 `미정(TBD)`로 안내한다.
- `[MUST]` `dark_bg` 기준의 Secondary Action Button은 `미정(TBD)`으로 안내한다.
- `[MUST]` 고정/최소/최대 너비, Hug Contents 여부는 `미정(TBD)`으로 안내한다.
- 주의: `Outlined / Icon_leading`, `Outlined / Icon_trailing`, `Underlined / Icon_trailing`, `Label`, `Icon` 값은 `Icon Action Button` 문서에서 관리한다.

#### 2.3. Type = Tertiary Action Button (Figma 미등록 · 예정 사양)

**2.3.1. 공통 규칙**

- `[MUST]` 버튼 스타일 및 크기는 `Outlined / Standard`와 동일한 형태값을 참조한다.
- `[MUST]` `Outlined / Standard`의 Black 컬러를 Gray 컬러로 바꾸는 방향으로 정의한다.
- `[MUST]` 정확한 Gray 토큰은 아직 정의되지 않았으므로 `미정(TBD)`로 안내한다.
- `[MUST]` Figma 추가 전까지 실제 구현/응답에서는 예정 사양임을 함께 고지한다.
- `[MUST]` Figma 확인 완료 컴포넌트처럼 안내하지 않는다.
- `[DON'T]` 임의의 Gray token을 지정하지 않는다.
- `[DON'T]` hover, disabled의 세부 색상 값을 확정값처럼 말하지 않는다.

**2.3.2. 타입 선택 규칙**

- `[SHOULD]` Outlined와 같은 형태이되 더 낮은 시각 강조가 필요하면 Tertiary Action Button을 검토한다.
- `[SHOULD]` Figma 등록된 컴포넌트가 필요한 상황에서는 Secondary Action Button을 우선 검토한다.
- `[DON'T]` Tertiary Action Button을 Primary/Secondary와 같은 확정 컴포넌트처럼 사용하지 않는다.
- 이전 명칭/검색어: `Ghost Button`, `Gray Outlined Button`

**2.3.3. 사이즈 선택 기준**

> 아래 수치는 Tertiary 자체 Figma 값이 아니라 `Outlined / Standard` 형태값을 참조한 권장 운영 기준이다. Figma 등록 후 확정값으로 갱신해야 한다.
> 

| Size | 권장 사용 상황 | 콘텐츠/영역 width 기준 | 비고 |
| --- | --- | --- | --- |
| `small` | 카드, 리스트, 보조 정보 영역처럼 낮은 강조의 선택 액션을 좁은 곳에 둘 때 | 콘텐츠 영역 `359px 이하`이거나, 버튼 2개 이상 한 줄 배치 시 각 버튼 가용 폭 `160px 이하` | `Outlined / Standard small` 참조 |
| `default` | 일반 페이지나 상세 화면에서 낮은 강조 액션을 기본 크기로 제공할 때 | 모바일 `360-767px`, PC `480px 이상`에서 기본 사용 | `Outlined / Standard default` 참조 |
| `large` | 넓은 화면에서 낮은 강조 액션도 독립 클릭 대상으로 보여야 할 때 | PC 또는 넓은 콘텐츠 영역 `768px 이상`에서 액션이 독립 배치될 때 | `Outlined / Standard large` 참조, 사용 빈도는 낮게 유지 |
- `[SHOULD]` Tertiary는 낮은 시각 강조가 목적이므로, `large`는 레이아웃상 클릭 대상 크기가 필요한 경우에만 제한적으로 검토한다.
- `[DON'T]` Primary/Secondary보다 눈에 띄게 만들기 위해 Tertiary의 크기를 키우지 않는다.

**2.3.4. 라벨 작성 규칙**

- `[SHOULD]` Tertiary 라벨은 선택적이고 낮은 우선순위 행동으로 읽히게 작성한다.
- `[SHOULD]` Primary/Secondary 라벨과 같은 행동을 다른 표현으로 반복하지 않는다.
- `[SHOULD]` 버튼 안에서 한 줄로 인지되도록 짧게 작성한다.
- `[DON'T]` 라벨 최대 글자 수·줄바꿈 허용 여부·고정 너비 규칙은 정의되지 않았으므로 임의 안내하지 않는다.

**2.3.5. Figma 등록 시 확인해야 할 항목**

| 확인 항목 | 현재 상태 |
| --- | --- |
| Component Set Node ID | `미정(TBD)` |
| Gray Label Token | `미정(TBD)` |
| Gray Border Token | `미정(TBD)` |
| Hover Container Token | `미정(TBD)` |
| Hover Label Token | `미정(TBD)` |
| Disabled Opacity | `Outlined / Standard` 참조 예정, 확정 필요 |
| Variant Axis | `미정(TBD)` |
| dark_bg 스펙 | `미정(TBD)` |
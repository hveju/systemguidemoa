# Typeface (서체)

DB 등록: 1차
담당자: Rhea
분류: 01. Foundation
비고: 2뎁스 정의 업데이트 필요
작업: 2026년 9월 10일 오후 2:42
작업상태: 진행 중
하위 항목: Display (https://app.notion.com/p/Display-399159291832808a8fb8c09950a9ef25?pvs=21), Heading (https://app.notion.com/p/Heading-39715929183280f78432d3516357dd53?pvs=21), Title (https://app.notion.com/p/Title-399159291832805ea625d9344b8a601f?pvs=21), Body (https://app.notion.com/p/Body-3991592918328000a618eda5461171fb?pvs=21), Label (https://app.notion.com/p/Label-3ad159291832809eb790e18e673c3e49?pvs=21), Caption (https://app.notion.com/p/Caption-3ad159291832805dab22ff2f1b9d1183?pvs=21), 백업 (https://app.notion.com/p/3d41592918328084827cf58b277cf6a4?pvs=21), ver.2.0 (https://app.notion.com/p/ver-2-0-3c31592918328008b00cf7310c0bff1d?pvs=21)

# **Typeface (서체)**

## 0. 메타

### 0.1. 분류(Category)

- `Typeface`
- `Foundation`

### 0.2. 타입 종류 (Types)

- `Display`, `Heading`, `Title`, `Body` , `Label`, `Caption`

### 0.3. 타입 별 요소 (kyeword)

- `Display`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `Heading`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `Title`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `Body`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `Label`: 사용규칙, 사용처 정의, 스펙 및 토큰
- `Caption`: 사용규칙, 사용처 정의, 스펙 및 토큰

### 0.4. Figma Node ID

---

## 1. 개요 (Overview)

### 1.1. 정의

- 공통(Common): 언어(한글/영문)와 플랫폼(`PC`, `MO`, `TB`)에 맞는 `Typography` 스펙을 적용하기 위한 공통 기준입니다. 작성 언어에 따라 `Font Family`를 선택하고, 작업 중인 뷰포트와 플랫폼에 맞는 스펙을 검증할 때 사용합니다.
- Letter Spacing: 공통 -2.5% 적용, Line Height: Font Size에 1.33을 곱하여 계산된 수치를 적용
- `Display`: 프로모션, 랜딩 페이지 등 시선을 사로잡는 가장 거대한 텍스트 영역. 전 레벨 `fontWeight 700`을 사용합니다.
- `Heading`: 화면의 핵심 타이틀 및 대단위 섹션의 제목. 전 레벨 `fontWeight 700`을 사용합니다.
- `Title`: 리스트 헤더, 카드 제목 등 중소단위 요소의 제목
- `Body`: 본문 텍스트, 설명글 등 장문의 정보 전달 영역
- `Label`: 버튼 내부 텍스트, 입력 창 캡션, 탭 메뉴 등 기능성 텍스트
- `Caption`: 이미지 캡션, 뱃지, 유의사항 등 화면 내 가장 작은 보조 정보

### 1.2. 사용처 정의

#### **`Display` 계열 (대형 임팩트 및 최상단 시선 유도)**

- 가이드 기준: 정보 전달보다 시각적 시선 유도와 임팩트가 최우선인 최상단 영역입니다. 가이드 범위 안에서 화면의 비중에 맞게 적절한 크기를 선택하여 유연하게 사용합니다.
- 적용 가이드:
    - 상위 (`Display 1~3`): 허브/메인 최상단 대표 타이틀, 대형 랜딩 화면의 핵심 키워드, 스펙 비교 및 대형 수치 강조 영역.
    - 하위 (`Display 4~6`): 안내/가이드 페이지 최상위 섹션 타이틀, 스펙 비교용 카테고리/수치 라벨, 제품명 또는 선택 화면의 주요 레이블.

#### `Heading` 계열 (섹션 및 문장형 헤드카피)

- 가이드 기준: 콘텐츠 섹션의 시작을 알리는 완결된 문장형 헤드라인 및 서브 소제목 영역입니다. 위계(`H1~H5` 성격)에 맞춰 유연하게 매핑하되, 굵기는 `700` 고정 원칙을 유지합니다.
- 적용 가이드:
    - 상위 (`Heading 1~2`): 완결된 문장형 섹션 대표 헤드카피, 대형 타이틀 아래의 보조 헤드라인 및 카드 그리드 하이라이트.
    - 하위 (`Heading 3~5`): 서브 기능 소제목, `FAQ` 보조 섹션 타이틀, 짧은 카테고리 표시 및 단계별 안내 문구.

#### **`Title` 계열 (컴포넌트 및 카드 단위 제목)**

- 가이드 기준: 개별 컴포넌트, 카드, 아코디언, 일반 섹션 영역의 독립적인 타이틀 및 캐치프레이즈입니다. 섹션 타이틀보다는 작고 본문보다는 눈에 띄어야 하는 카드/컴포넌트 단위의 제목에 폭넓게 적용합니다.
- 적용 가이드:
    - 상위 (`Title 1~2`): 카드형 컴포넌트 대표 제목, 캐치프레이즈 타이틀, 일반 섹션 영역의 대표 제목 헤더.
    - 하위 (`Title 3~5`): 개별 카드·아코디언의 서브 타이틀, 메인 타이틀 옆 보조 헤드카피, 대형 섹션 기능 소개 제목.

#### **`Body` 계열 (본문 및 서술형 정보 전달)**

- 가이드 기준: 사용자가 읽고 이해해야 하는 설명형 문단, 프로모션 티저 및 각종 유의사항·각주 영역입니다. 가독성이 중요한 모든 본문 및 서술형 텍스트는 이 계열 내에서 문단 비중에 따라 선택합니다.
- 적용 가이드:
    - 상위 (`Body 1~2`): 대형 타이틀 바로 아래 설명형 문단, 카드형 프로모션 티저 설명 문구 및 혜택 비교 리스트 상품명.
    - 중·하위 (`Body 3~5`): 이미지/영상 상세 서술(접근성 설명), 법적 유의사항 목록 및 조건부 각주, 문의처/연락처 등 부가 정보.

#### **`Label` 계열 (인터랙션 및 컴포넌트 내부 라벨)**

- 가이드 기준: 사용자의 클릭/터치 액션을 유도하는 버튼, 탭, 뱃지 등 인터랙션 컴포넌트 전용 텍스트입니다.
- 적용 가이드:
    - `Label 1`: 주요 버튼(`CTA`) 텍스트 및 비중이 큰 인터랙션 강조 텍스트.
    - `Label 2`: 표준 버튼 텍스트, 서브 탭 메뉴, 일반 뱃지 텍스트.
    - `Label 3`: 소형 뱃지 텍스트(예: `"NEW"`) 및 소형 컴포넌트 내부 라벨.

#### **`Caption` 계열 (최소 크기 보조 정보 및 면책 조항)**

- 가이드 기준: 페이지 내 최하위 우선순위의 부가 수치 정보 및 면책 조항으로, 본문이나 레이블과 명확히 구분하여 독립 운영합니다.
- 적용 가이드:
    - `Caption 1`: 면책 조항류 및 상위 레벨 부가 설명 텍스트.
    - `Caption 2`: 포인트 적립액 표기 및 단수 보조 안내 텍스트.
    - `Caption 3`: 카운트다운 단위 라벨(`"일/시간/분/초"` 등 최소 크기 보조 수치).

---

## 2. 통합 사용 규칙 및 제약 사항 (Usage Rules & Edge Cases)

### 2.1. 공통 및 언어/디바이스 규칙

#### [공통 규칙]

- `[공통][MUST]` `Figma` 로컬 스타일에 정의된 `Typography Style`을 매핑 대조군으로 우선 적용합니다.
- `[공통][MUST]` `fontSize`, `fontWeight`, `lineHeight` 값의 임의 수동 수정을 전면 금지합니다.
- `[공통][MUST]` 단일 `Viewport(Frame)` 내부에서 `PC` 스케일과 `MO` 스케일의 혼용을 금지합니다.
- `[공통][SHOULD]` 화면 레이아웃과 정보 위계(`Information Hierarchy`)에 맞춰 `Display` > `Heading` > `Title` > `Body` > `Label` / `Caption` 순서로 상하위 스타일 계열을 계층적으로 선택합니다.
- `[공통][AVOID]` `Display` 스타일을 일반 `Body`, `Card List`, `Button Label`, `Form Input` 내부에 적용하지 않습니다.
- `[공통][AVOID]` `Heading` 스타일을 `Label`, `Caption`, `Button` 텍스트에 적용하지 않습니다. 더 강조가 필요하면 `Heading` 내 상위 레벨 선택을 검토합니다.

#### [언어별 적용 규칙 (Language Axis)]

- `[공통][MUST]` `language = Korean` 조건 충족 시, `fontFamily` 검증 스펙으로 `SamsungOneKorean`을 적용합니다.
- `[공통][MUST]` `language = English` 조건 충족 시, `fontFamily` 검증 스펙으로 `SamsungSharpSans`을 적용합니다.
- `[공통][MUST]` 단일 텍스트 레이어 안에서 `fontFamily`가 혼용된 경우, 개별 글자 범위(`Character Range`)를 나누어 영문/숫자/부호는 `SamsungSharpSans`, 한글은 `SamsungOneKorean`으로 교차 검증합니다.
- `[공통][ALLOW]` 한글/영문 혼용 문장에서 브랜드명·제품명 등 영문 고유명사 영역에 한해 `SamsungSharpSans` 적용을 허용합니다.
- `[Heading][ALLOW]` 순한글로만 구성된 짧은 헤드카피는 `SamsungSharpSans`를 생략하고 `SamsungOneKorean` 단독 적용을 허용합니다. 이는 사이트 실측에서 확인된 예외 패턴입니다.
- `[공통][AVOID]` 한글 문장 전체에 `SamsungSharpSans`를 적용하거나, 영문 헤드라인 전체에 `SamsungOneKorean`을 적용하지 않습니다. (단, `Heading` 예외 규칙 제외)

#### [디바이스 및 플랫폼 규칙 (Platform Axis)]

- `[공통][MUST]` `platform = PC` 검증 시 `Width >= 1200px` 조건과 매칭하여 `PC Typography Scale`을 적용합니다.
- `[공통][MUST]` `platform = MO` 검증 시 `Width <= 800px` 조건과 매칭하여 `Mobile Typography Scale`을 적용합니다.
- `[공통][MUST]` `800px < Width < 1200px (801px~1199px)` 구간은 `platform = TB`로 선언합니다.
- `[Heading][SHOULD]` `platform = TB`의 `Heading` 계열은 `Display`/`Title`과 동일하게 "큰 폰트 계열" 그룹으로 분류하여, `PC`와 `MO`의 중간 규격을 적용하되 구체 수치는 미정(`TBD`)입니다.
- `[Label/Caption][SHOULD]` `platform = TB`의 `Label`, `Caption` 계열은 `Body`와 동일하게 `Mobile Typography Scale (MO)`을 상속하여 매핑합니다.
- `[공통][AVOID]` `MO` 화면에서 `PC` 전용 스펙을 임의 축소, `PC` 화면에서 `MO` 전용 스펙을 임의 확대하여 배치하는 것을 금지합니다.

### 2.2. 레이아웃 컴포넌트별 적용 가이드 (권장 스타일)

- `[공통][MUST]` `CTA` 및 `Button` 컴포넌트 내부 텍스트는 `Label` 계열의 사전 정의 스타일만 매핑합니다.
- `[Heading][SHOULD]` `PDP`·기획전의 섹션 최상단 카피 및 홈페이지 섹션 제목(`h2`, `h3`)은 `Heading` 계열 스타일을 적용합니다.
- `[공통][SHOULD]` `Key Visual/Hero Area`의 핵심 광고 카피는 `Display` 계열을, 개별 섹션 도입부는 `Heading` 계열을 적용하며 줄바꿈 문장은 배제합니다.
- `[공통][SHOULD]` 상세페이지 대표 메인 타이틀 영역은 `Display` 또는 `Heading` 계열을, 섹션 제목 영역은 `Heading` 또는 `Title` 계열을 적용합니다.
- `[Body][SHOULD]` `Legal`, `Footer`, `Disclaimer`, 이미지 보조 캡션 영역은 `Body 4`, `Body 5` 계열을 적용합니다. `MO` 환경은 `Body 5`가 정의되어 있지 않으므로 `Body 4`까지만 적용합니다.
- `[Label][SHOULD]` 뱃지(`Badge`, 예: `"NEW"`)는 `Label` 계열 하위 레벨(소형)을 적용합니다.
- `[Label][SHOULD]` 탭(`Tab`)의 강조 텍스트는 `Label` 계열을 적용합니다.
- `[공통][SHOULD]` `Product List`의 상품명 영역은 `Title` 계열 혹은 상위 `Body 1`, `Body 2`를, 가격/스펙/보조 정보는 `Body` 계열을 적용합니다.
- `[공통][AVOID]` `Product List`, `Card Grid`, `Table` 내부 데이터 영역에 `Display`, `Heading` 계열 적용을 금지합니다.
- `[Caption][SHOULD]` 카운트다운 단위 라벨, 포인트 적립액 등 부가 수치 정보는 `Caption` 계열을 적용합니다.

### 2.3. 서체 그룹별 굵기(fontWeight) 검증 예외 처리 규칙

- `[공통][MUST]` `Display 1~6`, `Heading 1~5`, `Title 1`은 예외 없이 엄격 검증(`fontWeight = 700` 고정)합니다. 데이터 누락/판독 불가 시에도 자동 보정을 적용하지 않고 `Error` 처리 후 재실측을 요청합니다.
- `[공통][ALLOW]` 그 외 모든 레벨 — `Title 2~5`, `Body 1~5`, `Label 1~3`, `Caption 1~3` — 은 `700`/`400` 복수 지원이 확정된 레벨이므로, `fontWeight` 데이터 누락/판독 불가에 한해 기본값 `Regular(400)`로 자동 전환하며 이는 `Error`가 아닌 `Pass` 처리합니다.
- `[공통][MUST]` 실제 적용 굵기가 `700`인지 `400`인지는 `3.1(한글)`·`3.2(영문)` 표의 개별 값을 대조군으로 검증하며, 위계나 역할에 따라 임의로 혼용하지 않습니다.

### 2.4. 정보 누락 및 예외 보정 프로세스 / Fallback 프로세스

- `[공통][MUST]` `Figma` 레이어의 타이포그래피 스타일이 스케일 정의 범위를 초과한 비정형 데이터인 경우, 검증 결과를 `N/A` 또는 신규 정의 필요로 처리합니다.
- `[공통][MUST]` 외부 DB(`Notion`, `Figma API` 등) 연동 실패 시, 본 요약 가이드 기반 응답 + `"최신 라이브러리 스펙과 다를 수 있음"` 고지.
- `[공통][SHOULD]` `language` 필드 누락 시 한글 1글자 이상 포함 → `Korean` 자동 판정, 순수 영문/숫자/부호 → `English` 자동 판정.
- `[공통][ALLOW]` 브랜드 로고 그래픽, 래스터화 텍스트, 캠페인 전용 특수 그래픽 타이포는 검증 범위에서 배제(`Bypass`).
- `[공통][MUST]` `lineHeight` 자동 계산 시 '대형 사이즈'의 기준은 `fontSize 36px` 이상으로 정의하며, 이 구간은 `x1.2` 배율을 적용합니다.
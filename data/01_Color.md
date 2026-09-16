# Color (색상)

DB 등록: 1차
담당자: semi
분류: 01. Foundation
작업: 2026년 9월 16일 오후 5:14
작업상태: 진행 중
하위 항목: Primary Color (https://app.notion.com/p/Primary-Color-3981592918328061a90fe60615a6f12a?pvs=21), Secondary Color (https://app.notion.com/p/Secondary-Color-39815929183280029da6e1518e68fedf?pvs=21), Grayscale (https://app.notion.com/p/Grayscale-3981592918328044a673e7cc430308e4?pvs=21), Neutral Color (https://app.notion.com/p/Neutral-Color-398159291832808bb835ec1aa700ae82?pvs=21), Theme (https://app.notion.com/p/Theme-3981592918328018b333d4813df1ac32?pvs=21)

# Colors (컬러)

## 0. 메타

- **분류(Category)**: Foundation / Colors — Primary·Secondary·Grayscale·Neutral·Theme·Alpha·States·컬러 확장 규칙을 한 페이지로 통합
- **타입 종류(Types)**: `Primary`, `Secondary`, `Grayscale`, `Neutral`, `Theme`, `Alpha`, `States`, `Event Extension(컬러 확장 규칙)`
- **Figma Node ID**: `18403:36225` (foundation / color 최상위 프레임)

---

## 1. 개요

### 1.1. 정의

- Colors DB는 디자인 시스템에서 쓰는 색상 체계 전체를 정의한다.
- `Primary` / `Secondary` / `Grayscale` / `Neutral` 4개 색상 그룹, 라이트·다크 배경 대비 규칙(`Theme`), 투명도 조합(`Alpha`), 상태별 컬러(`States`), 기획전/시즌용 신규 컬러 확장 규칙까지 전부 포함한다.

### 1.2. 적용 상황

- 브랜드 핵심 액션(주요 버튼, 로고 등)에 쓸 색이 필요할 때 → `Primary`
- 텍스트 위계(타이틀/본문/보조/비활성)를 정할 때 → `Grayscale`
- 브랜드 아이덴티티를 보강하고 싶을 때(스카이블루와 조합) → `Secondary`(Orange/Sea Blue/Teal)
- 배경·카드 표면에 은은한 톤이 필요할 때 → `Neutral`
- 특정 영역 배경이 어둡거나 밝을 때 그 위 텍스트 컬러를 정할 때 → `Theme`
- 반투명 배경/오버레이가 필요할 때 → `Alpha`
- 에러·성공·선택·비활성화 등 상태를 표현할 때 → `States`
- 기획전/시즌용으로 새 컬러가 필요할 때 → `컬러 확장 규칙`

---

## 2. 사용 규칙 (Usage Rules)

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[ALLOW]`: 예외 허용 · `[AVOID]`: 금지
> 

### 2.1. 공통 규칙

- `[MUST]` 컬러는 `Hex`를 직접 입력하지 않고, 정의된 `피그마 경로`/`코드 토큰명`을 우선 참조한다.
- `[MUST]` `Primary`/`Secondary`/`Grayscale`/`Neutral` 컬러를 서로 대체해서 쓰지 않는다 (예: Grayscale 대신 Neutral을 텍스트 컬러로 사용 금지).
- `[MUST]` Figma에 정의된 컬러 스타일을 우선 사용하며, `hex` 값을 임의로 수정하지 않는다.
- `[MUST]` `opacity`는 `5/10/20/30/40/50/60/70/80/90` 중 하나만 사용한다. 그 외 값은 해당 없음(N/A)으로 안내한다.
- `[SHOULD]` 컬러는 화면 내 역할(브랜드 강조/보조 강조/텍스트-배경 위계/배경 톤)에 따라 그룹을 선택한다.
- `[SHOULD]` `colorGroup`, `theme`, `opacity` 등 조건이 불명확하면 답하기 전에 되묻는다.
- `[AVOID]` 강조를 위해 `Secondary Color`를 본문 텍스트의 기본 컬러로 사용하지 않는다.
- `[AVOID]` 상태(경고/에러/성공/활성화/비활성화)나 신규 컬러가 필요할 때 임의로 새 컬러를 만들지 않고, 이 문서의 `States`/`컬러 확장 규칙`을 먼저 확인한다.

### 2.2. Type 선택 규칙

- `[MUST]` 브랜드 핵심 액션(주요 버튼, 로고 컬러 등)에는 `Primary`를 사용한다.
- `[MUST]` 텍스트 위계는 `Grayscale`을 기준으로 한다.
- `[SHOULD]` 브랜드 아이덴티티 보강이 필요할 때만 `Secondary`의 Orange/Sea Blue/Teal을 검토한다 (아래 2.3 Type=Secondary 참고).
- `[SHOULD]` 배경/카드 표면에 은은한 톤이 필요하면 `Neutral`을 검토한다.
- `[SHOULD]` 특정 영역 배경이 어둡거나 밝으면 `Type=Theme` 규칙을 확인한다.
- `[SHOULD]` 반투명이 필요하면 `Type=Alpha` 공식을 확인한다.

### 2.3. Type=Primary 규칙

- `[MUST]` 브랜드 핵심 액션(주요 버튼, 로고 컬러 등)에 사용한다.
- `[ALLOW]` `Skyblue`(베이스)는 카드 등의 **배경색**으로도 사용된다 — 브랜드 액션 전용이 아니다.

### 2.4. Type=Secondary 규칙

- `[SHOULD]` 브랜드 아이덴티티 보강(스카이블루와 조합)이 필요할 때만 사용한다.
- `[ALLOW]` `Teal`은 가격 할인율 퍼센티지(%), '추천' 등 정보성 태그의 텍스트 컬러로도 사용 가능하다.
- `[ALLOW]` `Coral`은 경고/오류 상태 컬러로도 사용 가능하다 (`States` 4.1 참고).
- `[ALLOW]` `Orange Dark`/`Teal Dark`는 텍스트 시인성 확보 목적으로 사용할 수 있다.

### 2.5. Type=Grayscale 규칙

- `[MUST]` 텍스트/배경/구분선 위계 전체를 Grayscale 10단계로 관리한다.
- `[AVOID]` 어두운 배경(`#313131` 등, 예: Snackbar) 위에서 명도 대비가 부족한 `Grayscale 70(#555555)` 이하를 본문 텍스트로 사용하지 않는다.

### 2.6. Type=Neutral 규칙

- `[SHOULD]` 배경·카드 표면 등 넓은 면적에 사용하며, 텍스트 컬러로는 비권장이다.

### 2.7. Type=Theme 규칙 (라이트/다크 배경 대비)

> 다크모드는 글로벌에서 앱 전체로 자주 쓰이지만 KR에서는 거의 쓰지 않아, 이 문서에서도 "특정 영역 배경이 어두운 경우 텍스트 컬러를 고르는" 최소 기준만 정의한다.
> 
- `[MUST]` 라이트 배경에서 텍스트 컬러가 필요하면 각 컬러의 `Dark` 계열(`Skyblue Dark`, `Coral Dark`)을 사용한다.
- `[MUST]` 다크 배경(앱 전체든 특정 섹션이든)에서 텍스트 컬러가 필요하면 각 컬러의 `Light` 계열(`Skyblue Light`, `Coral Light`)을 사용한다.
- `[SHOULD]` KR에서는 앱 전체 다크모드보다 특정 영역(카드/배너/섹션)의 배경만 어두운 경우에 적용하는 게 일반적이다.
- `[AVOID]` `color-theme-white`/`color-theme-black`(3.6 참고, 앱 전체 바탕면/전경 역할)을 KR 서비스의 전체 테마 전환 목적으로 그대로 적용하지 않는다 — Global 전용 패턴에 가깝다.

### 2.8. Type=Alpha 규칙 (투명도)

- 피그마 경로 공식: `Colors/Alpha/{컬러명}/Opacity/{수치}` (예: `Colors/Alpha/Black/Opacity/20`)
- 코드 토큰명 공식: `color-alpha-{컬러명}-opacity-{수치}`
- `[MUST]` 허용 수치는 `5/10/20/30/40/50/60/70/80/90` 뿐이다.
- `[MUST]` 배경(면)에 알파를 적용하면, 같은 요소의 텍스트/아이콘도 동일 `opacity`로 매칭한다.
- `[ALLOW]` `Input` 컴포넌트의 비활성 테두리는 알파 대신 `Grayscale/20` 고정값을 사용할 수 있다 (`States` 참고).

### 2.9. Type=컬러 확장 규칙 (기획전/시즌 신규 컬러)

- `[SHOULD]` 신규 Key Color는 메인/서브 합쳐 최대 1~2개로 시작한다.
- `[MUST]` 메인 컬러보다 밝은 톤이 필요하면 신규 Hex 대신 메인 컬러 + `Opacity(5~90)` 조합을 사용한다.
- `[MUST]` 메인 컬러보다 어두운 톤(호버, 가독성 등)이 필요하면 메인 컬러 + `Colors/Alpha/Black/Opacity(5~90)` 오버레이를 사용한다.
- `[ALLOW]` 위 조합 적용 후에도 색감이 탁해지거나 가독성 명도 기준을 못 채우면, 실무자 판단으로 신규 Hex를 추가할 수 있다 (사유 기록).
- `[AVOID]` 단순 변심·미세한 톤 차이만으로 신규 Hex를 추가하지 않는다.
- `[MUST]` 테마가 바뀌어도 구분선/그림자/본문·타이틀 텍스트는 기존 `Grayscale` 토큰을 그대로 재사용한다.
- `[ALLOW]` 화려한 배경 때문에 기존 Grayscale 텍스트가 가독성 명도 기준에 못 미치면, `White` 또는 신규 텍스트 전용 Hex를 예외적으로 매칭할 수 있다 (가독성 목적 한정).
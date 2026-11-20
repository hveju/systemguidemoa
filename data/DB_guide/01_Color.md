# 01_Color (색상)

DB 등록: 1차
담당자: semi
분류: 01. Foundation
작업: 2026년 11월 19일 오후 2:34
작업상태: 1차 완료
하위 항목: Primary Color (Primary%20Color%203981592918328061a90fe60615a6f12a.md), Secondary Color (Secondary%20Color%2039815929183280029da6e1518e68fedf.md), Grayscale (Grayscale%203981592918328044a673e7cc430308e4.md), Neutral Color (Neutral%20Color%20398159291832808bb835ec1aa700ae82.md), Theme (Theme%2040015929183280acae03cf21ef5a2d78.md), Accent (Accent%2041b15929183280c5a497c6a256e5a403.md)

# Colors (컬러)

## 0. 메타

### 0.1. 분류

- category: `Colors`
- group: `Foundation`

### 0.2. 타입 목록

- `Primary Color`
- `Secondary Color`
- `Grayscale`
- `Neutral Color`
- `Theme`
- `Accent`

### 0.3. 검색 키워드

- `Primary Color` : `Primary`, `Skyblue`, `브랜드 컬러`, `핵심 컬러`, `주요 액션`, `버튼`, `로고`
- `Secondary Color` : `Secondary`, `Coral`, `Orange`, `Sea Blue`, `Teal`, `보조 컬러`, `강조 컬러`, `정보성 태그`
- `Grayscale` : `그레이스케일`, `회색`, `텍스트`, `명도`, `구분선`, `비활성`, `텍스트 위계`
- `Neutral Color` : `Neutral`, `뉴트럴`, `배경색`, `카드 배경`, `표면 컬러`
- `Theme` : `라이트`, `다크`, `Light`, `Dark`, `배경 대비`, `명도 대비`, `텍스트 가독성`, `테마`
- `Accent` : `Accent`, `Rating_star`, `상품평`, `리뷰`, `별점`, `별 아이콘`, `별점 컬러`, `#FFAA4E`

## 1. 개요

### 1.1. 정의

- Colors: 디자인 시스템 전반에 적용되는 색상 체계로, 브랜드 아이덴티티와 UI 요소의 시각적 일관성을 유지하기 위한 기준입니다. `Primary Color`, `Secondary Color`, `Grayscale`, `Neutral Color`, `Accent`의 5개 색상 그룹을 중심으로 구성됩니다.
- 확장 및 적용 기준: 배경에 따른 명도 대비(`Theme`), 투명도(`Alpha`), 의미 및 상태별 컬러(`Semantic Color`, `States`), 기획전·시즌별 신규 컬러 확장 규칙을 함께 정의합니다.

### 1.2. 적용 상황

- 브랜드 아이덴티티와 UI 요소의 역할에 따라 적절한 컬러를 선택하고, 주요 액션 및 정보를 시각적으로 구분할 때 적용합니다.
- 텍스트·배경·구분선 등의 명도와 위계를 설정하고, 배경에 따른 가독성과 명도 대비를 확보할 때 적용합니다.
- 상태별 컬러와 투명도를 일관되게 사용하거나, 기획전·시즌 등 새로운 테마에 맞춰 컬러를 확장할 때 적용합니다.

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
    
    content: 컬러는 정의된 `Figma 스타일` 또는 `코드 토큰명`을 참조하여 사용하며, `Hex` 값을 임의로 수정하지 않습니다.
    
- status: MUST
    
    content: `Primary Color`, `Secondary Color`, `Grayscale`, `Neutral Color`, `Accent`는 각 그룹의 역할과 목적에 맞게 사용하며, 서로 대체하지 않습니다.
    
- status: MUST
    
    content: 컬러는 정의된 의미와 역할에 따라 사용하며, 긍정·부정 등 서로 다른 상태를 표현하는 컬러를 임의로 혼용하지 않습니다.
    
- status: SHOULD
    
    content: 브랜드 강조, 텍스트·배경 위계, 상태 표현 등 화면 내 역할을 기준으로 적합한 컬러 그룹을 선택합니다.
    
- status: SHOULD
    
    content: `Color Group`, `Theme`, `Opacity` 등 적용 조건이 명확하지 않은 경우, 사용 목적과 배경 조건을 먼저 확인합니다.
    
- status: AVOID
    
    content: 강조 목적으로 `Secondary Color`를 일반 본문 텍스트의 기본 컬러로 사용하지 않습니다.
    
- status: AVOID
    
    content: 상태 표현이나 신규 컬러가 필요한 경우 임의로 색상을 추가하지 않고, 기존 `States` 및 `컬러 확장 규칙`을 우선 확인합니다.
    

### 2.2. 타입 선택 기준

- Primary Color: 브랜드의 핵심 아이덴티티를 표현하거나 주요 액션을 강조해야 하는 경우 선택합니다.
- Secondary Color: 브랜드 아이덴티티를 보강하며, `Primary Color`와의 조화를 유지하면서 보조 강조나 정보성 요소를 표현해야 하는 경우 선택합니다.
- Grayscale: 텍스트·배경·구분선 등의 명도 차이와 시각적 위계를 설정해야 하는 경우 선택합니다.
- Neutral Color: 배경이나 카드 표면에 은은한 컬러를 적용해야 하는 경우 선택합니다.
- Theme: 배경의 밝기에 따라 텍스트 컬러의 명도 대비를 조정해야 하는 경우 선택합니다.
- Accent: 상품평 별점에만 사용하는 전용 색상입니다.

Accent는 상품평 별점에만 사용하는
전용 색상이에요.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Primary Color

- status: MUST
    
    content: `Primary Color`는 주요 버튼·로고 등 브랜드의 핵심 요소와 주요 액션에 사용합니다.
    
- status: ALLOW
    
    content: 기본 컬러인 `Skyblue`는 주요 액션뿐 아니라 UI 요소(CTA, badge, Stroke)의 색으로도 사용할 수 있습니다.
    
- status: MUST
    
    content: `Skyblue` 계열은 브랜드의 핵심 컬러이자 긍정·성공 상태를 표현하는 컬러로 사용하며, 배경의 밝기에 따라 적합한 컬러를 선택합니다.
    

#### 2.3.2. Type: Secondary Color

- status: SHOULD
    
    content: `Secondary Color`는 `Skyblue`와의 조화 및 브랜드 아이덴티티 보강이 필요한 경우 사용합니다.
    
- status: ALLOW
    
    content: `Teal`은 할인율(%)이나 추천 등 정보성 태그의 텍스트 컬러로 사용할 수 있습니다.
    
- status: MUST
    
    content: `Coral` 계열은 경고·오류 등 부정적인 상태를 표현하는 용도로 사용하며, 배경의 밝기에 따라 적합한 컬러를 선택합니다.
    
- status: ALLOW
    
    content: `Orange Dark`, `Teal Dark`는 텍스트의 시인성과 명도 대비를 확보하기 위한 목적으로 사용할 수 있습니다.
    

#### 2.3.3. Type: Grayscale

- status: MUST
    
    content: 텍스트·배경·구분선의 시각적 위계는 정의된 `Grayscale` 10단계를 기준으로 관리합니다.
    
- status: ALLOW
    
    content: 화면에 밝은 회색 배경을 적용할 때 `#F7F7F7`을 사용할 수 있습니다.
    
- status: AVOID
    
    content: `Snackbar` 등 어두운 배경(`#313131`)에서는 명도 대비가 부족한 `Grayscale 70(#555555)` 이하의 어두운 컬러를 본문 텍스트에 사용하지 않습니다.
    

#### 2.3.4. Type: Neutral Color

- status: SHOULD
    
    content: `Neutral Color`는 배경·카드 표면 등 넓은 영역에 은은한 색상을 적용할 때 사용하며, 텍스트 컬러로는 사용을 권장하지 않습니다.
    

#### 2.3.5. Type: Theme

- `Theme`는 배경의 밝기에 따라 적합한 텍스트 컬러를 선택하여 가독성을 확보하기 위한 기준입니다. KR 서비스에서는 앱 전체 다크모드보다 특정 카드·배너·섹션의 배경 대비를 중심으로 적용합니다.
- status: MUST
    
    content: 라이트 배경에서는 각 컬러의 `Dark` 계열(`Skyblue Dark`, `Coral Dark`)을 텍스트 컬러로 사용합니다.
    
- status: MUST
    
    content: 다크 배경에서는 각 컬러의 `Light` 계열(`Skyblue Light`, `Coral Light`)을 텍스트 컬러로 사용합니다.
    
- status: MUST
    
    content: 일반 텍스트는 배경과 `4.5:1` 이상의 명도 대비를 확보하며, 적용된 배경색을 기준으로 가독성을 확인합니다.
    
- status: SHOULD
    
    content: KR 서비스에서는 앱 전체 테마 전환보다 특정 영역의 배경 밝기에 따라 적합한 텍스트 컬러를 적용합니다.
    
- status: AVOID
    
    content: `color-theme-white`, `color-theme-black`은 글로벌 서비스의 전체 테마 전환에 가까운 토큰으로, KR 서비스의 전체 테마 전환 목적으로 그대로 적용하지 않습니다.
    

#### 2.3.6. Type: Accent

- status: MUST
    
    content: 상품평의 별점 아이콘에는 `Accent`의 `Rating_star` 컬러(`#FFAA4E`)를 사용합니다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. 투명도 적용 규칙 (Alpha)

- status: MUST
    
    content: 컬러에 `Opacity` 를 적용할 때는 `10`, `15`, `20`, `30`, `40`, `50`, `60`, `70`, `80`, `90`의 10단계만 사용하며, 정의되지 않은 수치는 적용하지 않습니다.
    
- status: MUST
    
    content: `Dimmed`와 `Shadow`의 `Opacity`는 `Dimmed & Shadow` 가이드에 정의된 공식 스타일 값을 따릅니다.
    

#### 2.4.2. 컬러 확장 규칙 (Event Extension)

- status: SHOULD
    
    content: 기획전·시즌용 신규 `Key Color`는 메인과 서브를 포함하여 최대 1~2개로 구성하는 것을 권장합니다.
    
- status: MUST
    
    content: 메인 컬러보다 밝은 톤이 필요한 경우, 신규 `Hex`를 추가하기보다 메인 컬러에 `Opacity(10~90)`를 적용합니다.
    
- status: MUST
    
    content: 메인 컬러보다 어두운 톤이 필요한 경우, 메인 컬러 위에 `Colors/Alpha/Black/Opacity(10~90)`을 적용하여 표현합니다.
    
- status: ALLOW
    
    content: 투명도 조합만으로 색감이나 가독성을 확보하기 어려운 경우, 적용 사유를 기록한 후 신규 `Hex`를 추가할 수 있습니다.
    
- status: AVOID
    
    content: 단순한 색상 선호나 미세한 톤 차이를 이유로 신규 `Hex`를 추가하지 않습니다.
    
- status: MUST
    
    content: 신규 테마를 적용하더라도 구분선·그림자·본문·타이틀 텍스트는 기존 `Grayscale` 토큰을 우선 재사용합니다.
    
- status: ALLOW
    
    content: 배경색으로 인해 기존 `Grayscale`의 가독성이 확보되지 않는 경우, `White` 또는 신규 텍스트 전용 `Hex`를 예외적으로 적용할 수 있습니다. 단, 가독성 확보 목적으로만 허용합니다.
    

#### 2.4.3. Semantic Color 사용 규칙

- status: MUST
    
    content: `Semantic Color`는 색상별로 정의된 의미에 따라 사용하며, 긍정·부정 상태를 임의의 컬러로 표현하지 않습니다.
    
- status: MUST
    
    content: 라이트 배경에서 긍정·성공 상태는 `Skyblue Dark`를, 부정·오류 상태는 `Coral Dark`를 사용합니다.
    
- status: SHOULD
    
    content: 다크 배경에서는 동일한 의미를 유지하되, 각 컬러의 `Light` 계열을 우선 검토하고 명도 대비를 확인합니다.
    
- status: AVOID
    
    content: 오류 상태에 `Skyblue` 계열을 사용하는 등 컬러의 의미와 실제 상태가 일치하지 않는 표현은 사용하지 않습니다.
    

### 2.5. 내부 운영 규칙

- status: SHOULD
    
    content: 타이틀과 서브텍스트는 밝은 배경에서 `Black(#000000)`, 어두운 배경에서 `White(#FFFFFF)`를 기본으로 사용합니다.
    
- status: ALLOW
    
    content: 타이틀과 서브텍스트의 위계를 컬러로 구분할 필요가 있는 경우, 밝은 배경에서는 서브텍스트에 `Grayscale 70(#555555)`을 사용할 수 있습니다. 어두운 배경에서는 실제 배경과 `4.5:1` 이상의 명도 대비를 충족하는 기존 `Grayscale` 컬러를 사용할 수 있습니다.
    
- status: SHOULD
    
    content: 밝은 배경의 디스클레이머에는 `Grayscale 70(#555555)`을 기본으로 사용합니다. `Black(#000000)` 배경의 유의사항 영역에서는 강조 타이틀에 `White(#FFFFFF)`, 본문에 `#AAAAAA`를 사용합니다.
    
- status: MUST
    
    content: 텍스트 색상은 실제 적용 배경과 `4.5:1` 이상의 명도 대비를 확보합니다.
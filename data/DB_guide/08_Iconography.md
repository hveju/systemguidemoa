# 08_Iconography (아이콘)

DB 등록: 2차
담당자: semi
분류: 01. Foundation
작업: 2026년 11월 19일 오후 2:46
작업상태: 1차 완료
하위 항목: Bold (Bold%2040715929183280e6972ad06759855706.md), Regular (Regular%2040715929183280a8b5a3ffdc27ef5767.md), Light (Light%2040715929183280a694c5eb3d7f7a3f8d.md)

# Iconography (아이콘)

## 0. 메타

### 0.1. 분류

- category: `Iconography`
- group: `Foundation`

### 0.2. 타입 목록

- `Bold`
- `Regular`
- `Light`

### 0.3. 검색 키워드

- `Bold` : `Bold Type`, `굵은 아이콘`, `Exterior Stroke`, `Interior Stroke`, `12×12`, `16×16`, `24×24`, `GNB`
- `Regular` : `Regular Type`, `기본 아이콘`, `Exterior Stroke`, `Interior Stroke`, `24×24`, `36×36`, `48×48`
- `Light` : `Light Type`, `얇은 아이콘`, `Exterior Stroke`, `Interior Stroke`, `64×64`, `72×72`, `96×96`

## 1. 개요

### 1.1. 정의

- Iconography: 디자인 시스템에서 사용하는 아이콘의 제작·명명·사용 규칙을 정의하여 시각적·기능적 일관성을 유지하기 위한 가이드입니다.
- 구성 기준: 아이콘의 굵기와 크기(`Bold`, `Regular`, `Light`)를 중심으로 제작(`Creation`), 명명(`Naming`), 그리드·키라인, 아이콘 구조(`Anatomy`), 스트로크·모서리·각도, 텍스트 정렬, 브랜드 로고 및 여백 기준을 포함합니다.

### 1.2. 적용 상황

- UI 요소의 크기와 역할에 따라 적절한 아이콘의 굵기와 스타일을 선택할 때 적용합니다.
- 아이콘 제작 시 그리드·키라인을 기준으로 형태와 비율을 설정하고, 스트로크·모서리·각도 등의 세부 표현을 정의할 때 적용합니다.
- 동일한 역할의 아이콘에 일관된 제작 및 사용 기준을 적용하여 화면의 시각적 통일성을 유지할 때 적용합니다.

## 2. 사용 규칙

### 2.1. 공통 규칙

- status: MUST
    
    content: 아이콘은 `96×96px` 아트보드를 기준으로 제작하여 정렬과 확장성을 유지합니다.
    
- status: MUST
    
    content: 아이콘 제작 시 정의된 `Stroke Weight`, `Stroke Terminal`, `Corners`, `Angle` 기준을 일관되게 적용합니다.
    
- status: MUST
    
    content: 아이콘은 아웃라인으로 변환하여 형태 왜곡을 방지하고, `96×96px` 프레임 내에서 `SVG` 형식으로 추출합니다.
    
- status: MUST
    
    content: 아이콘은 외부 사용 전 디자인 시스템 팀의 리뷰를 거쳐야 합니다.
    
- status: MUST
    
    content: 아이콘은 사용 환경에 맞는 `Bold`, `Regular`, `Light` 타입을 선택하고, 각 타입에 정의된 크기 규격을 준수합니다.
    
- status: AVOID
    
    content: 동일한 아이콘 그룹 내에서 서로 다른 `Stroke Type`을 혼용하지 않습니다.
    

### 2.2. 타입 선택 기준

- `Bold` : UI 적용 크기는 `12×12px`, `16×16px`, `24×24px`입니다. 작은 크기에서도 형태를 명확히 표현해야 할 때 선택합니다. `24×24px`의 `Bold`는 `GNB` 영역에서만 사용합니다.
- `Regular` : UI 적용 크기는 `24×24px`, `36×36px`, `48×48px`입니다. 일반적인 UI 요소에 균형 잡힌 굵기가 필요할 때 선택합니다.
- `Light` : UI 적용 크기는 `64×64px`, `72×72px`, `96×96px`입니다. 큰 크기에서 가벼운 형태를 표현해야 할 때 선택합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Bold

- Exterior Stroke: `8px`
- Interior Stroke: `7px` / `7.5px`
- Size Variation: `12×12px`, `16×16px`, `24×24px`

#### 2.3.2. Type: Regular

- Exterior Stroke: `5px`
- Interior Stroke: `4px` / `4.5px`
- Size Variation: `24×24px`, `36×36px`, `48×48px`

#### 2.3.3. Type: Light

- Exterior Stroke: `3px`
- Interior Stroke: `3px`
- Size Variation: `64×64px`, `72×72px`, `96×96px`

### 2.4. 세부 적용 규칙

#### 2.4.1. Naming

- status: MUST
    
    content: 아이콘 이름은 공백 없이 `camelCase` 형식으로 작성합니다. (예: `ShippingHelp`)
    
- status: MUST
    
    content: 아이콘의 상태 또는 `Variant`를 구분해야 하는 경우, 언더스코어(`_`) 뒤에 상태명을 추가합니다. (예: `Shipping_Active`)
    

#### 2.4.2. Icon Size and Grid

- status: MUST
    
    content: 아이콘 제작에는 `96×96px` 그리드를 사용하며, 확대 비율(`100%`, `300%`)과 관계없이 동일한 그리드·키라인 비율을 유지합니다.
    
- status: MUST
content: 제작 단계에서 아이콘의 크기와 정렬은 정의된 `Grid` 및 `Keyline`을 기준으로 설정합니다.

#### 2.4.3. Keyline Shapes

- status: MUST
    
    content: 아이콘은 기본 형태에 따라 정의된 `Keyline Shapes`의 크기와 비율을 준수합니다.
    
- status: MUST
    
    content: 키라인의 테두리는 `Borders Align: Center`를 기준으로 중앙 정렬합니다.
    

Keyline Shapes 기준

- `Square` : `82×82px`
- `Circle` : `86×86px`
- `Vertical Rectangle` : `66×86px` (W×H)
- `Horizontal Rectangle` : `88×60px` (W×H)

#### 2.4.4. Anatomy

아이콘을 구성하는 요소의 명칭과 역할을 구분하기 위한 공통 용어입니다.

- `Exterior Stroke` : 아이콘의 외곽 형태를 구성하는 선
- `Interior Stroke` : 아이콘 내부의 형태나 세부 요소를 표현하는 선
- `Exterior Stroke Terminal` : 외곽선이 끝나는 지점
- `Interior Stroke Terminal` : 내부선이 끝나는 지점
- `Corner` : 선이나 도형이 만나는 모서리
- `Fill` : 도형 내부를 채우는 면
- `Counter` : 도형 내부에 형성된 빈 공간
- `Gap` : 선과 선 또는 도형 사이의 간격

#### 2.4.5. Stroke Weight

- status: MUST
    
    content: 아이콘의 외곽선(`Exterior Stroke`)과 내부선(`Interior Stroke`)은 각 `Stroke Type`에 정의된 굵기 기준을 적용합니다.
    
- status: MUST
    
    content: 외곽선과 내부선의 굵기는 시각적 균형을 고려하여 구분하며, 정의된 규격을 임의로 변경하지 않습니다.
    

Stroke Weight 적용 예시

- `Regular` : `Exterior Stroke 5px` / `Interior Stroke 4px`

#### 2.4.6. Stroke Terminal

- status: MUST
    
    content: 열린 도형(`Open Shape`)의 스트로크 끝단은 `Butt Cap`을 기본으로 사용합니다.
    
- status: ALLOW
    
    content: 얼굴 표정·인체·원형 등 부드러운 형태 표현이 필요한 경우 `Round Cap`을 예외적으로 사용할 수 있습니다.
    

#### 2.4.7. Corners

- status: MUST
    
    content: 아이콘의 모서리는 `Miter Join`을 기본으로 하며, `Corner Radius`는 `1px`을 적용합니다.
    
- status: ALLOW
    
    content: `Arrow`, `Time`, `Check`, `Door`, 작은 사각형 및 `Zigzag Line`은 `Miter Join`을 유지하면서 `Corner Radius 0px`을 적용할 수 있습니다.
    

#### 2.4.8. Angle

- status: MUST
    
    content: 대각선은 `45°`를 기본으로 사용하며, 정밀한 각도 조정이 필요한 경우 `5°` 단위로 조정할 수 있습니다.
    
- status: MUST
    
    content: `Off`, `Inactive`, `Rejected`, `Prohibited` 등 부정적 상태는 `135°(-45°)` 방향의 메타포로 표현합니다.
    
- status: MUST
    
    content: 화살표 머리(`Arrowhead`)는 `45°` 단위로 각도를 설정합니다.
    
- status: MUST
    
    content: 시계 아이콘의 시침·분침은 `3시 방향(90°)`을 기본으로 표현합니다.
    
- status: ALLOW
    
    content: 보조 메타포와 시각적으로 겹치는 경우 `9시 방향(270°)`을 예외적으로 사용할 수 있습니다.
    

#### 2.4.9. Typeface Align

- status: MUST
    
    content: 텍스트로만 구성된 아이콘은 `Text Only – Center Align`을 기준으로 중앙 정렬합니다.
    
- status: MUST
    
    content: 아이콘 내부에 텍스트가 포함된 경우 `Inside – Center Align`을 기준으로 중앙 정렬합니다.
    
- status: SHOULD
    
    content: 아이콘 하단에 텍스트가 배치되는 경우, 사용 목적에 따라 `Bottom – Center Align` 또는 `Bottom – Right Align`을 선택합니다.
    

정렬 방식 예시

- `Text Only – Center Align` : 텍스트로만 구성된 경우
- `Inside – Center Align` : 아이콘 내부에 텍스트가 포함된 경우
- `Bottom – Center Align` : `FREE` 등 하단 중앙 정렬
- `Bottom – Right Align` : `OFF` 등 하단 우측 정렬

#### 2.4.10. Logo

- status: MUST

content: 브랜드 로고는 해당 브랜드에서 제공하는 공식 로고 파일을 사용하며, 임의로 재제작하거나 형태를 변경하지 않습니다.

#### 2.4.11. Spaces

- status: MUST
    
    content: `24px` 아이콘은 최소 `40px`의 터치 타겟 영역을 확보합니다.
    
- status: MUST
    
    content: 아이콘 주변에는 `Clearance Area`를 확보하여 다른 UI 요소와 시각적으로 겹치지 않도록 합니다.
    
- status: SHOULD
    
    content: 여러 아이콘을 나란히 배치하는 경우, 터치 타겟 영역과 주변 요소의 간격을 고려하여 일관된 배치를 유지합니다.
    

#### 2.4.12. Stroke Type 사용 시 유의사항

- status: MUST

content: `24×24px` 아이콘에 `Bold` 타입을 적용하는 경우, `GNB` 영역에서만 사용합니다.

### 2.5. 내부 운영 규칙

- status: SHOULD
- content: 화면에 아이콘을 배치할 때는 `2.2. 타입 선택 기준`에 정의된 UI 적용 크기를 우선 사용합니다. 정의된 크기로 배치하기 어려운 경우에는 4px 배수의 크기를 우선 적용합니다.
- status: ALLOW
- content: 레이아웃 제약으로 4px 배수의 크기를 적용하기 어려운 경우, `18×18px`, `22×22px` 등 다른 짝수 크기를 사용할 수 있습니다.
- status: SHOULD
- content: 아이콘은 `Black(#000000)`을 기본으로 사용하며, 텍스트와 함께 사용하는 경우에는 해당 텍스트의 컬러에 맞춰 적용합니다.
- status: SHOULD
- content: 한 페이지에서 사용하는 3D 아이콘은 재질, 색감, 시점, 조명 등 표현 스타일을 일관되게 유지합니다.
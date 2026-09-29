# Option Selector (옵션 선택)

DB 등록: 2차
담당자: Lani
분류: 02. Element
작업: 2026년 9월 14일 오후 1:59
작업상태: 진행 중
하위 항목: Color (https://app.notion.com/p/Color-3ba15929183280828f7ae9e6719a03dc?pvs=21), Image (https://app.notion.com/p/Image-3ba159291832802a8cc6fcf8bb0e4a67?pvs=21), Label  (https://app.notion.com/p/Label-3ba15929183280d89974ea2b6e90caae?pvs=21), Meta (https://app.notion.com/p/Meta-3ba159291832802cbea0db474a1a6962?pvs=21)

# Option Selector (옵션 선택)

## 0. 메타

### 0.1. 분류(Category)

- Component / Option Selector

### 0.2. 타입 종류 (Types)

- `Color`, `Image`, `Label`, `Meta`

### 0.3. 타입 별 요소 (keyword)

- Color : `색상 선택` `원형 스와치` `Inner Circle`
- Image : `이미지 선택` `썸네일` `로고`
- Label : `텍스트` `사이즈 3종`
- Meta : `라벨+부가정보` `정렬 4종`

### 0.4. Figma Node ID

---

## 1. 개요

### 1.1. 정의

- Option Selector는 여러 선택지 중 하나를 고를 때 쓰는 컴포넌트다.
- `Type`(Color/Image/Label/Meta)이 1차 분류다 — 선택지를 무엇으로 표현하는지(색상 스와치/이미지/텍스트/라벨+메타데이터)에 따라 구조 자체가 다르다.
- `State`(Normal/Hover·Pressed/Selected/Disabled)는 같은 구조에서 상호작용 결과만 바뀌는 하위 축이다.
- 원래 별도 Type이었던 `Large`는 `Label`과 anatomy(라벨+테두리 박스)가 같아 `Label`의 `XLarge` 사이즈로 변경하였다.

### 1.2. 적용 상황

- 색상 옵션(색상 선택) → `Color`
- 이미지·로고 썸네일로 옵션을 구분할 때 → `Image`
- 텍스트 옵션(사이즈, 인치 등) → `Label`(Medium/Large)
- 더 큰 강조가 필요한 텍스트 옵션(요금제명 등) → `Label`의 `XLarge`
- 라벨과 부가 정보(가격, 용량 등)를 함께 보여줄 때 → `Meta`(서브타입별 scope 확인 필요, 2.6 참고)

---

## 2. 사용 규칙 (Usage Rules)

> `[MUST]` : 강제 · `[SHOULD]` : 권장 · `[ALLOW]` : 예외 허용 · `[AVOID]` : 금지
> 

### 2.1. 공통 규칙

- `[MUST]` Selected 상태의 Border는 항상 `#2189FF`, `Stroke 2px`.
- `[MUST]` Disabled는 Border는 그대로 두고 내용 요소만 흐리게 한다 — `Meta`는 Label·Metadata·Icon을 `#BBBBBB`로, 나머지(`Color`/`Image`/`Label` Medium·Large)는 Opacity를 낮춘다.
- `[MUST]` PC는 마우스를 올렸을 때(`Hover`), Mobile은 터치해서 누르는 동안(`Pressed`) 상태를 쓴다 — 마우스가 없는 모바일에는 Hover 개념이 없어서 Pressed로 대응한다.

### 2.2. Type 선택 규칙

- `[MUST]` 색상 옵션은 `Color`
- `[MUST]` 이미지·로고 옵션은 `Image`
- `[MUST]` 텍스트 옵션은 `Label`(Medium/Large/XLarge)
- `[MUST]` 라벨+부가정보 동시 노출은 `Meta`(서브타입별 scope 상이)

### 2.3. Type=Color 규칙

- `[MUST]` PC는 `Hover` 상태가 있다(Border 48x48, `#2189FF` 70%). Mobile은 `Hover` 없이 `Selected`만 강조된다.
- `[MUST]` Inner Circle 크기는 PC `36x36`, Mobile `24x24`로 다르다.

### 2.4. Type=Image 규칙

- `[MUST]` Container+Border+Image로 구성된다.
- `[MUST]` Disabled는 Image에 `Opacity 30%`를 추가로 적용한다.
- 참고: Figma에는 `Bezel` 타입이 있었으나, 삼성닷컴에서 현재 사용 중인 UI가 아니므로 제외. 실사용이 확인되면 다시 추가 예정.

### 2.5. Type=Label 규칙

- `[MUST]` Size는 `Medium`/`Large`/`XLarge` 3종이며 Radius가 다르다(Medium 4px, Large 8px, XLarge 6px).
- `[MUST]` `XLarge`는 SEC 전용이며, `Selected_hover`(PC)/`Pressed_selected`(Mobile)라는 복합 상태가 추가로 있다 — 선택된 항목을 다시 호버/누르면 라벨이 `#BBBBBB`로 옅어진다. Medium/Large에는 이 상태가 없다.
- `[ALLOW]` Disabled는 Medium/Large는 라벨·컨테이너에 `50%` 투명도를 적용하고, `XLarge`는 라벨을 `#BBBBBB`로 대체한다 — 사이즈별로 처리 방식이 다르다.

### 2.6. Type=Meta 규칙

- `[MUST]` 정렬 방식에 따라 4개 서브타입으로 나뉜다: `Left Aligned Data`, `Right Aligned Data`, `Left Icon + Right Aligned Data`, `Bottom Aligned Data`
- `[ALLOW]` Icon이 포함되는 서브타입만 Icon 컬러가 상태별로 바뀐다(Normal/Selected `#000000`, Disabled `#BBBBBB`)
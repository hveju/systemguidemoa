# 06_Popup (팝업)

DB 등록: 1차
담당자: Lani
분류: 03. Component
작업: 2026년 11월 18일 오후 12:57
작업상태: 1차 완료
하위 항목: Confirmation (Confirmation%2039d159291832806d925afec8971b9fa1.md), Input Data (Input%20Data%2039d15929183280cfbf19ee91ca3bd5a0.md), Notification (Notification%2039d15929183280d4a7a7d381afdea8e8.md), Contents (Contents%2039d159291832806b822dd26808d3538e.md)

# Popup (팝업)

## 0. 메타

### 0.1. 분류

- category: Popup
- group: Component

### 0.2. 타입 목록

- Confirmation: 사용자 확인·응답을 받는 팝업
- Input Data: 입력 필드·선택 요소로 구성된 팝업
- Notification: 간결한 메시지 중심의 알림 팝업
- Contents: 이미지·동영상 중심의 콘텐츠 팝업

### 0.3. 검색 키워드

- Confirmation: `확인 팝업`, `응답`, `의사결정`
- Input Data: `입력 팝업`, `정보 입력`, `옵션 선택`
- Notification: `알림 팝업`, `Alert`, `앱 다운로드`
- Contents: `콘텐츠 팝업`, `이미지`, `동영상`

---

## 1. 개요

### 1.1. 정의

- Popup은 현재 화면의 작업 맥락을 유지하면서 추가 정보를 제공하거나 사용자의 응답·입력을 받는 UI 요소입니다.
- 사용자의 응답·입력을 받는 Input 타입(Confirmation, Input Data)과 피드백·콘텐츠를 제공하는 Output 타입(Notification, Contents)으로 구분합니다.

### 1.2. 적용 상황

- 작업을 진행하기 전에 사용자의 확인이나 의사결정이 필요할 때 사용합니다.
- 리뷰 작성·날짜 선택 등 사용자 입력이나 옵션 선택이 필요할 때 사용합니다.
- 사용자 행동에 대한 결과나 알림을 전달해야 할 때 사용합니다.
- 현재 화면에서 추가 설명·이미지·동영상 등의 콘텐츠를 제공해야 할 때 사용합니다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: MUST
    
    content: 본문 흐름과 별도로 제공할 정보나 즉각적인 사용자 행동이 필요한 경우에 사용합니다.
    
- status: MUST
    
    content: Popup 내부의 컴포넌트는 각 컴포넌트에 정의된 기능에 맞게 사용합니다.
    
- status: MUST
    
    content: Container와 Close Icon을 포함하고, 선택한 타입에 맞는 본문 콘텐츠를 제공합니다.
    
- status: MUST
    
    content: 기기, 콘텐츠 분량, 제공 목적에 맞는 Container를 선택합니다.
    
- status: SHOULD
    
    content: PC에서는 Popup / Standard Container를 기본으로 사용하며, 콘텐츠 분량과 목적에 따라 조정합니다.
    
- status: SHOULD
    
    content: 모바일에서는 Sheet / Bottom Sheet Container를 기본으로 사용하며, 콘텐츠에 따라 Popup / Standard 또는 Full Screen Container를 사용합니다.
    
- status: MUST
    
    content: 모바일의 Popup / Standard Container는 본문이 3줄 이내인 짧은 안내에 사용합니다.
    
- status: MUST
    
    content: Popup / Standard Container는 Dimmed Background와 함께 화면 중앙에 배치합니다.
    
- status: MUST
    
    content: 모바일의 Sheet / Bottom Sheet Container는 화면 하단에 배치하고 Dimmed Background를 함께 사용합니다.
    
- status: ALLOW
    
    content: Popup / Standard와 Sheet / Bottom Sheet에서는 콘텐츠 구성에 따라 내부 Scroll을 사용할 수 있습니다.
    
- status: MUST
    
    content: 모바일에서 동영상은 전체 화면으로 제공하며, 가로형 동영상은 가로 모드로 재생합니다.
    
- status: AVOID
    
    content: 본문에 이미 제공한 설명이나 정보를 Popup에 그대로 반복하지 않습니다.
    
- status: MUST
    
    content: Close Icon은 우측 상단에 배치합니다.
    
- status: MUST
    
    content: PC의 Popup / Standard는 Default와 Expanded Popup 모두 컨테이너 너비를 448~1320px 범위에서 적용합니다.
    
- status: MUST
    
    content: 모바일의 Popup / Standard는 컨테이너 너비를 최소 312px로 적용합니다.
    

### 2.2. 타입 선택 기준

- Confirmation: 확인·계속 등 명확하고 직접적인 사용자 응답을 요청할 때 사용합니다.
- Input Data: 리뷰 작성, 날짜 선택 등 복잡한 입력을 받거나 선택 가능한 값을 제공할 때 사용합니다.
- Notification: 경고 등 사용자 행동에 대한 피드백을 간결한 메시지로 제공할 때 사용합니다.
- Contents: 입력이나 선택없이 텍스트, 이미지, 동영상 콘텐츠를 전달할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Confirmation

- status: MUST
    
    content: PC·모바일의 Standard는 Body와 CTA 2개를 제공합니다.
    
- status: MUST
    
    content: PC·모바일의 Standard에서 CTA는 왼쪽 Outlined Button과 오른쪽 Filled / Primary Button을 가로로 배치합니다.
    
- status: ALLOW
    
    content: PC·모바일의 Standard에서 Title Text, Subtitle Text, Caption Text를 생략할 수 있습니다. Title Text와 Subtitle Text를 생략한 No Title 구성도 사용할 수 있습니다.
    

#### 2.3.2. Type: Input Data

- status: ALLOW
    
    content: PC Standard의 Body에 Input Field와 Selection Control을 포함할 수 있으며, Body 내부 배치 순서는 콘텐츠에 따라 조정할 수 있습니다.
    
- status: MUST
    
    content: PC Standard는 Body와 CTA 1~2개를 제공합니다.
    
- status: MUST
    
    content: PC Standard에서 CTA가 1개일 때는 Filled / Primary Button을 사용합니다.
    
- status: MUST
    
    content: PC Standard에서 CTA가 2개일 때는 왼쪽 Outlined Button과 오른쪽 Filled / Primary Button을 가로로 배치합니다.
    
- status: ALLOW
    
    content: PC Standard의 Title Text, Subtitle Text, Caption Text를 생략할 수 있습니다.
    

#### 2.3.3. Type: Notification

- status: MUST
    
    content: PC·모바일의 Standard / Default는 Body를 제공하며, CTA는 0~1개를 사용합니다. CTA를 제공할 때는 Filled / Primary Button을 사용합니다.
    
- status: ALLOW
    
    content: PC·모바일의 Standard / Default에서 Title Text, Subtitle Text, Caption Text를 생략할 수 있습니다.
    
- status: MUST
    
    content: PC·모바일의 Standard / Alert는 Supporting Visual, Body, Filled / Primary Button 1개를 제공합니다.
    
- status: MUST
    
    content: Standard / App Download는 모바일에서만 사용하며, App Icon, Body, Filled / Primary Button 1개를 제공합니다.
    
- status: ALLOW
    
    content: 모바일 Standard / App Download의 Title Text는 생략할 수 있습니다.
    

#### 2.3.4. Type: Contents

- status: ALLOW
    
    content: PC·모바일의 Standard와 모바일 Bottom Sheet의 Body에 이미지와 동영상을 포함할 수 있으며, Body 내부 배치 순서는 콘텐츠에 따라 조정할 수 있습니다.
    
- status: MUST
    
    content: PC·모바일의 Standard와 모바일 Bottom Sheet는 CTA 0~1개를 사용하며, 제공할 때는 Filled / Primary Button을 사용합니다.
    
- status: ALLOW
    
    content: PC·모바일의 Standard와 모바일 Bottom Sheet에서 Title Text, Subtitle Text, Caption Text를 생략할 수 있습니다.
    
- status: MUST
    
    content: PC·모바일의 Media는 Dimmed Background(#000000, 불투명도 90%)를 적용합니다.
    
- status: MUST
    
    content: PC·모바일에서 이미지·동영상만 단독으로 제공할 때는 Media 구성을 사용하며, 원본 비율을 유지하고 중앙 정렬합니다.
    
- status: MUST
    
    content: Media / Single Visual_Horizontal은 16:9 비율을 적용합니다. 이미지·동영상의 너비는 PC에서 Viewport 너비의 90%, 모바일에서 Viewport 너비의 80%로 설정합니다.
    
- status: MUST
    
    content: Media / Single Visual_Vertical은 9:16 비율을 적용합니다. 이미지·동영상의 높이는 PC에서 Viewport 높이의 100%, 모바일에서 Device 높이의 80%로 설정합니다.
    
- status: MUST
    
    content: 모바일의 Sheet / Bottom Sheet와 Full Screen / Standard는 Device 너비의 100%를 적용합니다.
    

### 2.5. 내부 운영 규칙

- status: MUST
    
    content: 신규 팝업의 Close Icon은 글로벌 가이드에 따라 우측 상단에 고정 배치합니다. 일부 기존 안내 팝업의 컨테이너 외부 하단 중앙 배치는 기존 운영 사례에 한해 적용됩니다.
    
- status: SHOULD
    
    content: Title Text는 모바일 24px, PC 28px를 기본으로 적용합니다.
    
- status: ALLOW
    
    content: PC의 Title Text에는 예외적으로 24px를 적용할 수 있습니다.
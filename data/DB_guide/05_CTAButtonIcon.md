# 05_CTA Button Icon (기능 버튼)

DB 등록: 1차
담당자: Joy
분류: 02. Element
작업: 2026년 11월 19일 오후 2:10
작업상태: 1차 완료

# **CTA Button Icon (아이콘 버튼)**

## **0. 메타**

### **0.1. 분류**

- category: CTA Button Icon
- group: Element

### **0.2. 타입 종류**

- Standard: 누르면 한 번에 실행되는 버튼을 아이콘으로 제공하는 버튼
- Toggle: 켜고 끄는 동작을 아이콘으로 제공하는 버튼 (기본형 Toggle Standard, 배경형 Toggle Contained)
- Play: 영상을 재생하거나 멈추는 버튼

### **0.3. 검색 키워드**

- Standard: 아이콘 버튼, 삭제 아이콘, 공유 아이콘, 다운로드 아이콘, 정보 아이콘
- Toggle: 토글 아이콘, 위시리스트, 찜하기, 하트 아이콘, 재입고 알림, 알림 아이콘
- Play: 재생 버튼, 플레이 버튼, 일시정지 버튼, Pause, 영상 재생

---

## **1. 개요**

### **1.1. 정의**

- CTA Button Icon은 텍스트 라벨 없이 아이콘만으로 액션의 의도를 전달하는 버튼 컴포넌트입니다.
- 위시리스트 담기나 콘텐츠 재생처럼 아이콘만으로 의도가 명확히 전달되는 경우에 사용합니다.
- 동작 방식에 따라 Standard, Toggle, Play로 구분합니다.

### **1.2. 적용 상황**

- 아이콘만 봐도 누구나 뜻을 알 수 있는 동작을 제공할 때 적용합니다.
- 화면이 좁거나, 제품 카드나 이미지 위처럼 텍스트 버튼을 두기 어려운 영역에 액션을 제공할 때 적용합니다.
- 영상이나 자동 재생 콘텐츠의 재생과 정지를 제어할 때 적용합니다.

---

## **2. 사용 규칙**

### **2.1. 공통 규칙**

- status: MUST content: 아이콘만으로 의도가 명확히 전달되는 동작에만 사용합니다.
- status: MUST content: 아이콘만 있으므로 스크린 리더가 읽을 수 있는 이름을 반드시 제공합니다.
- status: SHOULD content: 누른 뒤 무슨 일이 일어날지 예상할 수 있는 아이콘을 사용합니다.
- status: SHOULD content: 같은 동작에는 사이트 전체에서 같은 아이콘을 사용합니다.
- status: SHOULD content: 배경색에 따라 Light BG 버전과 Dark BG 버전을 구분하여 사용합니다.
- status: SHOULD content: 아이콘이랑 레이블 사이 간격은은 4px, 8px으로 적용합니다.
- status: AVOID content: 구매하기, 장바구니 담기처럼 페이지의 핵심 액션은 Icon 버튼으로 제공하지 않고 일반 CTA Button을 사용합니다.
- status: AVOID content: 상담 예약, 보상 판매처럼 아이콘만으로 뜻이 전달되지 않는 동작에는 Icon 버튼을 사용하지 않습니다.

### **2.2. Type 선택 규칙**

- Standard:
    - 누르면 한 번 실행되고 상태가 남지 않는 동작에 사용합니다.
    - 장바구니나 비교함의 항목 삭제, 제품 페이지 공유, 매뉴얼 다운로드, 정보(i) 툴팁 열기 등에 사용합니다.
- Toggle:
    - 켜짐과 꺼짐 상태가 유지되는 동작에 사용합니다.
    - 위시리스트 담기·빼기, 품절 제품의 재입고 알림 받기·끄기 등에 사용합니다.
- Play:
    - 영상 콘텐츠를 재생하거나 멈출 때 사용합니다.
    - 메인 KV 영상, 제품 갤러리 영상, 자동 재생 배너의 정지 버튼 등에 사용합니다.

### **2.3. 타입별 사용 규칙**

#### **2.3.1. Type: Standard**

- status: MUST content: 누르면 한 번 실행되고 상태가 남지 않는 동작에 사용합니다.
- status: SHOULD content: 삭제처럼 되돌리기 어려운 동작은 누른 뒤 확인 팝업이나 스낵바로 결과를 알려줍니다.
- status: ALLOW content: 안내 문구 옆에 정보(i) 아이콘을 두어 툴팁을 여는 용도로 사용할 수 있습니다.
- status: AVOID content: 켜고 끄는 상태가 유지되어야 하는 동작에는 Standard를 사용하지 않고 Toggle을 사용합니다.

#### **2.3.2. Type: Toggle**

- status: MUST content: 누르면 즉시 상태가 바뀌고, 채워진 아이콘(On)과 빈 아이콘(Off)으로 결과를 보여줍니다.
- status: MUST content: 스크린 리더에서도 현재 상태가 읽히도록 합니다.
- status: SHOULD content: 리스트나 장바구니처럼 단색 배경 위에서는 배경 없이 아이콘만 있는 기본형(Toggle Standard)을 사용합니다.
- status: SHOULD content: 제품 이미지나 배너처럼 색이 다양한 배경 위에서는 아이콘 뒤에 반투명 배경이 있는 배경형(Toggle Contained)을 사용합니다.
- status: SHOULD content: 이미지 위에 둘 때는 제품의 핵심 부분을 가리지 않도록 모서리에 배치합니다.
- status: AVOID content: 공유, 삭제처럼 한 번 실행하고 끝나는 동작에는 Toggle을 사용하지 않습니다.
- status: AVOID content: 같은 목록 안에서 기본형과 배경형을 섞어 사용하지 않습니다.

#### **2.3.3. Type: Play**

- status: MUST content: 재생 중에는 Pause 아이콘, 멈춘 뒤에는 Play 아이콘으로 바꿔 현재 상태를 보여줍니다.
- status: MUST content: 자동으로 재생되는 영상이나 배너에는 사용자가 멈출 수 있는 버튼을 항상 제공합니다.
- status: SHOULD content: 메인 KV나 제품 소개 영역의 대표 영상에는 큰 크기를, 썸네일이나 카드 안의 영상에는 작은 크기를 사용합니다.
- status: SHOULD content: Mobile에서는 영상을 전체 화면으로 재생하고, 가로 영상은 가로 모드로 재생합니다.
- status: AVOID content: 영상이 아닌 이미지나 링크에 Play 아이콘을 사용하지 않습니다.
- status: AVOID content: 한 화면에 큰 Play 버튼을 여러 개 두지 않습니다. 가장 중요한 영상 하나만 크게 두고 나머지는 작은 크기를 사용합니다.

2.5.1. 아이콘 형태

- status: ALLOW
- content: CTA Button Icon은 채워진(Filled) 형태의 아이콘 디자인을 사용할 수 있습니다.

2.5.2. 쿠폰받기 아이콘

- status: ALLOW
- content: 사용자가 바로 쿠폰을 다운로드하게 하려면 쿠폰받기 아이콘 버튼을 사용할 수 있습니다.
- status: MUST
- content: 쿠폰받기 아이콘 버튼은 Default 108px × 40px, Small 91px × 32px 크기를 사용합니다.
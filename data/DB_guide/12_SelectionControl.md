# 12_Selection Control

DB 등록: 2차
담당자: Joy
분류: 02. Element
작업: 2026년 11월 19일 오후 1:38
작업상태: 1차 완료
하위 항목: Check Box (체크박스) (Check%20Box%20(%EC%B2%B4%ED%81%AC%EB%B0%95%EC%8A%A4)%2038a1592918328076be31e9d9b537c65d.md), Radio (라디오) (Radio%20(%EB%9D%BC%EB%94%94%EC%98%A4)%2038a15929183280df89b8ce24291de03e.md), Switch (스위치) (Switch%20(%EC%8A%A4%EC%9C%84%EC%B9%98)%2038a15929183280a89020deb58dcb07e4.md)

## **0. 메타**

### **0.1. 분류**

- category: Selection Control
- group: Element

### **0.2. 타입 종류**

- Check Box: 하나 이상의 옵션을 선택할 때 사용하는 선택 컨트롤
- Radio: 여러 옵션 중 하나만 선택할 때 사용하는 선택 컨트롤
- Switch: 설정을 켜고 끌 때 사용하는 선택 컨트롤

### **0.3. 검색 키워드**

- Check Box: 체크박스, 체크 박스, 복수 선택, 다중 선택, 전체 선택, 하위 선택
- Radio: 라디오 버튼, 단일 선택, 하나만 선택, 옵션 선택
- Switch: 스위치, 토글 스위치, On/Off, 켜기 끄기, 설정 변경

---

## **1. 개요**

### **1.1. 정의**

- Selection Control은 사용자가 하나 이상의 옵션을 선택하거나 설정을 변경할 수 있게 하는 컴포넌트입니다.
- 선택 방식과 맥락에 따라 Check Box, Radio, Switch로 구분합니다.
- 선택 결과를 사용자가 이해할 수 있도록 시각적 피드백과 동작 피드백을 함께 제공합니다.

### **1.2. 적용 상황**

- 필터 조건처럼 여러 옵션을 동시에 선택해야 할 때 적용합니다.
- 여러 옵션 중 반드시 하나만 선택해야 할 때 적용합니다.
- 단독으로 쓰이거나 켜짐과 꺼짐 두 가지 상태만 있는 설정을 전환할 때 적용합니다.

---

## **2. 사용 규칙**

### **2.1. 공통 규칙**

- status: MUST content: 선택 방식과 맥락에 맞는 타입을 사용합니다. 복수 선택은 Check Box, 단일 선택은 Radio, 두 가지 상태의 전환은 Switch를 사용합니다.
- status: MUST content: 모든 타입은 사용자가 예상한 결과와 일치하는 피드백을 제공합니다.
- status: MUST content: 라벨이나 이미지는 컨트롤 가까이 배치하여 연결 관계를 명확히 합니다.
- status: MUST content: 같은 화면에서 같은 타입이 반복될 때는 정렬 방식을 통일합니다.
- status: SHOULD content: 선택할 수 없는 옵션은 Disabled 상태로 표시합니다.
- status: SHOULD content: 배경색에 따라 Light BG 버전과 Dark BG 버전을 구분하여 사용합니다.
- status: AVOID content: 정의되지 않은 기능에 Selection Control을 사용하지 않습니다.
- status: AVOID content: 같은 화면 안에서 같은 타입의 정렬 방식을 다르게 적용하지 않습니다.

### **2.2. Type 선택 규칙**

- Check Box:
    - 여러 옵션을 동시에 선택할 수 있을 때 사용합니다.
    - 상위 항목과 하위 항목이 있는 계층형 선택 구조에 사용합니다.
- Radio:
    - 여러 옵션 중 하나만 선택해야 할 때 사용합니다.
    - 선택지가 두 개 이상 있을 때 사용합니다.
- Switch:
    - 단독으로 쓰이거나 켜짐과 꺼짐 두 가지 상태만 있는 옵션에 사용합니다.
    - 누르는 즉시 결과가 반영되어야 하는 설정에 사용합니다.

### **2.3. 타입별 사용 규칙**

#### **2.3.1. Type: Check Box**

- status: MUST content: 여러 옵션을 동시에 선택할 수 있을 때 사용합니다.
- status: MUST content: 클릭할 때마다 선택과 해제 상태가 전환되도록 합니다.
- status: MUST content: 계층형 구조에서는 상위 항목을 선택하면 하위 항목이 모두 선택되고, 하위 항목을 하나라도 해제하면 상위 항목도 해제되도록 합니다.
- status: SHOULD content: 라벨이나 이미지는 박스 바로 옆에 두어 연결 관계가 보이게 합니다.
- status: AVOID content: 하나만 선택해야 하는 옵션에는 Check Box를 사용하지 않고 Radio를 사용합니다.
- status: AVOID content: 현재 페이지에는 원형 체크박스도 사용되고 있지만, 가이드가 변경되면서 이제는 가이드의 사각형 체크박스만 권장합니다.

#### **2.3.2. Type: Radio**

- status: MUST content: 여러 옵션 중 하나만 선택할 수 있을 때 사용합니다.
- status: MUST content: 새 옵션을 선택하면 이전 선택은 자동으로 해제되도록 합니다.
- status: SHOULD content: 라벨은 버튼 바로 옆에 두고, 같은 화면의 Radio 그룹은 정렬 방식을 맞춥니다.
- status: AVOID content: Radio에서 여러 옵션을 동시에 선택하게 하지 않습니다.
- status: AVOID content: 옵션을 하나만 제공하는 경우에는 Radio를 사용하지 않습니다.

#### **2.3.3. Type: Switch**

- status: MUST content: 단독으로 쓰이거나 켜짐과 꺼짐 두 가지 상태만 있는 옵션에 사용합니다.
- status: MUST content: 누르는 즉시 상태가 바뀌고 결과가 바로 반영되도록 합니다.
- status: SHOULD content: 별도의 저장이나 확인 버튼을 거치지 않고 상태가 반영되도록 합니다.
- status: SHOULD content: 라벨은 Switch 바로 옆에 배치합니다.
- status: AVOID content: Switch를 켰을 때 팝업이 뜨는 방식처럼 정의되지 않은 동작에 Switch를 사용하지 않습니다.
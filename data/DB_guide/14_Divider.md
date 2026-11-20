# 14_Divider (구분선)

DB 등록: 2차
담당자: Lani
분류: 02. Element
작업: 2026년 11월 18일 오후 1:01
작업상태: 1차 완료
하위 항목: Horizontal (Horizontal%2040015929183280419f68ee5a31373de8.md), Vertical (Vertical%2040015929183280ceaef5d156ede1da70.md)

# Divider (구분선)

## 0. 메타

### 0.1. 분류

- category: Divider
- group: Element

### 0.2. 타입 목록

- Horizontal: 가로선 형태의 구분선
- Vertical: 세로선 형태의 구분선

### 0.3. 검색 키워드

- Horizontal: `가로 구분선`, `상하 구분`, `섹션 구분`, `목록 항목 구분`, `콘텐츠 경계`
- Vertical: `세로 구분선`, `좌우 구분`, `메뉴 구분`, `텍스트 구분`, `가로 항목 구분`

---

## 1. 개요

### 1.1. 정의

- Divider는 콘텐츠를 시각적으로 구분해 정보의 구조를 명확하게 하고, 관련된 요소를 하나의 그룹으로 인식하도록 돕는 UI 요소입니다.

### 1.2. 적용 상황

- 콘텐츠의 구조나 그룹 간 경계를 시각적으로 구분해야 할 때 사용합니다.
- 세로로 나열된 콘텐츠를 상하 영역으로 구분할 때 사용합니다.
- 가로로 나열된 콘텐츠를 좌우 영역으로 구분할 때 사용합니다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: MUST
    
    content: 콘텐츠의 구조나 그룹을 구분할 필요가 있을 때만 사용합니다.
    
- status: MUST
    
    content: Divider는 실선(Solid)으로 적용합니다.
    
- status: MUST
    
    content: 정의된 색상과 두께를 사용해 UI 전반의 시각적 일관성을 유지합니다.
    
- status: MUST
    
    content: 배경 테마에 따라 Light BG 또는 Dark BG Variant를 사용합니다.
    
- status: AVOID
    
    content: 색상·두께·불투명도를 임의로 변경해 정의된 스타일을 대체하지 않습니다.
    

### 2.2. 타입 선택 기준

- Horizontal: 세로로 정렬된 콘텐츠를 구분할 때 사용합니다.
- Vertical: 가로로 정렬된 콘텐츠를 구분할 때 사용됩니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Horizontal

- status: MUST
    
    content: 세로로 나열된 콘텐츠 사이에 가로선을 배치합니다.
    
- status: MUST
    
    content: 선의 높이(Height)는 1px로 적용합니다.
    
- status: MUST
    
    content: Light BG의 Default 색상은 #DDDDDD를 사용합니다.
    
- status: MUST
    
    content: Dark BG의 색상은 #555555를 사용합니다.
    
- status: ALLOW
    
    content: Light BG에서는 Light Gray 색상인 #EEEEEE를 사용할 수 있습니다.
    

#### 2.3.2. Type: Vertical

- status: MUST
    
    content: 가로로 나열된 콘텐츠 사이에 세로선을 배치합니다.
    
- status: MUST
    
    content: 선의 너비(Width)는 1px로 적용합니다.
    
- status: MUST
    
    content: Light BG의 Default 색상은 #DDDDDD를 사용합니다.
    
- status: MUST
    
    content: Dark BG의 색상은 #555555를 사용합니다.
    
- Vertical에는 Light Gray Variant가 제공되지 않습니다.

### 2.4. 세부 적용 규칙

#### 2.4.1. Variant 제공 범위

- status: MUST
    
    content: Light Gray Variant는 Horizontal의 Light BG에서만 사용합니다. Vertical에는 제공하지 않습니다.
    

### 2.5. 내부 운영 규칙

- status: MUST
    
    content: 텍스트 사이에 사용하는 Vertical Divider의 높이는 인접한 텍스트의 폰트 크기를 초과하지 않도록 적용합니다.
    
- status: MUST
    
    content: Vertical Divider와 텍스트 사이의 간격은 Spacing 가이드를 따릅니다.
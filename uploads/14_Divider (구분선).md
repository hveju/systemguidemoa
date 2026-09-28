# Divider (구분선)

DB 등록: 2차
담당자: Lani
분류: 02. Element
작업: 2026년 9월 14일 오후 1:58
작업상태: 진행 중

## 0. 메타

### 0.1. 분류

- `Element / Divider`

### 0.2. 타입 종류

- `Horizontal`, `Vertical`

### 0.3. 타입별 요소 (키워드)

- Horizontal : `가로 구분선` `Height` `상하 콘텐츠 구분`
- Vertical : `세로 구분선` `Width` `좌우 요소 구분`

### 0.4. Figma Node ID

- N/A

---

## 1. 개요

### 1.1. 정의

- Divider는 콘텐츠·영역을 구분하는 1px 두께의 선이다.
- `Type`(Horizontal/Vertical)이 1차 분류다 — Height를 차지하는지 Width를 차지하는지가 달라, 상하 구분용인지 좌우 구분용인지 쓰임 자체가 바뀐다.
- `Theme`(Light BG/Dark BG)는 같은 모양의 선에 색만 바뀌는 컨텍스트 축이다.

### 1.2. 적용 상황

- 상하로 쌓인 콘텐츠·섹션을 구분할 때 → `Horizontal`
- 좌우로 나열된 요소(메뉴, 버튼 그룹, 텍스트 등)를 구분할 때 → `Vertical`
- 기본 대비가 필요할 때 → `Default`(`#DDDDDD`)
- 더 옅은 구분이 필요할 때 → `Light Gray`(`#EEEEEE`, Light BG 전용)
- 어두운 배경 위에서 구분이 필요할 때 → `Default`(`#555555`, Dark BG는 이 1종만 존재)

---

## 2. 사용 규칙

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[ALLOW]`: 예외 허용 · `[AVOID]`: 금지

### 2.1. 공통 규칙

- `[MUST]` 두께는 항상 `1px`.
- `[MUST]` Dark BG는 `Default`(`#555555`) 1종만 존재 — `Light Gray`는 없다.
- `[MUST]` Divider와 주변 콘텐츠 사이 간격은 이 문서가 아니라 `Spacing`(Gap/Inset/Section 등)에 따른다.

### 2.2. Type 선택 규칙

- `[MUST]` 수평 콘텐츠 구분엔 `Horizontal`.
- `[MUST]` 같은 줄에 나열된 요소 구분엔 `Vertical`.

### 2.3. Horizontal 규칙

- `[SHOULD]` Light BG 기본은 `Default`, 더 옅은 구분이 필요할 때만 `Light Gray` 사용.
- `[MUST]` Dark BG는 `Default`(`#555555`) 고정.

### 2.4. Vertical 규칙

- `[MUST]` Light BG는 `Default` 1종만 확인됨 — `Light Gray`는 Horizontal 전용.
- `[MUST]` Dark BG는 `Default` 고정.

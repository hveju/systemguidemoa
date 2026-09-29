# Indicator (인디케이터)

DB 등록: 2차
담당자: Joy
분류: 02. Element
작업: 2026년 9월 14일 오후 2:59
작업상태: 진행 중
하위 항목: Dot (https://app.notion.com/p/Dot-38a1592918328066b886c7cde382f735?pvs=21), Arrow (https://app.notion.com/p/Arrow-38a15929183280bd89fdf438401c7383?pvs=21), Number (https://app.notion.com/p/Number-38a159291832804c8c62e7e31ea62352?pvs=21), Scroll Indicator (https://app.notion.com/p/Scroll-Indicator-38a15929183280d2b13fc594f89aabb2?pvs=21), Bar (https://app.notion.com/p/Bar-38a1592918328049bacef35539590d6f?pvs=21)

## 0. 메타

- **분류(Category)**: Component / Indicator — 콘텐츠의 현재 위치·진행 상태·이동 가능 여부를 표현하는 인디케이터
- **타입 종류(Types)**: `Arrow`, `Bar(PCOnly)`, `Dot`, `Number`, `ScrollIndicator`
- **Figma 파일**: `Chatbot_Design-System_v1.6_SEC`
- **Figma File Key**: `yJ2Na1iQvtZwUnyCbBJXCy`
- **Figma Section Node**: `18659:26309`
- **Figma Link**: `https://www.figma.com/design/yJ2Na1iQvtZwUnyCbBJXCy/Chatbot_Design-System_v1.6_SEC?node-id=18659-26309`

## 1. 개요

### 1.1. 정의

- Indicator는 캐러셀, 배너, 스크롤 영역, 단계형 콘텐츠에서 현재 위치·선택 상태·이동 가능 방향을 알려주는 요소다.
- 콘텐츠를 직접 선택하거나 이전/다음으로 이동시키는 경우에는 인터랙션을 제공하며, 단순 진행 상태만 보여줄 때는 정보 표현 목적으로 사용한다.
- Figma에는 `Arrow`, `Bar(PCOnly)`, `Dot`, `Number`, `ScrollIndicator` 5종이 정의되어 있다.

### 1.2. 타입별 요약

| Type | 정의 | 기본 사용 상황 | 주요 Variant Axis |
| --- | --- | --- | --- |
| `Arrow` | 이전/다음 콘텐츠로 이동하는 원형 화살표 버튼 | 캐러셀, 슬라이드, 가로 콘텐츠 이동 | `state`, `direction`, `theme` |
| `Bar(PCOnly)` | 다수 항목의 선택 위치를 막대 형태로 표현 | PC 전용 콘텐츠 탭/슬라이드 진행 | `amount`, `theme` |
| `Dot` | 현재 위치를 점으로 간결하게 표현 | 배너, 이미지 캐러셀, 페이지네이션 | `amount`, `theme` |
| `Number` | 현재 순서와 전체 개수를 숫자로 표현 | 카드/콘텐츠 순번, 슬라이드 | `target`, `device`, `case`, `play` |
| `ScrollIndicator` | 스크롤 진행 상태와 이전/다음 이동을 함께 제공 | PC·모바일 가로 스크롤 콘텐츠 | `device`, `case`, `theme`, `show_button` |

## 2. 사용 규칙 (Usage Rules)

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[DON'T]`: 금지
> 

### 2.1. 공통 규칙

- `[MUST]` 콘텐츠의 현재 위치를 표현하는 모든 Indicator는 실제 콘텐츠 순서와 동기화한다.
- `[MUST]` `selected`, `scrolled`, `end` 상태는 사용자의 실제 위치를 반영한다.
- `[MUST]` 밝은 배경에는 `theme=light_bg`, 어두운 배경에는 `theme=dark_bg`를 사용한다.
- `[MUST]` 인디케이터의 크기, 선 두께, 점 크기, 버튼 크기를 임의 변경하지 않는다.
- `[SHOULD]` 하나의 콘텐츠 묶음에는 같은 종류의 위치 표현 방식을 일관되게 사용한다.
- `[SHOULD]` 콘텐츠 개수와 화면 밀도에 맞춰 `Dot`, `Number`, `Bar` 중 인지하기 쉬운 형태를 선택한다.
- `[DON'T]` 실제 이동 또는 선택이 불가능한 상태에서 활성화된 화살표 버튼을 노출하지 않는다.
- `[DON'T]` 현재 위치와 무관하게 임의 항목을 `selected`로 표시하지 않는다.

### 2.2. Type 선택 규칙

- `[SHOULD]` 이전/다음 이동 행동이 필요하면 `Arrow` 또는 `ScrollIndicator`를 사용한다.
- `[SHOULD]` 항목 수가 적고 시각적으로 간결한 위치 표현이 필요하면 `Dot`을 사용한다.
- `[SHOULD]` 현재 순번과 전체 개수를 명확히 알려야 하면 `Number`를 사용한다.
- `[SHOULD]` 여러 콘텐츠의 진행 상태를 넓은 PC 영역에서 보여줄 때 `Bar(PCOnly)`를 사용한다.
- `[SHOULD]` 가로 스크롤 콘텐츠의 진행 상태와 양방향 이동을 함께 제공할 때 `ScrollIndicator`를 사용한다.
- `[DON'T]` `Bar(PCOnly)`를 모바일용 인디케이터로 사용하지 않는다.
# Selection Control

DB 등록: 2차
담당자: Joy
분류: 02. Element
작업: 2026년 9월 14일 오후 2:58
작업상태: 진행 중
하위 항목: Check Box (체크박스) (https://app.notion.com/p/Check-Box-38a1592918328076be31e9d9b537c65d?pvs=21), Radio (라디오) (https://app.notion.com/p/Radio-38a15929183280df89b8ce24291de03e?pvs=21), Switch (스위치) (https://app.notion.com/p/Switch-38a15929183280a89020deb58dcb07e4?pvs=21)

## 0. 메타

- **분류(Category)**: Component / Selection Control — 사용자가 옵션, 상태, 설정값을 선택·해제하는 입력 컨트롤
- **타입 종류(Types)**: `CheckBox`, `Radio`, `Switch`
- **Figma 파일**: `Chatbot_Design-System_v1.6_SEC`
- **Figma File Key**: `yJ2Na1iQvtZwUnyCbBJXCy`
- **Figma Section Node**: `18458:49222`
- **Figma Link**: `https://www.figma.com/design/yJ2Na1iQvtZwUnyCbBJXCy/Chatbot_Design-System_v1.6_SEC?node-id=18458-49222`

## 1. 개요

### 1.1. 정의

- Selection Control은 사용자가 옵션을 선택하거나, 설정을 켜고 끄거나, 복수 항목을 선택하는 데 사용하는 입력 요소다.
- `CheckBox`는 복수 선택, `Radio`는 단일 선택, `Switch`는 즉시 반영되는 On/Off 설정에 사용한다.
- 모든 컴포넌트는 `condition`, `state`, `theme` 축을 기반으로 제공된다.

### 1.2. 타입별 요약

| Type | 정의 | 선택 방식 | Variant Axis |
| --- | --- | --- | --- |
| `CheckBox` | 독립적이거나 복수인 옵션을 선택/해제 | 복수 선택 가능 | `condition`, `state`, `theme` |
| `Radio` | 상호 배타적인 옵션 중 하나를 선택 | 그룹 내 1개 선택 | `condition`, `state`, `theme` |
| `Switch` | 기능·설정의 켜짐/꺼짐을 즉시 전환 | On/Off 전환 | `condition`, `state`, `theme` |

## 2. 사용 규칙 (Usage Rules)

> `[MUST]`: 강제 · `[SHOULD]`: 권장 · `[DON'T]`: 금지
> 

### 2.1. 공통 규칙

- `[MUST]` 밝은 배경에는 `theme=light_bg`, 어두운 배경에는 `theme=dark_bg`를 사용한다.
- `[MUST]` `disabled` 상태에서는 값 변경 인터랙션을 제공하지 않는다.
- `[MUST]` 컨트롤의 선택 상태는 연결된 데이터의 실제 값과 동기화한다.
- `[MUST]` 선택 컨트롤만으로 의미가 불분명할 경우, 인접한 레이블로 선택 대상과 결과를 설명한다.
- `[SHOULD]` 선택 가능한 전체 영역을 클릭 또는 탭할 수 있도록 컨트롤과 레이블을 하나의 입력 단위로 구성한다.
- `[SHOULD]` `focused`, `pressed`, `error`, `read-only`는 Figma에 정의가 없으므로 접근성·검증 정책 확정 전까지 별도 상태를 만들지 않는다.
- `[DON'T]` `disabled`를 단순히 “선택되지 않음”의 표현으로 사용하지 않는다.
- `[DON'T]` `Radio`를 복수 선택에 사용하거나, `CheckBox`를 상호 배타적 단일 선택에 사용하지 않는다.

### 2.2. Type = CheckBox

- `[MUST]` 사용자가 여러 옵션을 독립적으로 선택·해제할 수 있을 때 사용한다.
- `[SHOULD]` 약관 동의, 필터 다중 선택, 항목 일괄 선택에 사용한다.
- `[SHOULD]` “전체 선택”을 제공하는 경우, 하위 항목의 실제 선택 상태와 연동한다.
- `[DON'T]` 2개 이상의 선택지 중 반드시 하나만 골라야 하는 경우에는 사용하지 않고 `Radio`를 사용한다.

### 2.3. Type = Radio

- `[MUST]` 동일 그룹에서 하나의 옵션만 선택 가능할 때 사용한다.
- `[SHOULD]` 배송 방식, 결제 수단, 정렬 기준처럼 상호 배타적인 옵션에 사용한다.
- `[SHOULD]` 그룹 안에는 기본 선택값 또는 선택 필요 여부를 명확히 정의한다.
- `[DON'T]` 개별 항목을 독립적으로 여러 개 선택해야 하는 경우에는 사용하지 않는다.

### 2.4. Type = Switch

- `[MUST]` On/Off 전환이 즉시 적용되는 설정에 사용한다.
- `[SHOULD]` 알림 허용, 기능 활성화, 환경설정처럼 이진 상태를 표현할 때 사용한다.
- `[SHOULD]` 전환 결과가 즉시 적용되지 않는다면 `Switch`보다 확인 버튼이 있는 `CheckBox` 또는 별도 선택 UI를 검토한다.
- `[DON'T]` 여러 값 중 하나를 고르는 선택지에 사용하지 않는다.
- `[DON'T]` 현재 상태가 불분명한 설정에 기본값을 임의 적용하지 않는다.
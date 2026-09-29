# Popup (팝업)

DB 등록: 1차
담당자: Lani
분류: 03. Component
작업: 2026년 9월 16일 오후 3:42
작업상태: 진행 중
하위 항목: Confirmation (https://app.notion.com/p/Confirmation-39d159291832806d925afec8971b9fa1?pvs=21), Input Data (https://app.notion.com/p/Input-Data-39d15929183280cfbf19ee91ca3bd5a0?pvs=21), Notification (https://app.notion.com/p/Notification-39d15929183280d4a7a7d381afdea8e8?pvs=21), Contents (https://app.notion.com/p/Contents-39d159291832806b822dd26808d3538e?pvs=21)

# Popup (팝업)

## 0. 메타

- **분류(Category)** : `Component / Popup`
- **타입(Types)** : `Confirmation`, `Contents`, `Input Data`, `Notification`
- **피그마 노드 ID(Figma Node ID) :**

---

## 1. 개요

### 1.1. 정의

- Popup DB는 화면 위에 오버레이(Dimmed 배경) 형태로 노출되어 확인·정보 전달·입력·알림을 처리하는 컴포넌트를 정의한다.
- `case`(Confirmation / Contents / Input Data / Notification)가 1차 분류이며, 그 아래 `layout`(Standard / Bottom Sheet / Media), `subCase`(Alert / App Download / Compare / Single Visual_Horizontal / Single Visual_Vertical / Consent), `platform`(PC / Mobile)이 세부 variant 축으로 붙는다.
- Confirmation: 사용자의 확인/취소 등 양자택일 결정을 받아야 할 때 쓰는 case.
- Contents: 별도 결정 없이 정보나 미디어(이미지/영상)를 전달할 때 쓰는 case.
- Input Data: 사용자 입력을 받거나 여러 옵션을 비교시켜야 할 때 쓰는 case (동의/체크박스형은 `subCase=Consent`, 옵션 비교형은 `subCase=Compare`로 세분).
- Notification: 시스템 알림·경고·앱 다운로드 유도 등에 쓰는 case (경고성 안내는 `subCase=Alert`, 앱 설치 유도는 `subCase=App Download`).

### 1.2. 케이스별 요약

| Case | 정의 | 기본 CTA | 지원 Layout |
| --- | --- | --- | --- |
| `Confirmation` | 확인/취소 등 양자택일 결정 | `2 Buttons`(가로, Left Outlined / Right Filled·Primary) | Standard만 |
| `Contents` | 정보·미디어 전달, 결정 불필요 | `0-1 Button`(Filled·Primary) | Standard, Bottom Sheet(이 case에 한해 Mobile만 지원), Media |
| `Input Data` | 입력·동의·옵션 비교 | `1-2 Buttons`(PC 가로 / Mobile 세로), Compare는 `2-3 Buttons`(비교 개수에 따라 가변) | Standard, Bottom Sheet(Compare) |
| `Notification` | 시스템 알림·경고·앱 다운로드 유도 | `0-1 Button`(Filled·Primary) | Standard (+`Alert`, `App Download` 서브케이스) |

### 1.3. 적용 상황 (Case 우선순위)

- 사용자의 확인/결정이 결과를 바꿀 때 → `Confirmation`
- 텍스트/이미지/영상 등 정보를 자발적으로 보여줄 때 → `Contents`
- 사용자 입력·동의·옵션 비교가 필요할 때 → `Input Data`
- 법적/정책상 고지 의무로 노출되는 시스템 안내일 때 → `Notification`

---

## 2. 사용_규칙

### 2.1. 공통

- `[MUST]` 배경은 반드시 Dimmed 처리한다 — `layout=Standard/Bottom Sheet`는 `#000000 60%`, `layout=Media`는 `#000000 90%`.
- `[MUST]` 닫기(X) 아이콘은 `24x24 #000000` 기본, `layout=Media`만 `36x36(PC)/24x24(Mobile) #FFFFFF` 예외.
- `[MUST]` Popup은 `dark_bg`를 지원하지 않는다 — 테마와 무관하게 항상 `light_bg` 기준으로만 사용한다.
- `[SHOULD]` `case`(무엇을 담을지)와 `layout`(어떻게 노출할지)은 서로 독립적인 결정이다 — case를 먼저 정하고, 그다음 layout을 정한다.

### 2.2. 타입 선택(Case / Layout 선택 규칙)

**지원 매트릭스 (case별 가능한 layout)**

| case | Standard | Bottom Sheet | Media |
| --- | --- | --- | --- |
| Confirmation | ✅ | N/A | N/A |
| Contents | ✅ | ✅ (Mobile Only) | ✅ |
| Input Data | ✅ | ✅ (Compare은 PC/Mobile 둘 다) | N/A |
| Notification | ✅ | N/A | N/A |
| Notification / Alert | ✅ | N/A | N/A |
| Notification / App Download | ✅ (Mobile Only) | N/A | N/A |

**Case 판별 트리**

```
Q1. 사용자의 선택(확인/취소)이 결과를 바꾸는가?
    Yes → Confirmation

Q2. 사용자로부터 값 · 동의 · 선택을 받아야 하는가?
    Yes → Input Data
    ├─ 단순 동의/체크박스형 → subCase: Consent
    └─ 여러 옵션 비교형     → subCase: Compare

Q3. 법적/정책상 고지 의무로, 동의 여부와 무관하게 노출되는 안내인가?
    Yes → Notification
    ├─ 경고/주의 아이콘 필요 → subCase: Alert
    └─ 앱 설치 유도         → subCase: App Download

Q4. 위 셋 다 아니고, 사용자가 자발적으로 보는 정보/미디어인가?
    Yes → Contents
    └─ 이미지/영상이 화면을 거의 채우며 몰입감이 중요한가?
        Yes → layout=Media
        No  → layout=Standard 또는 Bottom Sheet
```

**Layout 선택 규칙**

- `[MUST]` 화면 중앙에 뜨는 일반적인 다이얼로그는 `layout=Standard`
- `[SHOULD]` 모바일에서 하단 스크롤로 보여주거나(Contents), 여러 옵션을 비교(Input Data Compare)할 땐 `layout=Bottom Sheet` 검토
- `[SHOULD]` 이미지·영상 자체를 몰입감 있게 강조할 땐 `layout=Media`
- `[ALLOW]` Input Data의 Compare는 PC/Mobile 모두 Bottom Sheet를 사용한다 (PC 전용 예외가 아니라, Compare 자체가 Bottom Sheet 고정 case)

### 2.3. 타입별 규칙

#### 2.3.1. Confirmation

- `[MUST]` 사용자에게 확인/취소 등 양자택일 결정을 받아야 할 때 사용한다.
- `[MUST]` CTA는 2 Buttons, 가로 정렬(Left Outlined / Right Filled·Primary)로 구성한다.
- `[ALLOW]` titleText가 없으면 Body 텍스트만 있는 축소형 컨테이너로 표시한다.
- `[확인조건]` 답변 전 `platform`(PC/Mobile) 조건을 함께 확인한다 — Confirmation은 layout 분기가 없어 platform만 확정되면 답변 가능하다.

#### 2.3.2. Contents

- `[MUST]` 별도 결정 없이 정보나 미디어(이미지/영상)를 전달할 때 사용한다.
- `[MUST]` CTA는 0-1 Button, Filled·Primary로 구성한다.
- `[AVOID]` 사용자 확인/취소 등 양자택일 결정이 필요한 경우 이 case를 사용하지 않는다 → Confirmation 사용.
- `[확인조건]` 답변 전 `layout`(Standard/BottomSheet/Media) + `platform`을 함께 확인한다 — Contents는 3개 layout 모두에 존재해 layout을 특정하지 않으면 값이 갈린다.

#### 2.3.3. Input Data

- `[MUST]` 사용자 입력을 받거나 여러 옵션을 비교시킬 때 사용한다.
- `[MUST]` `subCase=Compare`가 아닌 일반 입력의 경우, CTA는 1-2 Buttons — PC는 가로 정렬(Left Outlined / Right Filled·Primary), Mobile은 세로 정렬(Bottom Outlined / Top Filled·Primary)로 반전된다.
- `[MUST]` `subCase=Compare`는 `layout=Bottom Sheet` 고정이며 PC/Mobile 둘 다 지원한다. CTA 버튼 개수는 비교할 제품 개수에 따라 `2~3개`로 가변된다.
- `[ALLOW]` 단순 동의/체크박스형 입력은 `subCase=Consent`로 분리한다. 체크박스 자체의 스타일은 이 문서가 아니라 디자인 시스템 가이드의 **Selection Control** 규칙을 따른다.
- `[확인조건]` 답변 전 `subCase`(일반/Compare/Consent) + `platform`을 함께 확인한다 — subCase에 따라 layout이 강제로 바뀌므로(Compare→BottomSheet 고정) subCase 확인이 선행되어야 한다.

#### 2.3.4. Notification

- `[MUST]` 시스템 알림·경고·앱 다운로드 유도 등에 사용한다.
- `[MUST]` CTA는 0-1 Button, Filled·Primary로 구성한다.
- `[ALLOW]` 경고성 안내는 `subCase=Alert`로 Supporting Visual(48x48)을 추가한다.
- `[ALLOW]` 앱 설치 유도는 `subCase=App Download`(Mobile Only)를 사용하며, 이 서브케이스만 폰트 패밀리가 Samsung Sharp Sans로 다르다.
- `[확인조건]` 답변 전 `subCase`(Default/Alert/App Download) + `platform`을 함께 확인한다 — App Download는 Mobile 전용이라 PC로 물으면 미지원 안내가 필요하다.

### 2.4. 예외 사례

- `[MUST]` `subCase=Consent`의 에러 텍스트 색상/버튼 활성화 조건, Alert의 container 상속처럼 미정(TBD)인 값은 추측하지 않고 미정으로 답한다. 단 체크박스 스타일 자체는 TBD가 아니라 Selection Control 가이드를 따른다고 안내한다.
- `[MUST]` 아래 3.의 소표에 없는 layout/case/subCase/platform 조합은 임의로 값을 만들지 않고 "지원하지 않는 조합"으로 안내한다.
- `[MUST]` 프로모션 배너형 팝업(홈 진입 시 뜨는 대형 이미지+CTA)은 4개 case 어디에도 해당하지 않으므로, 질문받으면 "현재 스코프 외 — 담당자 확인 필요"로 안내하고 case를 임의로 배정하지 않는다.
- `[MUST]` 팝업 카드 하단 중앙에 별도 원형 닫기 버튼이 있는 사례(예: TV 라이프스타일 비교 팝업)는 레거시 예외로 안내하고, 우상단 X 아이콘 1개가 현재 표준임을 함께 답한다.
- `[MUST]` `layout=Media`는 구조적으로 타이틀/서브타이틀/바디 텍스트 필드가 없다(확인 완료). 실제 samsung.com 홈페이지의 "영상 보기" 팝업처럼 텍스트가 붙어 보이는 사례가 있어도, 이는 Media 팝업 위/아래에 별도로 얹힌 콘텐츠이거나 다른 컴포넌트일 가능성이 높으므로 Media 자체의 스펙으로 안내하지 않는다.
- `[MUST]` Popup은 dark_bg 질문을 받으면 "지원하지 않음, 항상 light_bg 기준"으로 답한다 — 미정(TBD)이 아니라 구조적으로 없는 것이다.
- `[SHOULD]` `layout`을 명시하지 않은 질문에는 기본값 `Standard`로 우선 답하고, 다른 layout 가능성이 있는 case(Contents, Input Data)는 이를 덧붙인다.
<!-- Spacing 랜딩메뉴 — 작성법은 data/landingmenu/README.md (Figma updated.fig 기준) -->

# 타이틀
Spacing의 구성이에요.
어떤게 궁금하신가요?

## 핵심만 보기

### Inset
컴포넌트 및 요소 내부의 여백 기준

| Element Inset | 요소의 내부 여백 |
| Component Inset | 컴포넌트의 내부 여백 |
| Section Inset | 섹션 영역의 내부 여백 |

![](img_spacing_all_01)

### Gap
요소와 요소 사이의 간격 기준

| Element Gap | 요소 간 간격 |
| Component Gap | 컴포넌트 간 간격 |
| Section Gap | 섹션 간 간격 |

![](img_spacing_all_02)

### Grid
섹션 내 그리드 기반 반복 요소의 간격 기준

| Section Grid | 섹션 내부 균일한 간격 |

![](img_spacing_all_03)

## Inset

### Inset은 요소 내부 여백에 사용해요.
버튼, 카드, 모달, 입력 필드처럼 컨테이너 내부
요소와 경계 사이의 간격을 설정할 때 사용합니다.

필요한 경우 상·하 Padding을 다르게 적용할 수 있지만, 정의된 Spacing Token 내에서만 사용해요.

※ 요소 간 외부 간격에는 Inset을 사용하지 않습니다.

![](img_spacing_all_01)

추가 질문: 스펙 및 토큰

## Gap

### Gap은 요소와 요소 사이의 간격에 사용해요.
버튼 그룹, 칩, 아이콘과 텍스트처럼 여러 요소가 나란히 배치되거나 반복될 때 간격을 설정합니다.

가로·세로 방향에 따라 Gap을 다르게 적용할 수 있지만, 정의된 Spacing Token 내에서만 사용해요.

![](img_spacing_all_02)

추가 질문: 스펙 및 토큰

## Grid

### Grid는 섹션 내 그리드 기반 반복 요소의 간격에 사용해요.
버튼 그룹, 칩, 아이콘과 텍스트처럼 여러 요소가 나란히 배치되거나 반복될 때 간격을 설정합니다.

가로·세로 방향에 따라 Gap을 다르게 적용할 수 있지만, 정의된 Spacing Token 내에서만 사용해요.

※ 요소 내부 여백이나 섹션 간 구분에는 Gap을 사용하지 않습니다.

![](img_spacing_all_03)

추가 질문: 스펙 및 토큰

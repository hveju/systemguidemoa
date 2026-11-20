# System Guide Moa — Figma Plugin

디자인 시스템 가이드 챗봇 Figma 플러그인 (360×640).
가이드 DB(`data/`)에서 근거를 찾고, Gemini API가 그 근거만으로 답변을 정리합니다.

## 설치 (개발 모드)

1. Figma 데스크톱 앱 실행
2. 메뉴 → Plugins → Development → **Import plugin from manifest…**
3. 이 저장소의 `manifest.json` 선택
4. Plugins → Development → **System Guide Moa** 실행
5. 설정에서 Gemini API 키 입력 ([발급](https://aistudio.google.com/apikey))

## 구조

```
manifest.json            플러그인 정의 (창 360×640, generativelanguage.googleapis.com 허용)
code.js                  메인 스레드 — 선택 요소에 fill/fontSize 적용, API 키 저장
index.html               빌드 결과물 · 폰트·이미지·DB 인라인 단일 파일 (플러그인 로드 대상)
preview/ui.preview.html  빌드 결과물 · 브라우저 미리보기용 (assets/ 상대경로)
build.js                 빌드 스크립트 (node build.js)
src/ui.src.html          UI 소스 (토큰 __IMG_*__, __FONT_CSS__, __DB_JSON__ …)
src/gemini.js            검색·Gemini 호출 파이프라인 (빌드 시 ui에 인라인)
src/build.md             빌드·토큰·chunk 형식 설명
assets/                  이미지 원본, images.json(base64), 폰트 CSS, 마스코트 모션(webp)
data/DB_guide/           가이드 문서 (파일 1개 = 카테고리 1개)
data/DB_tokens/          디자인 토큰 (tokens.json = 검색용 chunk)
data/db_glossary/        용어·한글 표기 매핑
data/landingmenu/        카테고리별 랜딩 화면 (정해진 답변·이미지)
data/prompts/            Gemini 지시문 (역할 · 예외 · 출력 규칙)
data/easteregg.md        정해진 질문 → 정해진 답변
data/faq/DB_FAQ.csv      (선택) 답변 형식 예시
```

`index.html`, `preview/ui.preview.html`은 생성 파일입니다. `src/`를 수정한 뒤 `node build.js`로 다시 만드세요.
`data/` 수정은 재빌드 없이 실행 중에 반영됩니다 (미리보기: 로컬 data/ · 플러그인: GitHub main).

## 화면

| 화면 | Figma 프레임 |
|---|---|
| API 키 입력 | 모아_01-1_키입력 |
| 홈 | 모아_02_홈메인 |
| 챗봇 | 모아_03-1_챗봇 |
| 챗봇 답변중 | 모아_03-2_챗봇_답변중 |
| 답변 결과 | 모아_03-3_챗봇_답변 |
| 전체 메뉴 | 모아_04_카테고리 |
| 연결 끊김 | 모아_06 |

## 답변 흐름

1. 이스터에그 → 랜딩메뉴(정해진 답변) → 가이드 DB 정확 매칭 순으로 먼저 확인 (키 불필요)
2. 없으면 Gemini: 키워드 추출 → 카테고리 판별 → 가이드·토큰 검색 → 근거 검증 → 답변 생성
3. 창 이동 없이 한 화면에서 대화 · 카테고리 창에서 직접 입력한 질문도 전체 DB 검색, 여러 카테고리에 겹치면 어떤 카테고리인지 질문
4. 가이드 파일이 없는 카테고리는 토큰과 랜딩 설명을 근거로 사용
5. 가벼운 대화: 카테고리·용어·디자인 단어·수치가 없는 질문만 Gemini가 먼저 판단(`moaChat`) → 인사·감사 등 일상 대화면 1~2문장으로 답하고 가이드 질문으로 안내 · 디자인 관련이면 일반 검색으로 넘김 (디자인 내용·수치·링크는 생성 금지, 섞이면 버림)

### Gemini 모델

- 순서: `gemini-3.1-flash-lite` → `gemini-flash-lite-latest` → `gemini-3.8-flash` → `gemini-3.5-flash`
- lite가 "가이드에 해당 내용이 없습니다"로 답하면 상위 모델(3.8-flash~)로 한 번 더 확인
- 오류 시 다음 모델로: 400(생각 설정 거부 → 설정 없이 재시도), 429(하루 한도 → 당일 건너뜀), 503·빈 응답·10초 무응답(5분 건너뜀)
- 설정 화면에 현재 모델과 오늘 남은 사용량(추정) 표시

### 답변 불가 안내

- 질문 인식 불가: "‘입력한 키워드’에 대해 정확히 인식하지 못했어요. 원하시는 내용을 다시 질문해 주세요."
- DB 범위 초과·결과 없음: "문의하신 내용은 시스템에 등록되어 있지 않아요. 검색어를 변경하거나 전체 목록을 확인해 보세요."

## 답변 표기 규칙

- 답변 버블 최대 276px, 안쪽 여백 16px · 단어 단위 줄바꿈 (토큰명은 `_` `/` 뒤에서)
- 바디텍스트 `#424751` · 3문장 이상 문단은 2문장씩 분리
- 불릿(•, -, 1.) 다음 줄은 불릿 뒤 텍스트에 맞춰 들여쓰기
- 스펙·토큰 답변: 불릿 줄 전체 `#000000`, 영문 소문자(HEX 제외)
  · `항목: 값`이 한 줄(244px)에 안 들어가면 값을 다음 줄로
- 컬러칩: 투명도 그대로 표시 · 흰 바탕 기준 `#DDDDDD` 이상 밝으면 테두리 `#707070` 40%
- 카테고리 창의 첫 번째 답변에는 '이전으로' 없음

## 기능

- 카테고리 칩 / 전체 메뉴 바텀시트에서 주제 선택
- 질문 칩 또는 직접 입력 (Enter 전송, Shift+Enter 줄바꿈, 최대 20줄)
- 답변 카드: 컬러 스와치 · 타입 스케일 · 텍스트(타이핑 애니메이션)
- **컬러칩 클릭 → 선택한 Figma 요소의 fill 적용**
- **타입 행 클릭 → 선택한 텍스트의 fontSize 적용**
- 복사, 이전으로, 대화 초기화
- 대화 히스토리: 최근 질문 30개 저장(플러그인 `clientStorage` `moa-history` / 미리보기 localStorage) · Gemini 참고 대화는 최근 5개
- 대화 검색: Cmd/Ctrl+F → 상단 검색바 (Enter 다음 · Esc/빈 곳 클릭 닫기)
- 짧은 맞장구(웅·응·그래…)는 "네!"로 답변
- API 키는 `figma.clientStorage`(`moa-gemini-key`)에 저장

## 라이선스

Pretendard — SIL Open Font License 1.1 (github.com/orioncactus/pretendard)

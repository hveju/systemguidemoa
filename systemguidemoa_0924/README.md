# System Guide Moa — Figma Plugin

디자인 시스템 가이드 챗봇 Figma 플러그인. 360×640, 목업 답변 기반이며 추후 Gemini API + DB 연동 예정.

## 설치 (개발 모드)

1. Figma 데스크톱 앱 실행
2. 메뉴 → Plugins → Development → **Import plugin from manifest…**
3. 이 저장소의 `manifest.json` 선택
4. Plugins → Development → **System Guide Moa** 실행

## 구조

```
manifest.json          플러그인 정의 (창 360×640)
code.js                메인 스레드 — 선택 요소에 fill/fontSize 적용, API 키 저장
index.html             빌드 결과물. 폰트·이미지가 인라인된 단일 파일 (실제 로드 대상)
src/ui.src.html        UI 소스. 이미지 자리는 __IMG_*__, 폰트는 __FONT_CSS__ 토큰
src/build.md           빌드 방법
preview/ui.preview.html  브라우저 미리보기용 (assets/ 상대경로)
assets/                이미지 원본 및 인라인용 base64 데이터
```

`index.html`은 생성 파일입니다. 수정은 `src/ui.src.html`에서 하고 다시 빌드하세요 (`src/build.md` 참고).

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

## 기능

- 카테고리 칩 / 전체 메뉴 바텀시트에서 주제 선택
- 질문 칩 또는 직접 입력 (Enter 전송, Shift+Enter 줄바꿈, 최대 20줄)
- 답변 카드: 컬러 스와치 · 타입 스케일 · 텍스트(타이핑 애니메이션)
- **컬러 스와치 클릭 → 선택한 Figma 요소의 fill 적용**
- **타입 행 클릭 → 선택한 텍스트의 fontSize 적용**
- 복사 버튼, 이전으로, 대화 초기화
- API 키는 `figma.clientStorage`(`moa-gemini-key`)에 저장

## Gemini 연동 시

1. `manifest.json`의 `networkAccess.allowedDomains`에 `https://generativelanguage.googleapis.com` 추가
2. `src/ui.src.html`의 `GUIDE` 목업 객체를 API 응답으로 교체
   `renderAnswer`가 `{kind:'colors'|'type'|'text', ...}` 형태를 그대로 받습니다
3. 다시 빌드

## 라이선스

Pretendard — SIL Open Font License 1.1 (github.com/orioncactus/pretendard)

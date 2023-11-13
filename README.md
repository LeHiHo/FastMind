# FastMind!

[![Deployment](https://img.shields.io/badge/deploy-배포링크-38B2AC.svg)](https://fastmind.vercel.app/)

### 0️⃣ Git convention

### ✅ Work Flow

1. [기능 명세](https://www.notion.so/3cf9d3288f494479881b754bcecd230c?v=b414ffa4e22f404c9ba3918cfa639889) 를 기반으로 `Issue` 생성
2. 생성한 `Issue` 번호로 로컬에서 브랜치 생성(feature/#이슈번호)
3. `dev`의 최신변경사항을 pull 받아서 동기화
4. 구현완료후 `dev`로 push후 Pull Request 생성
5. 14:00에 팀원들과 함께 conflict 해결 후 `dev`로 merge
6. 브랜치 삭제후 1번으로

### ✅ Commit log

```
Feat : 새로운 기능 추가
Fix : 버그 수정
Style : 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만)
Refactor : 코드 리팩토링 (더 효율적인 코드로 변경 등)
Design : CSS 등 디자인 추가/수정
Comment : 주석 추가/수정
Docs : 내부 문서 추가/수정
Test : 테스트 추가/수정
Chore : 빌드 관련 코드 수정, 개발 환경 관련 설정
Move : 파일 및 폴더명 수정
Remove : 파일 삭제
```

### ✅ Branch Naming

```
feature/#이슈번호
```

### ✅ Branch strategy

### `main`

- 소비자가 사용하는 제품이 존재하는 (배포될 코드가 있는) 브랜치
  - PR받는 브랜치: `dev`
  - Pull Request merge 완료후 `dev` push 받기

### `dev(develop)`

- 개발 단계의 코드가 있는 (개발의 중심) 브랜치
- 개발 자체는 feature 브랜치에서 진행
  - PR받는 브랜치: `feature/#이슈번호`
  - 14:00에 다같이 Pull Request merge

### `feature/#이슈번호`

- 특정한 기능 (단위 기능) 을 구현하는 브랜치
- 기능 구현이 완료되면, `dev`로 pr
  - PR나가는 브랜치: dev
  - 구현완료시 Push후 Pull Request 생성

---

### 1️⃣ 폴더 구조

```
📦src
 ┣ 📂api ➡️ API 요청관련 코드
 ┣ 📂components ➡️ 재사용가능 코드
 ┃ ┣ 📂layout ➡️ 레이아웃 컴포넌트(ex. header, footer, navigator)
 ┃ ┗ 📂template ➡️ 특정 페이지에서 사용되는 컴포넌트
 ┣ 📂hooks  ➡️ Custom Hooks 관련코드
 ┣ 📂interfaces ➡️ TypeScript 인터페이스,타입 관련 코드
 ┣ 📂pages
 ┃ ┣ 📂lobby
 ┃ ┃ ┗ 📜gameLobby.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜userJoin.tsx
 ┃ ┃ ┗ 📜userLogin.tsx
 ┃ ┗ 📂room
 ┃ ┃ ┗ 📜gameRoom.tsx
 ┣ 📂provider ➡️ 전역상태관리 관련 코드
 ┃ ┣ 📜authContext.tsx
 ┃ ┗ 📜authProvider.tsx
 ┣ 📂router
 ┃ ┣ 📜LoginRouter.tsx
 ┃ ┗ 📜MainRouter.tsx
 ┣ 📂styles
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

---

### 2️⃣ Dependencies

- **UI Frameworks & Styling**

  - `@chakra-ui/react` v2.8.1 - 리액트 애플리케이션 구축을 위한 기본 블록 제공.
  - `@emotion/react` v11.11.1 - 성능과 유연성이 뛰어난 CSS-in-JS 라이브러리.
  - `@emotion/styled` v11.11.0 - 리액트용 스타일 컴포넌트 라이브러리.
  - `styled-components` v6.1.0 - 컴포넌트 단위의 스타일링을 위한 라이브러리.
  - `framer-motion` v10.16.4 - 리액트 애니메이션 구현 라이브러리.

- **Data Fetching**

  - `axios` v1.6.0 - HTTP 클라이언트 라이브러리, 프로미스 기반의 비동기 통신 지원.

- **TypeScript & Type Definitions**

  - `@types/react-dom` v18.2.14 - 리액트 DOM 타입스크립트 정의.
  - `@types/react` v18.2.36 - 리액트 타입스크립트 정의.
  - `typescript` v5.2.2 - 자바스크립트에 타입 추가, 일반 자바스크립트로 컴파일.

- **Linting & Formatting**

  - `@typescript-eslint/eslint-plugin` v6.10.0 - 타입스크립트 코드베이스를 위한 ESLint 플러그인.
  - `@typescript-eslint/parser` v6.10.0 - ESLint가 타입스크립트 소스 코드 린트 가능하게 하는 파서.
  - `eslint-plugin-react-hooks` v4.6.0 - 리액트 함수 내 Hooks 규칙 강제.
  - `eslint-plugin-react-refresh` v0.4.4 - 리액트 리프레시 위한 플러그인.
  - `eslint` v8.53.0 - 자바스크립트 및 JSX를 위한 린팅 유틸리티.
  - `prettier` v3.0.3 - 코드 포맷팅 도구.

- **Build Tools**

  - `@vitejs/plugin-react-swc` v3.4.1 - 리액트 프로젝트 SWC 사용을 위한 Vite 플러그인.
  - `vite` v4.5.0 - 현대 웹 프로젝트를 위한 빠르고 가벼운 개발 경험 제공 도구.

- **React & Router**

  - `react-dom` v18.2.0 - DOM 작업을 위한 리액트 패키지.
  - `react-router-dom` v6.18.0 - 리액트 라우터 DOM 바인딩.
  - `react` v18.2.0 - 사용자 인터페이스 구축을 위한 자바스크립트 라이브러리.

---

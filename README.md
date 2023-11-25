<div align="center">

<img src="https://github.com/LeHiHo/FastMind/assets/37584686/6e7fe4ca-ff6d-4a4d-b572-20e799a8c2c7" width=300>

### 패스트캠퍼스 토이프로젝트2 한조팀의 FastMind 게임 💻 프론트엔드

<p align="center">
  <a href="https://fastmind.vercel.app/">
    <img src="https://img.shields.io/badge/FastMind-white?style=for-the-badge&logoColor=white" alt="wiki"/>
  </a>
</p>

</div>

<br/>

## 📝 프로젝트 소개

`FastMind`는 창의적이고 상호작용이 풍부한 웹 애플리케이션입니다. 이 프로젝트는 그림판과 채팅 기능을 통합하여 아래 두 가지 주요 방식으로 사용됩니다.

1. 게임 모드: 사용자 중 한 명이 출제자가 되어, 퀴즈를 내고 관련된 그림을 그립니다. 그 후, 다른 참여자들이 그림을 바탕으로 퀴즈의 답을 맞추는 대화형 웹 게임입니다.
2. **협업 모드**: 사용자들은 그림판에 직접 그림을 그리며, 실시간으로 공유하고 채팅을 통해 아이디어를 교환합니다. 이 모드는 회의, 브레인스토밍, 또는 일반 대화에 이상적으로 활용됩니다.

게임 서버는 [이곳](https://github.com/seacrab808/Fastmind-server)을 클릭해 주세요.  
채팅 서버는 [이곳](https://github.com/GyoHeon/chat-back)을 클릭해 주세요.  
피그마는 [이곳](https://www.figma.com/file/Hqwygf0k7CoF0BloFTn729/%ED%95%9C%EC%A1%B0?type=design&node-id=0-1&mode=design&t=yNhmQ8W65uAUDQvI-0)을 클릭해 주세요.

TEST용 ID: ivegaeul  
TEST용 PASSWORD: ivegaeul

<br/>

## ✔️ 요구 사항

### 필수 구현 사항

- [x] `useState` 또는 `useReducer`를 활용한 상태 관리 구현
- [x] `Sass`, `styled-component`, `emotion`, `Chakra UI`, `tailwind CSS` 등을 활용한 스타일 구현
- [x] `react` 상태를 통한 CRUD 구현
- [x] 상태에 따라 달라지는 스타일 구현
- [x] `custom hook`을 통한 비동기 처리 구현
- [x] 유저인증 시스템(로그인, 회원가입) 구현
- [x] `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
- [x] 소켓을 이용한 채팅 구현

### 선택 구현 사항

- [x] `typescript`를 활용한 앱 구현

<br/>

## 🛠️ 기술 스택

### FrontEnd

#### Language

<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">

#### Development

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&logoColor=white)
![StyledComponents](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)

#### CI/CD

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

#### Design

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

<br>

### Chatting BackEnd

#### Language

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

#### Framework

![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)

#### DB

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

#### Infra

![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)

#### CI/CD

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900.svg?style=for-the-badge&logo=Amazon-EC2&logoColor=white)

<br>

### Game BackEnd

#### Language

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

#### Framework

![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)

#### Infra

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

#### CI/CD

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

<br/>

## 📚 주요 기능

<div align="center">
  <table>
    <tr align="center">
      <th>채팅/그림</th>
      <th>채팅/게임</th>
    </tr>
    <tr>      
      <td><img src="https://github.com/LeHiHo/FastMind/assets/134940630/589887ff-4530-484e-870e-29df2ec11271" alt="chatting/painting" width="370"></td>
      <td><img src="https://github.com/LeHiHo/FastMind/assets/134940630/98f4aa75-d96f-453d-8c3d-c51f26c1a129"alt="chatting/game" width="370"></td>      
    </tr>      
    <tr align="center">
      <th>1대1채팅</th>
      <th>리다이렉션</th>
    </tr>
    <tr>
      <td><img src="https://github.com/LeHiHo/FastMind/assets/134940630/f29dc190-4b3a-495e-be88-fa98cee49df9" alt="1:1chatting" width="370"></td>      
      <td><img src= "https://github.com/LeHiHo/FastMind/assets/134940630/d1babdca-960f-41e5-9588-9cc29ebbdd4e"alt="
redirection" width="370"></td>      
    </tr>
  </table>
</div>

<br>

## 📓주요 기능 설명

<details><summary><strong>로그인/ 회원가입</strong></summary>

<details> <summary><strong>보안 및 사용자 인증</strong></summary>

본 프로젝트의 로그인 및 회원가입 기능은 엑세스 토큰과 리프레시 토큰을 쿠키를 통해 관리하여 사용자 인증의 안전성을 강화했습니다.

</details>

<details><summary><strong>회원가입 기능</strong></summary>

회원가입 과정에서는 다음과 같은 검증 로직을 적용하여 사용자 경험의 질을 향상시켰습니다:

- **아이디 검증**: 사용자의 아이디는 알파벳만 사용 가능하며, 특정 길이 제한을 충족해야 합니다.
- **비밀번호 확인**: 사용자가 입력한 비밀번호의 일치 여부를 검증하고 특정 길이 제한을 충족해야 합니다.
- **아이디 중복 체크**: 이미 가입된 아이디는 사용할 수 없도록 하여, 중복 가입을 방지합니다.

회원가입 과정 중 발생할 수 있는 다양한 에러(예: 네트워크 에러, 이미지 파일명 및 용량 관련 에러)는 사용자에게 명확한 피드백을 제공합니다.
</details>

<details><summary><strong>로그아웃 기능</strong></summary>

사용자가 로그아웃할 때, 보안을 위해 관련 쿠키를 삭제하는 로직을 구현하여, 사용자의 세션 정보를 안전하게 관리합니다.

</details>
</details>

<details><summary><strong>로비</strong></summary>

<details><summary><strong>방 만들기</strong></summary>

- **방 생성 로직**: 사용자가 새로운 게임방을 만들 때, 서버로 생성된 방 정보를 전달하고, 게임방으로 자동 이동됩니다.
- ** 랜덤 방 이름 생성**: 게임 방 만들기 기준에 맞춰 기본 제공 방 제목 데이터를 랜덤하게 제공하고, 값을 입력하지 않을 시 제공된 방 제목으로 방을 생성합니다.
- **방 이름 설정**: 방을 만드는 사용자는 방의 이름을 직접 지정하거나, 랜덤으로 생성된 이름을 사용할 수 있습니다. 이는 사용자에게 유연성을 제공합니다.
- **고유 ID 및 경로 이동**: 생성된 방은 고유한 ID를 부여받으며, 사용자는 **`/room/:방 고유 id`** 경로로 이동하여 해당 방에 접근할 수 있습니다.

</details>

<details><summary><strong>게임방 목록</strong></summary>
  
- **목록 표시**: 생성된 모든 방은 배열을 사용하여 화면에 나열됩니다. **`map`** 함수를 활용하여 각 방의 정보가 목록으로 표시됩니다.
- **페이지네이션**: 방이 많아질 경우를 대비하여, 목록에는 페이지네이션 기능이 구현되어 있습니다. 이를 통해 사용자는 페이지 당 최대 10개의 방을 볼 수 있습니다.
- **방 정보 표시**: 각 방 목록에는 방 번호, 방 제목, 현재 참가하고 있는 인원 수가 표시됩니다.
- **입장 제한**: 각 방은 최대 4명까지 참여할 수 있으며, 이 인원이 채워지면 더 이상의 입장은 불가능합니다.
- **방 정렬 기능** : 모든 방은 서버에서 받은 데이터 중 createdAt을 사용하여 최신순 정렬됩니다. select 선택으로 모든방 또는 입장 가능한 방을 구분할 수 있습니다.

</details>

<details><summary><strong>온라인 유저 리스트</strong></summary>
  
- **온라인 유저 목록** : 소켓 이벤트 **users-server-to-client**를 통해 온라인 유저 정보를 저장하고, 출력합니다. 각 유저 정보에는 해당 유저와 같이 게임방을 생성할 수 있는 버튼과, 1:1 대화를 생성할 수 있는 버튼이 같이 출력됩니다.

</details>

<details><summary><strong>프로필</strong></summary>

- **프로필 사진 변경**: 사용자는 자신의 프로필에서 사진을 업로드하거나 변경할 수 있습니다. (없다면 기본 이미지)
- **닉네임 변경**: 사용자는 프로필에서 자신의 닉네임을 원하는 대로 설정하거나 변경할 수 있습니다.
- **로그아웃**: 사용자는 언제든지 안전하게 로그아웃할 수 있습니다. 로그아웃 시 쿠키가 삭제됩니다.

</details>
</details>

<details><summary><strong>채팅</strong></summary>
  
- **1:1 대화 목록** : 참여 중인 채팅방 중 isPrivate 값이 true인 채팅방들만 반환합니다. 해당 목록에는 같이 대화 나누는 유저의 정보와 온라인 여부가 표시됩니다.
- **1:1 대화 생성** : 유저 Id를 검색 후 선택하면 해당 유저와 1:1 채팅방이 있는지 검토 후, 없을 경우 새로운 채팅방을 생성, 있을 경우 기존 채팅방을 출력합니다.
- **채팅 소켓 연결** : 모달 생성 시점 / 게임방 입장 시점에 채팅 소켓으로 연결되며, 이전 대화 기록을 불러옵니다. 소켓 연결된 시점 부터 실시간으로 데이터를 전송 받아 대화창에 실시간 대화 메세지가 출력됩니다. input 창에 텍스트를 입력하여 submit하면, **message-to-server** emit 이벤트를 실행시켜, 서버로 채팅을 전송할 수 있습니다.
- **채팅 로직** : 정보의 혼잡성을 줄이기 위해 동일한 유저가 여러번 메세지를 전송하거나, 동일한 시간 혹은 날짜에 메세지를 전송하는 경우 각 동일한 값은 한번씩만 출력되도록 로직을 구현하였습니다.
</details>

<details><summary><strong>게임 방</strong></summary>
  
- **참여 유저 목록** : url 파라미터값을 가져와 REST API로 특정 채팅방의 데이터를 조회 후 출력합니다. 소켓 **join/leave** 이벤트를 통해 유저가 입장, 퇴장했을 때 유저 목록 데이터 값을 정정하여 다시 출력합니다.
- **기타 편의 기능** : 방 제목, 방 번호, 방 인원수를 출력합니다. 참여 유저 목록과 같은 API를 사용합니다. 

</details>

<details><summary><strong>그림판</strong></summary>
  
- **Canvas API**: 본 프로젝트의 그림판 기능은 HTML5의 Canvas API를 활용하여 구현되었습니다.
- **실시간 통신**: 실시간 사용자 상호작용을 위해 [Socket.io](http://socket.io/)를 사용하였으며, 사용자 간의 그림 데이터 공유 및 통신을 위해 자체적으로 구축한 백엔드 서버에 연결합니다.
- **서버 배포**: 프로젝트의 백엔드 서버는 Heroku를 통해 배포되었습니다. node.js/Express/Babel 등을 사용했습니다. 


<details><summary><strong>주요 기능</strong></summary>

- **색상 선택**: 사용자는 다양한 색상 팔레트에서 마음대로 색을 선택할 수 있습니다.
- **그리기 도구**: 부분 지우개와 전체 지우기 기능을 통해 사용자는 쉽게 그림을 수정할 수 있습니다.
- **굵기 조절**: 사용자는 선의 굵기를 자유롭게 조절하여 다양한 표현을 할 수 있습니다.

그림판에서의 사용자 작업은 다음과 같은 형식으로 서버로 전송됩니다.

```tsx
originalMousePosition: {
  x: number;
  y: number;
};
  newMousePosition: {
  x: number;
  y: number;
};
  option: {
    color: string;
    lineWidth: number;
    roomId: string;
  };
```

- **`originalMousePosition`**: 현재 마우스 위치 (x, y 좌표)
- **`newMousePosition`**: 새로운 마우스 위치 (x, y 좌표)
- **`option`**: 작업 옵션 (선택된 색상, 선의 굵기, 방 ID)

</details>
</details>

<details><summary><strong>게임 로직</strong></summary>

 - 유저 진입 시 게임 소켓에 연결하고 roomId를 기준으로 방을 선정해 유저를 나눕니다.
 - 게임 시작 버튼 클릭 시 퀴즈 배열의 roomId번 인덱스에 클릭한 클라이언트의 쿠키 내 userId를 지정합니다.
 - 게임 시작 버튼 클릭 후 모달 내 답안 입력 시 정답 배열의 roomId번 인덱스에 정답을 설정합니다.
 - 채팅을 친 유저, 채팅 값, roomId와 쿠키 내 userId을 서버에 보냅니다.
 - 만약 답변을 한 유저가 퀴즈 배열의 roomId번 인덱스와 다르고 답변을 한 유저의 답안이 정답 배열의  roomId번 인덱스와 같다면, 출제자가 아니면서 답변을 맞혔다는 뜻이므로 해당 하는 방 내 모든 클라이언트들에게 승자를 선정해 데이터를 보냅니다.
 - 다음 게임을 위해 서버에서는 해당하는 roomId번 인덱스의 퀴즈 배열과 정답 배열을 초기화 해줍니다.
 - 승자 데이터가 쿠키 내 userId와 같다면 정답을 맞혔다는 모달을 띄워줍니다.
 - 다르다면 타 유저가 정답을 맞혔다는 모달을 띄워줍니다.
 - 이 후, 게임 시작 버튼 클릭 시 게임이 재시작 됩니다.
 - ⏰ 게임 중, 언제든 게임 시작 버튼을 눌러도, 해당하는 roomId번 인덱스의 정답 배열 및 퀴즈 배열의 덮어씌움으로 언제든 재 시작이 가능합니다.
</details>


## 🖌️ 프로젝트 아키텍처

<div align="center">
  
<img src="https://github.com/LeHiHo/FastMind/assets/93272421/d12f2a2c-123a-410d-bcca-253e98994453" />


</div>

<br/>

## 📂 폴더 구조

```
  📦src
 ┣ 📂api
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜socket.ts
 ┣ 📂components
 ┃ ┣ 📂layout
 ┃ ┗ 📂template
 ┃ ┃ ┣ 📂lobby
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┗ 📂room
 ┣ 📂hooks
 ┃ ┣ 📜useLoginSocket.ts
 ┃ ┗ 📜useleaveHandle.ts
 ┣ 📂interfaces
 ┣ 📂pages
 ┃ ┣ 📂lobby
 ┃ ┃ ┗ 📜gameLobby.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜userJoin.tsx
 ┃ ┃ ┗ 📜userLogin.tsx
 ┃ ┗ 📂room
 ┃ ┃ ┗ 📜gameRoom.tsx
 ┣ 📂router
 ┃ ┗ 📜MainRouter.tsx
 ┣ 📂states
 ┃ ┗ 📜atom.ts
 ┣ 📂util
 ┣ 📜App.tsx
 ┣ 📜constant.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

<br/>

## 🧑🏻‍💻 팀 소개 및 역할
| 장호진 (FE & BE)  <br> 팀장 | 양재혁 (FE & BE) <br> 팀원 | 신하연 (FE) <br> 팀원 | 소유나 (FE & BE)  <br> 팀원 | 이교헌 멘토님 (BE) <br> 멘토님|
|:---------------------:|:-----------------------:|:---------------------:|:-----------------------:|:---------------------:|
| <img height="100" src="https://avatars.githubusercontent.com/leHiHo" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/yangjaehyuk" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/gkdus2217" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/seacrab808" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/GyoHeon" width="100"/> |
| [leHiHo](https://github.com/leHiHo) | [yangjaehyuk](https://github.com/yangjaehyuk) | [gkdus2217](https://github.com/gkdus2217) | [seacrab808](https://github.com/seacrab808) | [GyoHeon](https://github.com/GyoHeon) |
|<ul><li>로그인</li><<li>초기설정</li><li>폴더구조설계</li><li>게임 로직 구현</li><li>게임 소켓 구현</li><li>게임 소켓 연결</li><li>게임 서버 구현</li><li>프론트엔드 배포</li><li>백엔드 배포</li></ul> | <ul><li>REST API 연결</li><li>서버 소켓 연결</li><li>게임 서버 구현</li><li>게임 로직 구현</li><li>게임 소켓 구현</li><li>게임 소켓 연결</li><li>게임방 유저 목록 구현</li><li>방 만들기 구현</li><li>폴링 로직 구현</li><li>온라인 유저 목록 구현</li></ul> | <ul><li>채팅 소켓 연결</li><li>1대1 채팅 구현</li><li>게임방 채팅 구현</li><li>검색 기능 구현</li><li>페이지네이션</li><li>로비 및 헤더 UI</li><li>방 목록 정렬</li><li>피그마 UI 제작</li></ul> | <ul><li>그림판 구현</li><li>그림판 소켓 구현</li><li>그림판 소켓 연결</li><li>게임 서버 세팅</li><li>게임 서버 구현</li><li>게임방 UI</li></ul>  | <ul><li>채팅 서버 구현</li><li>채팅 서버 배포</li></ul> |

<br/>

## ✍️ 회고

### 장호진

프로젝트 초기에 2주만에 게임을 만들 수 있을까라는 생각이 들었지만, 유나님은 그림판 구현경험이있고, 재혁님은 게임 구현경험, 하연님은 웹소켓 경험이 있어서 믿고 열심히 할 수 있었습니다!!  
재혁님 유나님과 함께한 게임로직, 백엔드 소켓 로직, 백엔드 배포를 수행하면서 기존 프론트엔드에서 경험하지 못했던것들을 경험 할 수 있어서 좋았습니다.  
하연님의 전문적인 퍼블리싱으로 초기 UI를 엄청나게 업그레이드 시켜주셔서 구현하며서 이런게 현업의 감각이구나 라는걸 느꼈습니다.  
4명임에도 불구하고 완성도높은 결과물을 위해 다들 새벽까지 개발 하시느라 고생하셨습니다!🏹

### 양재혁

이전에 SockJS와 Stomp를 이용하여 웹 게임 구현 경험이 있어 수월할 줄 알았으나 게임 로직을 구현하면서 백엔드 팀원이 없어 게임 개발에 난항을 겪었습니다.  
결국 백엔드 공부도 따로 하며 직접 백엔드를 구현하고 배포하게 되었습니다.  
이번 프로젝트에서 저희 팀원들 모두가 열심히 해주셔서 감사합니다.  
2주 안에 채팅과 게임 솔직히 못 할 줄 알았는데 우리 팀원들 대단하신 것 같습니다!  
다음 프로젝트도 이번 팀처럼 열정적이고 능력 있는 분들이랑 하고 싶습니다 ^~^

### 소유나

캐치마인드에 진심이었지만 서비스가 종료되어서 저희가 직접 만들기로 했다 ^!^ 🏹  
이번 과제 특성 상 역할 분배가 어려워서 조금 아쉬웠지만 이번 기회로 리액트를 확실하게 배운 것 같고 소켓과 백엔드까지 관심을 갖게 되었다. 🎇  
컨셉충인 나는 내가 좋아하는 것을 만드는게 조금 더 욕심과 열정을 갖고 만들 수 있다는 것을 다시 깨달았다. 😉  
이번 프로젝트에서 가장 많이 얻어 가는 것은 공부 의지와 욕심이다❗  
모두 잠도 안 자고 매일 새벽까지 밤 새서 기능 구현에 힘썼는데, 그런 열정을 다음 프로젝트에 계속 이어나갈 수 있을 것 같다. 💪  
주어진 과제 이상으로 게임 로직과 백엔드 구현까지 경험해서 정말 뜻깊은 2주였다. 🐤

### 신하연

지나고 보니 정신없이 달려온 2주였던 것 같습니다.  
처음에 역할 분배를 했지만, 역할 분배가 어려워 난항을 겪었고, 정해진 역할 분배와 다르게 기능을 구현한 감이 있어서 그 부분은 아쉽습니다.  
초기 디자인 UI를 피그마로 제작했으나, 뜻하지 않게 디자인과 다르게 구현된 부분도 있어 디자이너로의 욕심을 내려놓는 법을 조금이나마 배운 것 같습니다.  
다들 새벽, 주말 가리지 않고 열심히 작업했으며, 서로 화이팅하려는 분위기를 만들려고 조원들 모두가 힘썼습니다.  
배포 직전 채팅 소켓 오류 디버깅으로 꽤나 골치를 썩었고, 그런 디버깅을 하면서 소켓 연결과 리액트에 이해가 높아진 것 같아 많이 배웠다는 생각이 듭니다.  
모두 고생하셨습니다.

<br>

## 📆 기간

`2023.11.06 ~ 2023.11.17`

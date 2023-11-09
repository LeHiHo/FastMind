import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
// import OnlineUserList from '../../components/layout/onineUserList';
// import UserList from '../../components/layout/userList';
import { Button } from '@chakra-ui/react';
import { handleGetAllUsers } from '../../util/util';
import { handlePostRefresh } from '../../util/util';
import { accessTokenState } from '../../states/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const GameLobby = () => {
  const setAccessToken = useSetRecoilState(accessTokenState); // hook 규칙으로 함수 외부에있어야함

  const accessToken = useRecoilValue(accessTokenState);
  return (
    <>
      <Button onClick={handlePostRefresh(setAccessToken)}>토큰재발급</Button>
      <Button onClick={handleGetAllUsers(accessToken)}>모든유저보기</Button>
      {/* <UserList></UserList> */}
  return (
    <>
      <UserList></UserList>

      <br></br>
      <OnlineUserList />
      <br></br>
      <OfflineUserList />
      <br />
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
    </>
  );
};

export default GameLobby;

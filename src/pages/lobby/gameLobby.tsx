import { useState } from 'react';
import { getUsers } from '../../api/index';
import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import { Button } from '@chakra-ui/react';
import { handleGetAllUsers } from '../../util/util';
import { handlePostRefresh } from '../../util/util';
import { accessTokenState } from '../../states/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OfflineUserList from '../../components/layout/offlineUserList';
import OnlineUserList from '../../components/layout/onlineUserList';
import UserList from '../../components/layout/userList';
import UserLogout from '../login/userLogout';
import CheckPrivateChat from '../../components/layout/checkPrivateChat';

const GameLobby = () => {
  const setAccessToken = useSetRecoilState(accessTokenState); // hook 규칙으로 함수 외부에있어야함

  const accessToken = useRecoilValue(accessTokenState);
  const [imgsrc, setImgsrc] = useState('');

  async function fetchUserData() {
    try {
      const res = await getUsers(accessToken, 'hojin');
      const user = res;
      setImgsrc(user.data[4].picture);
    } catch (error) {
      console.error(error);
      // 에러 처리 로직
    }
  }

  return (
    <>
      <Button onClick={fetchUserData}>이미지나와랏</Button>
      <Button onClick={handlePostRefresh(setAccessToken)}>토큰재발급</Button>
      <Button onClick={handleGetAllUsers(accessToken)}>모든유저보기</Button>
      <h2 style={{ fontWeight: 'bold' }}>1:1대화</h2>
      <CheckPrivateChat></CheckPrivateChat>
      <UserList></UserList>
      <br></br>
      <OnlineUserList />
      <br></br>
      <OfflineUserList />
      <br />
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
      <br></br>
      <UserLogout />
    </>
  );
};

export default GameLobby;

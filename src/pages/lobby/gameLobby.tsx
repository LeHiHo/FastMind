import { useEffect, useState } from 'react';
import { getUserData } from '../../api/index';
import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import { Button } from '@chakra-ui/react';
import { accessTokenState } from '../../states/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OfflineUserList from '../../components/layout/offlineUserList';
import OnlineUserList from '../../components/layout/onlineUserList';
import UserList from '../../components/layout/userList';
import UserLogout from '../login/userLogout';
import CheckPrivateChat from '../../components/layout/checkPrivateChat';
import MyUserData from '../../components/layout/MyUserData';
import UserProfile from '../../components/template/userProfile';
import { controlLobbyReload, controlBack } from '../../hooks/leaveHandle';

const GameLobby = () => {
  const setAccessToken = useSetRecoilState(accessTokenState); // hook 규칙으로 함수 외부에있어야함
  const accessToken = useRecoilValue(accessTokenState);
  const [imgsrc, setImgsrc] = useState('');
  controlLobbyReload();
  controlBack();
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await getUserData(accessToken, 'hojin');
        const user = res;
        console.log(user);
        setImgsrc(user.data[4].picture); // 이미지 소스 업데이트
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData(); // 함수 호출
  }, [accessToken]); // accessToken이 변경될 때마다 함수 호출

  return (
    <>
      <UserProfile userImg={imgsrc}></UserProfile>
      {/* <Button onClick={fetchUserData}>이미지나와랏</Button> */}
      {/* <Button onClick={handlePostRefresh(setAccessToken)}>토큰재발급</Button> */}
      {/* <Button onClick={handleGetAllUsers(accessToken)}>모든유저보기</Button> */}
      <h2 style={{ fontWeight: 'bold' }}>1:1대화</h2>
      <CheckPrivateChat></CheckPrivateChat>
      <UserList></UserList>
      {/* <MyUserData></MyUserData> */}
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

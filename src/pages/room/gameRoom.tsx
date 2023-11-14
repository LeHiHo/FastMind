import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chattingIdState } from '../../states/atom';
// import InviteGameRoom from '../../components/template/inviteGameRoom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
// import CheckUser from '../../components/template/CheckUser';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import { roomIdState, usersInRoom } from '../../states/atom';
import { controlBack, controlLobbyReload } from '../../hooks/leaveHandle';

const GameRoom = () => {
  controlLobbyReload();
  controlBack();

  const { id } = useParams();
  const [chat, setChat] = useRecoilState(chattingIdState);

  useEffect(() => {
    if (id) {
      setChat(id.substring(1));
    }
  }, [id, setChat]);
  // controlGameRoomReload(chat);
  controlBack();
  console.log(chat);

  const roomId = useRecoilValue(roomIdState);
  const users = useRecoilValue(usersInRoom);
  console.log(users);

  return (
    <Game>
      <RoomHeader>
        <RoomInfo>
          <RoomInformation>방 번호</RoomInformation>
          <RoomInformation>{roomId}</RoomInformation>
          <RoomInformation>인원 수 </RoomInformation>
          <RoomInformation>{users} / 4</RoomInformation>
          {/* 인원수 추가 */}
        </RoomInfo>
        {/* <InviteGameRoom chatId={chat}></InviteGameRoom> */}
        <BtnGroup>
          <LeaveGameRoom chatId={chat}></LeaveGameRoom>
        </BtnGroup>
      </RoomHeader>

      <RoomMain>
        <Drawing />

        <GameChatting chatId={chat} />
      </RoomMain>

      <CheckUsersInGameRoom chatId={chat}></CheckUsersInGameRoom>
      <UserList>{/* <CheckUser /> */}</UserList>
    </Game>
  );
};

const Game = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  color: #718096;
`;

const RoomInformation = styled.div`
  padding: 5px;

  &:first-child {
    background-color: #edf2f7;
    padding-left: 15px;
    padding-right: 15px;
  }

  &:nth-child(3) {
    background-color: #edf2f7;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 260px;
`;

const RoomMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserList = styled.div`
  margin-top: 20px;
`;

export default GameRoom;

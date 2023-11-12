import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState } from 'recoil';
import { chattingIdState } from '../../states/atom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
import CheckUser from '../../components/template/CheckUser';

import { controlBack } from '../../hooks/leaveHandle';
const GameRoom = () => {
  const { id } = useParams();
  const [chat, setChat] = useRecoilState(chattingIdState);
  useEffect(() => {
    if (id) {
      setChat(id.substring(1));
    }
  }, [id, setChat]);
  // controlGameRoomReload(chat);
  controlBack();

  return (
    <Game>
      <RoomHeader>
        <RoomInfo>
          <RoomInformation>방 번호</RoomInformation>
          <RoomInformation>{id?.slice(1, 5)}</RoomInformation>
          <RoomInformation>인원 수 </RoomInformation>
          <RoomInformation>3 / 4</RoomInformation>
          {/* 인원수 추가 */}
        </RoomInfo>

        <BtnGroup>
          <InviteBtn>
            <InviteImage src={inviteImg} alt="Invite" />
            <div>초대하기</div>
          </InviteBtn>
          <LeaveGameRoom chatId={chat}></LeaveGameRoom>
        </BtnGroup>
      </RoomHeader>

      <RoomMain>
        <Drawing />

        <GameChatting />
      </RoomMain>
      {/* <CheckUsersInGameRoom chatId={chat}></CheckUsersInGameRoom> */}
      <UserList>
        <CheckUser />
      </UserList>
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
  margin-left: 140px;
`;

const InviteBtn = styled.button`
  background-color: #38b2ac;
  color: white;
  padding: 6px 25px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 0.2s;

  div {
    margin-left: 18px;
  }

  &:hover {
    background-color: #4fd1c5;
  }
`;

const InviteImage = styled.img`
  position: absolute;
  top: 9.5px;
  left: 20px;
  width: 22px;
  height: 22px;
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

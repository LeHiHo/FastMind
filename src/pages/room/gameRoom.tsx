import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';
import LeaveGameRoom from '../../components/layout/leaveGameRoom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chattingIdState,
  myMessageState,
  roomIdState,
  usersInRoom,
} from '../../states/atom';
import styled from 'styled-components';
import inviteImg from '../../assets/icons/invite.png';
import GameChatting from '../../components/template/GameChatting';
import { controlBack } from '../../hooks/leaveHandle';
import CheckUsersInGameRoom from '../../components/layout/checkUsersInGameRoom';
import CheckNums from '../../util/checkNums';
import { gameSocket } from '../../api/socket';
import AnswerForm from '../../components/template/AnswerForm';

const GameRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [roomId, setRoomId] = useRecoilState(chattingIdState);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [whoIsCaptain, SetWhoIsCaptain] = useState('');
  const [myMessage, setMyMessage] = useRecoilState(myMessageState);
  const [currentMessageObject, setCurrentMessageObject] =
    useRecoilState(myMessageState);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // 채팅방 주소값 가져오기
    setMyMessage([]);
  }, []);
  console.log(currentMessageObject[currentMessageObject.length - 1]);

  useEffect(() => {
    if (id) {
      setRoomId(id.substring(1));
    }
  }, [id, setRoomId]);

  const shouldStartGame = CheckNums(); // 시작인원 설정
  const myId = localStorage.getItem('id');
  useEffect(() => {
    // 소켓 연결 생성
    if (roomId) {
      gameSocket.connect();
      gameSocket.emit('joinRoom', roomId);

      // 서버로부터 'game' 이벤트 수신 리스너 설정
      gameSocket.on('game', (data) => {
        // 여기에서 필요한 상태 업데이트나 UI 반영
        console.log('this is', data);
        if (data.isBtnVisible === false) {
          setButtonVisible(false);
        }
        if (data.isSubmitVisible === true && data.captain === myId) {
          setSubmitVisible(true);
        }
        if (data.isSubmitVisible === false) {
          setSubmitVisible(false);
        }
        // if (
        //   data.captain !== myId &&
        //   data.solution === myMessage[myMessage.length - 1].text &&
        //   data.solution.length > 0
        // ) {
        //   alert(`${data.userId}님이 정답자 입니다!! 짝짝짝`);
        //   setButtonVisible(true);
        // }
      });

      return () => {
        gameSocket.off('game');
        gameSocket.disconnect();
      };
    }
  }, [roomId, gameSocket, myMessage]);

  const handleGameStart = () => {
    console.log('게임이 시작되었습니다!');
    // 서버에 'game' 이벤트 전송
    if (gameSocket?.connected) {
      gameSocket.emit('game', {
        roomId: roomId,
        captain: myId,
        isBtnVisible: false,
        isSubmitVisible: true,
        solution: '',
        winner: '',
      });
    } else {
      console.warn('Socket is not connected.');
    }
  };

  const handleSubmit = (answer: string) => {
    console.log('정답 입력해주세요');
    if (gameSocket?.connected) {
      gameSocket.emit('game', {
        roomId: roomId,
        captain: myId,
        isBtnVisible: false,
        isSubmitVisible: false,
        solution: answer,
        winner: '',
      });
    } else {
      console.warn('Socket is not connected.');
    }
  };
  controlBack();

  const roomNum = useRecoilValue(roomIdState);
  const users = useRecoilValue(usersInRoom);

  return (
    <Game>
      <RoomHeader>
        <RoomInfo>
          <RoomInformation>방 번호</RoomInformation>
          <RoomInformation>{roomNum}</RoomInformation>
          <RoomInformation>인원 수 </RoomInformation>
          <RoomInformation>{users} / 4</RoomInformation>
          {/* 인원수 추가 */}
        </RoomInfo>
        {/* <InviteGameRoom chatId={chat}></InviteGameRoom> */}
        <BtnGroup>
          <LeaveGameRoom chatId={roomId}></LeaveGameRoom>
          {buttonVisible && (
            <button onClick={handleGameStart}>게임 시작</button>
          )}
          {submitVisible && <AnswerForm onSubmit={handleSubmit} />}
        </BtnGroup>
      </RoomHeader>

      <RoomMain>
        <Drawing />

        <GameChatting chatId={roomId} />
      </RoomMain>
      <CheckUsersInGameRoom chatId={roomId}></CheckUsersInGameRoom>
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

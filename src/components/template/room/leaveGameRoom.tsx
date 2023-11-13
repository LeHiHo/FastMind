import { disconnectChattingSocket } from '../../../api/socket';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../../states/atom';
import { leaveGameRoom } from '../../../api';
import styled from 'styled-components';
import inviteImg from '/assets/icons/leaveRoom.png';

const LeaveGameRoom = (chatId: any) => {
  const navigate = useNavigate();
  const accessToken: any = useRecoilValue(accessTokenState);
  const id = chatId.chatId;
  const handleLeave = async () => {
    try {
      await leaveGameRoom(accessToken, id);
    } catch (error) {
      console.log(error);
    } finally {
      disconnectChattingSocket();
      navigate('/lobby');
    }
  };
  return (
    <Button onClick={handleLeave}>
      <LeaveBtn src={inviteImg} alt="Leave" />
      <div>방 나가기</div>
    </Button>
  );
};

const Button = styled.button`
  background-color: #38b2ac;
  color: white;
  padding: 6px 25px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 0.2s;
  margin-left: 10px;

  div {
    margin-left: 20px;
  }

  &:hover {
    background-color: #4fd1c5;
  }
`;

const LeaveBtn = styled.img`
  position: absolute;
  top: 8.5px;
  left: 20px;
  width: 20px;
  height: 20px;
`;

export default LeaveGameRoom;

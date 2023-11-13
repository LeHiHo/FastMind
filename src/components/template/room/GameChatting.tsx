import styled from 'styled-components';
import InfoImg from '/assets/icons/info.png';
import AaImg from '/assets/icons/Aa.png';
import sendImg from '/assets/icons/send.png';

const GameChatting = () => {
  return (
    <Chat>
      <ChatHeader>
        <ChatHeaderIcon src={InfoImg} alt="ChatInfo" />
        <ChatHeaderWarn>게임이 시작되었습니다.</ChatHeaderWarn>
      </ChatHeader>
      {/* 채팅 부분 */}
      <SendChat>
        <ChatInput />
        <Aa src={AaImg} alt="Aa" />
        <Sending src={sendImg} alt="send" />
      </SendChat>
    </Chat>
  );
};

const Chat = styled.div`
  width: 370px;
  height: 450px;
  background-color: #fff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 3px 5px 0px #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* 챗부분 넣으면 자식들 height를 퍼센트로.. */
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 50px;
  background-image: linear-gradient(90deg, #313860 20%, #151928 80%);
  border-radius: 15px 15px 0 0;
  position: relative;
`;

const ChatHeaderIcon = styled.img`
  position: absolute;
  top: 11px;
  left: 96px;
`;

const ChatHeaderWarn = styled.div`
  position: absolute;
  top: 12px;
  left: 130px;
  color: #fff;
`;

const SendChat = styled.div`
  position: relative;
`;

const ChatInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f7fafc;
  border-radius: 0 0 15px 15px;
  border-top: 1px solid #e2e8f0;
  padding: 0 60px;
  color: #2d3748;

  &:focus {
    outline: none;
  }
`;

const Aa = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Sending = styled.img`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 30px;
  height: 30px;
`;

export default GameChatting;

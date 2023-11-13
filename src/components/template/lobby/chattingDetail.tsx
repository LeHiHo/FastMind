import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  accessTokenState,
  privateChatDetail,
  privateChatNew,
  myUserDataState,
} from '../../../states/atom';
import { useState, useEffect } from 'react';
import { chatSocket } from '../../../api/socket';
import {
  createSeparatedTime,
  sortCreatedAt,
  modifyDate,
} from '../../../util/useChattingSort';

interface ChattingDetailProps {
  chatId: string;
}

const ChattingDetail = ({ chatId }: ChattingDetailProps) => {
  const [postData, setPostData] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [fetchChat, setFetchChat] = useRecoilState(privateChatDetail);
  const [newChat, setNewChat] = useRecoilState(privateChatNew);
  const [lastDate, setLastDate] = useState('');
  const accessToken: any = useRecoilValue(accessTokenState);
  const myUserData: any = useRecoilValue(myUserDataState);

  useEffect(() => {
    try {
      const newSocket = chatSocket(accessToken, chatId);
      setSocket(newSocket);

      newSocket.on('messages-to-client', (messageData) => {
        console.log('Fetched messages:', messageData.messages);

        // createdAt을 기준으로 시간순서 정렬
        const sortedMessages = sortCreatedAt(messageData.messages);

        // createdAt을 날짜와 시간으로 분리
        const SeparatedTime: any = sortedMessages.map((message) => ({
          ...message,
          ...createSeparatedTime(message.createdAt),
        }));

        // 마지막 날짜 저장
        setLastDate(SeparatedTime[SeparatedTime.length - 1].date);

        // 중복 날짜, 시간 null로 반환
        const modifyDateArray = modifyDate(SeparatedTime);

        setFetchChat(modifyDateArray);
      });

      newSocket.on('message-to-client', (messageObject) => {
        console.log(messageObject);
        setNewChat((newChat: any) => {
          // 중복 날짜, 시간 null로 반환
          const modifyDateArray = modifyDate([
            ...newChat,
            {
              ...messageObject,
              ...createSeparatedTime(messageObject.createdAt),
            },
          ]);
          return modifyDateArray;
        });
      });

      return () => {
        setNewChat([]);
        newSocket.disconnect();
      };
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }, [accessToken, chatId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);
  };

  const messageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message-to-server', postData);
    setPostData('');
  };

  return (
    <>
      <ModalContainer>
        <h1>채팅디테일</h1>
        {fetchChat.map((element, index) => (
          <div key={index}>
            <p>{element.date}</p>
            <div id="messageWrap">
              <div
                id="message"
                className={element.userId === myUserData.id ? 'mine' : ''}>
                <p>{element.text}</p>
              </div>
              <p>{element.time}</p>
            </div>
          </div>
        ))}

        {newChat.map((element, index) => (
          <div key={index}>
            {element.date !== lastDate && <p>{element.date}</p>}

            <div id="messageWrap">
              <div
                id="message"
                className={element.userId === myUserData.id ? 'mine' : ''}>
                <p>{element.text}</p>
              </div>
              <p>{element.time}</p>
            </div>
          </div>
        ))}

        <h1>채팅입력</h1>
        <form onSubmit={messageSubmit}>
          <input
            type="text"
            placeholder="Aa"
            value={postData}
            onChange={handleInputChange}
          />
        </form>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div``;

export default ChattingDetail;

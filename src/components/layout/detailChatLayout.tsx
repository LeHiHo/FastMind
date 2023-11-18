import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openChatDetailState,
  privateChatDetail,
  privateChatNew,
} from '../../states/atom';
import { useState, useEffect } from 'react';
import { chatSocket } from '../../api/socket';
import {
  createSeparatedTime,
  sortCreatedAt,
  modifyDate,
} from '../template/useChattingSort';
import { getCookie } from '../../util/util';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Flex, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import { Input } from '@chakra-ui/react';
import { User } from '../../interfaces/interface';

interface Message {
  id: string;
  text: string;
  userId: string; // 메세지를 보낸 사람의 id
  createdAt: Date;
}

type UserProps = {
  userData: User[];
};

const DetailChatLayout = ({ userData }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);
  };

  const messageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message-to-server', postData);
    setPostData('');
  };

  const [postData, setPostData] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [fetchChat, setFetchChat] = useRecoilState(privateChatDetail);
  const [newChat, setNewChat] = useRecoilState(privateChatNew);
  const [lastDate, setLastDate] = useState('');
  const accessToken: any = getCookie('accessToken');
  const myUserId: string | undefined = getCookie('userId');
  const openChatDetail = useRecoilValue(openChatDetailState);

  console.log(userData);
  const options = {
    suppressScrollX: true,
    suppressScrollY: false,
  };

  useEffect(() => {
    try {
      const newSocket = chatSocket(accessToken, userData.chatId);
      setSocket(newSocket);

      newSocket.on('messages-to-client', (messageData) => {
        console.log('Fetched messages:', messageData.messages);

        if (messageData.messages.length > 0) {
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
        }
      });

      newSocket.on('message-to-client', (messageObject: Message) => {
        //console.log(messageObject);
        setNewChat((newChat: Message[]) => {
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
        setFetchChat([]);
        setNewChat([]);
        newSocket.disconnect();
      };
    } catch (error) {
      // console.error('Error retrieving data:', error);
    }
  }, [openChatDetail]);
  return (
    <>
      <ScrollWrap>
        <PerfectScrollbar options={options}>
          {fetchChat &&
            fetchChat.map((element, index) => (
              <MessageWrap key={index}>
                {element.date && (
                  <Text
                    align={'center'}
                    fontSize={'14px'}
                    color={'gray.400'}
                    paddingBottom={'5px'}>
                    {element.date}
                  </Text>
                )}

                <Flex
                  className={element.userId === myUserId ? 'mine' : ''}
                  alignItems={'end'}>
                  <MessageCont id="message">
                    <Text fontSize={'16px'} color={'gray.700'}>
                      {element.text}
                    </Text>
                  </MessageCont>
                  <Text
                    padding={'0 5px 5px 5px'}
                    fontSize={'12px'}
                    color={'gray.400'}>
                    {element.time}
                  </Text>
                </Flex>
              </MessageWrap>
            ))}

          {newChat &&
            newChat.map((element, index) => (
              <MessageWrap key={index}>
                {element.date && (
                  <Text
                    align={'center'}
                    fontSize={'14px'}
                    color={'gray.400'}
                    paddingBottom={'5px'}>
                    {element.date}
                  </Text>
                )}

                <Flex
                  className={element.userId === myUserId ? 'mine' : ''}
                  alignItems={'end'}>
                  <MessageCont id="message">
                    <Text fontSize={'16px'} color={'gray.700'}>
                      {element.text}
                    </Text>
                  </MessageCont>
                  <Text
                    padding={'0 5px 5px 5px'}
                    fontSize={'12px'}
                    color={'gray.400'}>
                    {element.time}
                  </Text>
                </Flex>
              </MessageWrap>
            ))}
        </PerfectScrollbar>
      </ScrollWrap>

      <Flex
        borderTop={'1px solid'}
        borderColor={'gray.200'}
        backgroundColor={'gray.100'}
        position={'relative'}>
        <FormCont onSubmit={messageSubmit}>
          <Input
            color={'gray.700'}
            borderRadius={'0'}
            border={'none'}
            placeholder={'Aa'}
            _placeholder={{ fontSize: 'sm' }}
            borderColor={'gray.200'}
            autoComplete="on"
            type="text"
            value={postData}
            onChange={handleInputChange}
            width="298px"
            height="50px"
            justifyContent={'center'}
          />

          <IconButton
            aria-label="전송하기"
            background={'none'}
            width={'32px'}
            height={'32px'}
            position={'absolute'}
            right={'10px'}
            padding={'0px'}
            minWidth={'32px'}
            top={'9px'}
            zIndex={10}
            type="submit"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="submit-button">
                <path
                  fill="#A0AEC0"
                  d="m80-120 400-720 400 720H80Zm136-80h224v-403L216-200Zm304 0h224L520-603v403Z"
                />
              </svg>
            }
          />
        </FormCont>
      </Flex>
    </>
  );
};

export default DetailChatLayout;

const FormCont = styled.form`
  .submit-button {
    transform: rotate(45deg);
    margin-right: -7px;
    margin-top: -5px;
  }
`;

const ScrollWrap = styled.div`
  width: 100%;
  height: 305px;
  padding: 15px 0 0 0;
`;

const MessageWrap = styled.div`
  width: 100%;

  .mine {
    flex-direction: row-reverse;
    align-items: end;
    #message {
      background-color: #4fd1c5;
      margin-left: 0;
      margin-right: 15px;
      p {
        color: #fff;
      }
    }
  }
`;
const MessageCont = styled.div`
  background-color: #edf2f7;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 3px 10px;
  max-width: 200px;
  margin-left: 15px;
`;

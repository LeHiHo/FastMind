import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllMyChat } from '../../../api';
import {
  privateChatState,
  onlineUserState,
  openChatDetailState,
  openNewChatState,
} from '../../../states/atom';
import ChattingDetail from './chattingDetail';
import styled from 'styled-components';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getCookie } from '../../../util/util';
import { Flex, Text } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/image';
import { IconButton } from '@chakra-ui/button';
import NewPrivateChat from './newPrivateChat';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type User = {
  chatId: string;
  id: string;
  name: string;
  picture: string;
  isOnline: boolean;
};

const CheckPrivateChat = ({ isOpen, onClose }: LoginModalProps) => {
  const [allMyChat, setAllMyChat] = useRecoilState(privateChatState);

  const onLine = useRecoilValue(onlineUserState);
  const userId = getCookie('userId');

  const [openChatDetail, setOpenChatDetail] =
    useRecoilState(openChatDetailState);
  const [, setOpenNewChat] = useRecoilState(openNewChatState);

  const [chatUserData, setchatUserData] = useState<User[]>([
    {
      chatId: '',
      id: '',
      name: '',
      picture: '',
      isOnline: false,
    },
  ]);

  const fetchData = async () => {
    if (userId) {
      try {
        let allMyChatData = await getAllMyChat();
        allMyChatData = allMyChatData.chats;

        // 비공개방만 필터
        const privateChatArray = await allMyChatData.filter(
          (obj: any) => obj.isPrivate,
        );

        // users 배열에서 내 id만 빼고 반환
        const nonMyIdArray = privateChatArray.map((chatObject: any) => ({
          ...chatObject,
          users: chatObject.users.filter((user: any) => user.id !== userId),
        }));

        // 온라인 / 오프라인 여부 반환
        const updatedOnline = nonMyIdArray.map((element: any) => {
          const array = element.users.map((userElement: any) => {
            // onLine.users 값이 있는지 확인
            const isOnline =
              onLine.users &&
              onLine.users.find(
                (onlineUser: any) => onlineUser === userElement.id,
              );

            if (isOnline) {
              return {
                ...userElement,
                isOnline: true,
              };
            } else {
              return {
                ...userElement,
                isOnline: false,
              };
            }
          });

          return {
            ...element,
            users: array,
          };
        });

        setData(updatedOnline);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
  };

  const setData = (allChatData: any) => {
    if (JSON.stringify(allChatData) !== JSON.stringify(allMyChat)) {
      setAllMyChat(allChatData);
    }
  };
  fetchData();

  const handleChatDetailModal = async (
    chatId: string,
    id: string,
    name: string,
    picture: string,
    isOnline: boolean,
  ) => {
    const user: User[] = [
      {
        chatId: chatId,
        id: id,
        name: name,
        picture: picture,
        isOnline: isOnline,
      },
    ];
    await setchatUserData(user);

    onClose();

    await setOpenChatDetail(!openChatDetail);
  };

  const options = {
    suppressScrollX: true,
    suppressScrollY: false,
  };

  const handleOpenNewChat = () => {
    setOpenNewChat(true);
    setOpenChatDetail(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent
          overflow={'hidden'}
          color="gray.500"
          width="300px"
          height="420px"
          position={'relative'}
          top={0}
          right={-505}
          boxShadow="lg"
          border="1px solid #E2E8F0"
          borderRadius={15}>
          <ModalHeader
            height={50}
            fontSize="17px"
            lineHeight={'120%'}
            color={'gray.700'}
            fontWeight={600}
            backgroundColor={'gray.100'}
            borderBottom={'1px solid'}
            borderColor={'gray.200'}
            padding={'15px'}>
            1:1 대화
          </ModalHeader>

          <IconButton
            aria-label="1:1 채팅 생성"
            background={'none'}
            width={'32px'}
            height={'32px'}
            position={'absolute'}
            right={'45px'}
            padding={'0px'}
            minWidth={'32px'}
            top={'8px'}
            onClick={handleOpenNewChat}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20">
                <path
                  fill="#4A5568"
                  d="M440-400h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
                />
              </svg>
            }
          />

          <ModalCloseButton
            color={'gray.700'}
            _hover={{ backgroundColor: 'gray.200' }}
          />
          <ModalBody
            p={0}
            width="100%"
            height="370px"
            display={'flex'}
            flexDirection={'column'}>
            <PerfectScrollbar options={options}>
              <ScrollWrap>
                {allMyChat.length > 0 &&
                  allMyChat.map((element, index) => (
                    <div key={index}>
                      {element.users.length > 0 && (
                        <ChatList>
                          <Flex
                            onClick={() =>
                              handleChatDetailModal(
                                element.id,
                                element.users[0].id,
                                element.users[0].username,
                                element.users[0].picture,
                                element.users[0].isOnline,
                              )
                            }
                            width="calc(100% - 30px;)"
                            cursor={'pointer'}
                            padding={'7.5px 15px'}>
                            <Img
                              src={element.users[0].picture}
                              alt={element.users[0].username}
                              width="50px"
                              height="50px"
                              borderRadius={'6px'}
                            />

                            <Flex
                              alignItems={'left'}
                              flexDirection={'column'}
                              marginLeft={'15px'}>
                              <>
                                <Nickname>
                                  {element.users[0].username}
                                  <span
                                    className={
                                      element.users[0].isOnline
                                        ? 'online'
                                        : 'offline'
                                    }></span>
                                </Nickname>
                                <Text fontSize={14} color={'gray.400'}>
                                  {element?.latestMessage?.text}
                                </Text>
                              </>
                            </Flex>
                          </Flex>
                        </ChatList>
                      )}
                    </div>
                  ))}
              </ScrollWrap>
            </PerfectScrollbar>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ChattingDetail userData={chatUserData} />
      <NewPrivateChat />
    </>
  );
};
const ScrollWrap = styled.div`
  padding: 7.5px 0;
`;

const ChatList = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Nickname = styled.p`
  color: #2d3748;
  font-weight: 600;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 16px;

  span {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-left: 5px;
    margin-bottom: 1px;
    border-radius: 100%;
    &.online {
      background-color: #48bb78;
    }
    &.offline {
      background-color: #f56565;
    }
  }
`;

export default CheckPrivateChat;

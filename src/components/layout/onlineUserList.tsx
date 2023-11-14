import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allUserState,
  onlineUserState,
  allRoomNumberState,
  roomIdState,
  usersInRoom,
} from '../../states/atom';
import userList from '../template/userList';
import { Card, Flex, Heading, Image, Text, IconButton } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { createGameRooms, getAllMyChat } from '../../api';
import { randomNameFunc, getCookie } from '../../util/util';
import { useNavigate } from 'react-router-dom';

interface ResponseValue {
  chat: Chat;
}

interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}
interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

const OnlineUserList = () => {
  userList();
  const navigate = useNavigate();
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const allOnlineUsers = onLine.users || [];
  const userId = getCookie('userId');
  const allChatState = useRecoilValue(allRoomNumberState);
  const setRoomId = useSetRecoilState(roomIdState);
  const setUsersInRoom = useSetRecoilState(usersInRoom);

  const onlineUserListData = all.filter((element) => {
    return allOnlineUsers.includes(element.id);
  });
  const chathandler = async (element: User) => {
    if (userId === element.id) {
      alert('본인입니다.');
    } else {
      let allMyChatData = await getAllMyChat();
      allMyChatData = allMyChatData.chats;

      // 비공개방만 필터
      const privateChatArray = await allMyChatData.filter(
        (obj: any) => obj.isPrivate,
      );

      // 이미 해당 id와 생성된 방이 있는지 필터
      const matchingChat = privateChatArray.find((chat: Chat) =>
        chat.users.some((user: User) => user.id === element.id),
      );

      const chatId = matchingChat ? matchingChat.id : null;
      if (chatId) {
        //navigate(`/room/:${chatId}`);
      } else {
        const chat = await createGameRooms(element.id, [element.id], true);
        //navigate(`/room/:${chat.id}`);
      }
    }
  };

  const gamehandler = async (element: User) => {
    const random = randomNameFunc();
    if (userId === element.id) {
      alert('본인입니다.');
    } else {
      const chat = await createGameRooms(random, [element.id], false);
      const chatLength = allChatState.chats.length;
      console.log(chat);
      setRoomId(chatLength + 1);
      setUsersInRoom(2);
      navigate(`/room/:${chat.id}`);
    }
  };

  return (
    <>
      <Heading
        as="h3"
        fontSize={18}
        fontWeight="600"
        paddingLeft="20px"
        paddingBottom="10px"
        color={'gray.700'}>
        접속중인 유저
      </Heading>
      <Card
        boxShadow="0 3.5px 5px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={15}
        height={510}
        marginBottom="20px">
        <PerfectScrollbar>
          {onlineUserListData.map((element, key) => (
            <Flex
              justifyContent={'space-between'}
              key={key}
              padding="20px"
              borderBottom="1px solid"
              borderColor={'gray.200'}>
              <Flex gap="10px">
                <Image
                  src={element.picture}
                  alt={element.name}
                  width={50}
                  height={50}
                  borderRadius={6}
                />
                <Flex
                  alignItems={'left'}
                  flexDirection={'column'}
                  justifyContent={'center'}>
                  <Heading
                    as="h4"
                    fontSize="14px"
                    color={'gray.700'}
                    fontWeight={600}>
                    {element.name}
                  </Heading>
                  <Text fontSize="12px" color={'gray.400'} paddingTop="3px">
                    {element.id}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap="5px" alignItems={'center'}>
                <IconButton
                  aria-label="1:1 대화하기"
                  icon={<ChatIcon color={'white'} />}
                  bgColor={'teal.300'}
                  _hover={{ background: 'teal.200' }}
                  onClick={() => {
                    chathandler(element);
                  }}
                />
                <IconButton
                  aria-label="게임 같이하기"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24">
                      <path
                        fill="#fff"
                        d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z"
                      />
                    </svg>
                  }
                  bgColor={'teal.400'}
                  _hover={{ background: 'teal.500' }}
                  onClick={() => {
                    gamehandler(element);
                  }}
                />
              </Flex>
            </Flex>
          ))}
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default OnlineUserList;

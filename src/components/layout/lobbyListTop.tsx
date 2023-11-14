import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Select, Icon, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import NewGameRoomModal from './newGameRoomModal';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';
import { randomNameFunc } from '../../util/util';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  roomIdState,
  usersInRoom,
  allRoomNumberState,
} from '../../states/atom';
import { getCookie } from '../../util/util';

interface Chats {
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

const LobbyListTop = () => {
  const [sortOption, setSortOption] = useState('');
  const [selectOption, setSelectOption] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [randomName, setRandomName] = useState('');
  const allChatState = useRecoilValue(allRoomNumberState);
  const setRoomId = useSetRecoilState(roomIdState);
  const setUsersInRoom = useSetRecoilState(usersInRoom);
  const userId = getCookie('userId');

  const navigate = useNavigate();

  const fastParticipate = async () => {
    try {
      console.log(allChatState);
      const allChat = allChatState.chats;

      const lengthChats = allChat.filter(
        (chat: Chats) => chat.users.length < 4,
      );
      const nonMyIdChats = lengthChats.filter((chat: Chats) =>
        chat.users.every((user) => user.id !== userId),
      );

      const randomIndex = Math.floor(Math.random() * nonMyIdChats.length);
      const randomPick = nonMyIdChats[randomIndex];
      setRoomId(randomPick.index);
      setUsersInRoom(randomPick.users.length + 1);
      await participateGameRoom(randomPick.id);
      navigate(`/room/:${randomPick.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex justifyContent={'space-between'} paddingBottom="10px">
        <Select
          placeholder={selectOption}
          width={260}
          height="40px"
          backgroundColor={'white'}
          borderColor={'gray.200'}
          fontSize={16}>
          <option value="option1">모든 게임방 보기</option>
          <option value="option2">참여 가능한 게임방 보기</option>
        </Select>
        <Flex width={230} justifyContent={'space-between'}>
          <Button
            leftIcon={<Icon as={AddIcon} w={3} h={3} />}
            size="md"
            backgroundColor={'teal.300'}
            color={'white'}
            _hover={{
              backgroundColor: 'teal.200',
            }}
            onClick={() => {
              const random = randomNameFunc();
              setRandomName(random);
              onOpen();
            }}>
            방 만들기
          </Button>
          <Button
            leftIcon={<ArrowRightIcon w={3} h={3} />}
            size="md"
            backgroundColor={'teal.400'}
            color={'white'}
            _hover={{
              backgroundColor: 'teal.500',
            }}
            onClick={fastParticipate}>
            빠른 참가
          </Button>
        </Flex>
      </Flex>
      <NewGameRoomModal
        randomName={randomName}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default LobbyListTop;

import {
  privateChatDetail,
  privateChatNew,
  openChatDetailState,
  openNewChatState,
  allUserState,
} from '../../states/atom';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  createSeparatedTime,
  sortCreatedAt,
  modifyDate,
} from '../template/useChattingSort';
import { Img, Flex, Text, IconButton, Input } from '@chakra-ui/react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getAllMyChat, createGameRooms } from '../../api';
import { Chat, User } from '../../interfaces/interface';
import Select, { StylesConfig } from 'react-select';
import DetailChatLayout from './detailChatLayout';

interface UserIdOption {
  value: string;
  label: string;
}

interface Message {
  id: string;
  text: string;
  userId: string; // 메세지를 보낸 사람의 id
  createdAt: Date;
}

const NewPrivateChat = () => {
  const [openNewChat, setOpenNewChat] = useRecoilState(openNewChatState);
  const [openNewChatDetail, setOpenNewChatDetail] = useState(false);
  const [postData, setPostData] = useState('');
  const [searchUserId, setSearchUserId] = useState('');
  const [selectId, setSelectId] = useState<User | null>(null);
  const [selectChatId, setSelectChatId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  const onClose = () => {
    setOpenNewChat(false);
    setOpenNewChatDetail(false);
    setChatId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);
  };

  const all = useRecoilValue(allUserState);
  const userIdArray = all.map((user) => ({
    value: user.id,
    label: user.id,
  }));

  const findChatId = (chats: Chat[], userId: string): string | null => {
    for (const chat of chats) {
      const foundUser = chat.users.find((user) => user.id === userId);
      if (foundUser) {
        return chat.id;
      }
    }
    return null;
  };

  const checkChatFunc = async (element: User | null) => {
    if (element) {
      try {
        let allMyChatData = await getAllMyChat();
        allMyChatData = allMyChatData.chats;

        // 비공개방만 필터
        const privateChatArray = await allMyChatData.filter(
          (obj: any) => obj.isPrivate,
        );

        const selectChatId = findChatId(privateChatArray, element.id);
        setSelectChatId(selectChatId);

        // 이미 해당 id와 생성된 방이 있는지 필터
        const matchingChat = privateChatArray.find((chat: Chat) =>
          chat.users.some((user: User) => user.id === element.id),
        );

        const chatId = matchingChat ? matchingChat.id : null;
        if (chatId) {
          await setChatId(matchingChat.id);
          setOpenNewChatDetail(true);
        } else {
          console.log('만들기');
          const chat = await createGameRooms(element.id, [element.id], true);
          await setChatId(chat.id);
          setOpenNewChatDetail(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      width: '180px', // 원하는 넓이로 설정
      border: '1px solid #E2E8F0',
      color: '#A0AEC0',
      '&:hover': {
        border: '1px solid #CBD5E0', // 실제 hover 시 배경색 변경
      },
    }),
  };

  const handleSelectChange = async (selectedOption: any) => {
    if (selectedOption) {
      setSearchUserId(selectedOption.value);
      const foundObject: User = all.find(
        (item) => item.id === selectedOption.value,
      );
      await setSelectId(foundObject);
      console.log(selectId);
      checkChatFunc(foundObject);
    }
  };

  return (
    <>
      {openNewChat && (
        <Modal isOpen={openNewChat} onClose={onClose}>
          <ModalContent
            overflow={'hidden'}
            color="gray.500"
            width="300px"
            height="465px"
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
              새 대화
            </ModalHeader>

            <ModalCloseButton
              color={'gray.700'}
              _hover={{ backgroundColor: 'gray.200' }}
            />
            <ModalBody
              p={0}
              width="100%"
              height="370px"
              overflow={'hidden'}
              display={'flex'}
              flexDirection={'column'}>
              <Flex
                borderBottom={'1px solid'}
                borderColor={'gray.200'}
                padding={'10px 15px'}
                alignItems={'center'}>
                <Text marginRight={'8px'}>받는 유저 ID</Text>
                {userIdArray && (
                  <Select
                    options={userIdArray}
                    styles={customStyles}
                    onChange={handleSelectChange}
                    isSearchable
                  />
                )}
              </Flex>

              {openNewChatDetail && <DetailChatLayout userData={chatId} />}

              {!openNewChatDetail && (
                <Text
                  height={'260px'}
                  textAlign={'center'}
                  paddingTop={'150px'}>
                  대화 내용이 없습니다.
                </Text>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default NewPrivateChat;

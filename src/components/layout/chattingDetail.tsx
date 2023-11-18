import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { openChatDetailState, userNewDetailData } from '../../states/atom';

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/modal';

import { Flex, Text } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/image';
import { User } from './checkPrivateChat';
import { IconButton } from '@chakra-ui/button';

import { randomNameFunc } from '../../util/util';
import { createGameRooms } from '../../api';
import { useNavigate } from 'react-router-dom';
import DetailChatLayout from './detailChatLayout';

type UserProps = {
  userData: User[];
};

const ChattingDetail = ({ userData }: UserProps) => {
  const [openChatDetail, setOpenChatDetail] =
    useRecoilState(openChatDetailState);
  const navigate = useNavigate();

  const onClose = () => {
    setOpenChatDetail(false);
  };

  const gamehandler = async (element: User) => {
    const random = randomNameFunc();
    const chat = await createGameRooms(random, [element.id], false);
    setOpenChatDetail(false);
    navigate(`/room/:${chat.id}`);
  };

  return (
    <>
      {openChatDetail && (
        <Modal isOpen={openChatDetail} onClose={onClose}>
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
              height={62}
              fontSize="17px"
              lineHeight={'120%'}
              color={'gray.700'}
              fontWeight={600}
              backgroundColor={'gray.100'}
              borderBottom={'1px solid'}
              borderColor={'gray.200'}
              padding={'15px 15px 15px 15px'}
              display={'flex'}
              justifyContent={'left'}
              alignItems={'center'}>
              <Img
                src={userData[0].picture}
                alt={userData[0].id}
                width={'30px'}
                height={'30px'}
                borderRadius={'5px'}
              />
              <Flex
                alignItems={'left'}
                flexDirection={'column'}
                marginLeft={'10px'}
                justifyContent={'center'}>
                <Flex alignItems={'center'}>
                  <Text
                    fontSize={'16px'}
                    lineHeight={'100%'}
                    fontWeight={600}
                    color={'gray.700'}>
                    {userData[0].name}
                  </Text>
                  <OnlineSpan
                    className={
                      userData[0].isOnline ? 'online' : 'offline'
                    }></OnlineSpan>
                </Flex>
                <Text
                  fontSize={'14px'}
                  color={'gray.400'}
                  fontWeight={300}
                  lineHeight={'100%'}
                  marginTop={'2px'}>
                  {userData[0].id}
                </Text>
              </Flex>
            </ModalHeader>

            <IconButton
              aria-label="게임 같이하기"
              background={'none'}
              width={'32px'}
              height={'32px'}
              position={'absolute'}
              right={'45px'}
              padding={'0px'}
              minWidth={'32px'}
              top={'14px'}
              onClick={() => {
                gamehandler(userData[0]);
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path
                    fill="#4A5568"
                    d="M160-240q-33 0-56.5-23.5T80-320v-320q0-33 23.5-56.5T160-720h640q33 0 56.5 23.5T880-640v320q0 33-23.5 56.5T800-240H160Zm0-80h640v-320H160v320Zm120-40h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80Zm300 0q25 0 42.5-17.5T640-420q0-25-17.5-42.5T580-480q-25 0-42.5 17.5T520-420q0 25 17.5 42.5T580-360Zm120-120q25 0 42.5-17.5T760-540q0-25-17.5-42.5T700-600q-25 0-42.5 17.5T640-540q0 25 17.5 42.5T700-480ZM160-320v-320 320Z"
                  />
                </svg>
              }
            />

            <ModalCloseButton
              marginTop={'6px'}
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
              <DetailChatLayout userData={userData[0].chatId} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const OnlineSpan = styled.span`
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
`;

export default ChattingDetail;

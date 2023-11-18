// checkGameRoom.tsx

import { useState, useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allRoomState,
  usersInRoom,
  roomIdState,
  allRoomNumberState,
  sortSelect,
} from '../../states/atom';

import {
  getAllGameRooms,
  leaveGameRoom,
  // getOnlyGameRoom,
  participateGameRoom,
  getAllMyChat,
} from '../../api';
import { useNavigate } from 'react-router-dom';
import usePollingData from '../template/usePollingData';
import Pagination from 'react-js-pagination';
import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Fade,
  ListItem,
  List,
  Card,
  Text,
} from '@chakra-ui/react';
import styled from 'styled-components';
import LobbyListTop from './lobbyListTop';
import { useSetRecoilState } from 'recoil';
import Spiner from '../template/Spiner';

const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const setRoomIdAllRooms = useSetRecoilState(allRoomNumberState);
  const setRoomId = useSetRecoilState(roomIdState);
  const setUsersInRoom = useSetRecoilState(usersInRoom);
  const allChatState = useRecoilValue(sortSelect);

  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
    type: '',
  });

  // Pagination 관련 상태와 핸들러 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('');
  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 수

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const allRoomsData = await getAllGameRooms();

      setTotalItemsCount(allRoomsData.chats.length);

      // 방번호 넣기
      const plusIndex = {
        ...allRoomsData,
        chats: allRoomsData.chats.map((room: any, index: any) => ({
          ...room,
          index: index + 1,
        })),
      };

      setRoomIdAllRooms(plusIndex);

      // 배열을 역순으로 만들기 (최신순)
      let reversedRooms = [...plusIndex.chats].reverse();

      if (allChatState === 'possible') {
        // 풀방 확인
        reversedRooms = reversedRooms.filter((item) => item.users.length < 4);
        setTotalItemsCount(reversedRooms.length);
      }

      // 서버에서 받아온 전체 데이터를 현재 페이지에 맞게 자름
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedRooms = reversedRooms.slice(startIndex, endIndex);

      setAllRooms(paginatedRooms);
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  usePollingData(fetchData, [currentPage, allChatState]);

  const handleParticipate = async (
    numberOfPeople: number,
    chatId: any,
    roomId: number,
  ) => {
    if (numberOfPeople >= 4) {
      let allMyChatData = await getAllMyChat();
      allMyChatData = allMyChatData.chats.filter((obj: any) => !obj.isPrivate);

      // chatId와 allMyChatData의 배열 요소의 id 값이 일치하는지 확인
      const matchingChat = allMyChatData.find(
        (chat: any) => chat.id === chatId,
      );
      if (matchingChat) {
        navigate(`/room/:${chatId}`);
      } else {
        setErrorMessage('방이 꽉 찼어요.');
        setErrorType('full');
        setShowAlert({ active: true, message: errorMessage, type: errorType });
      }
    } else {
      try {
        await participateGameRoom(chatId);
        setRoomId(roomId);
        setUsersInRoom(numberOfPeople + 1);
        navigate(`/room/:${chatId}`);
      } catch (error: any) {
        // console.log(error.response.data.message);
        if (error.response.data.message === 'Chat not found') {
          setErrorMessage('방이 없습니다. 잠시 후 다시 시도해 주세요');
          setErrorType('none');
          setShowAlert({
            active: true,
            message: errorMessage,
            type: errorType,
          });
        } else if (error.response.data.message === 'Already participated') {
          setErrorMessage('이미 들어가 있어요.');
          await leaveGameRoom(chatId);
          setUsersInRoom(numberOfPeople);
        }
      } finally {
        // const res = await getOnlyGameRoom(chatId);
        // console.log(res);
      }
    }
  };

  useEffect(() => {
    // alert 창 5초 후에 사라지게 하기
    if (showAlert.active) {
      const timer = setTimeout(() => {
        setShowAlert({ active: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert.active]);

  return (
    <>
      {isLoading ? (
        <SpinerWrap>
          <Spiner />
        </SpinerWrap>
      ) : (
        <>
          <LobbyListTop />
          <Card
            boxShadow="0 3.5px 5px 0 rgba(0, 0, 0, 0.05)"
            padding={30}
            borderRadius={15}
            position="relative">
            <List spacing="10px">
              {allRooms.map((element, index) => (
                <ListItem
                  width="100%"
                  height={50}
                  borderRadius={10}
                  backgroundColor={
                    element.users.length < 4 ? 'gray.50' : 'gray.300 '
                  }
                  key={index}
                  cursor={'pointer'}
                  border="1px solid"
                  borderColor={'gray.200'}
                  padding="0 30px"
                  _hover={{
                    backgroundColor:
                      element.users.length < 4 ? 'gray.100' : 'gray.300',
                  }}
                  onClick={() => {
                    // handleSelectRoom(element?.index);
                    handleParticipate(
                      element.users.length,
                      element.id,
                      element?.index,
                    );
                  }}>
                  <Flex
                    lineHeight="50px"
                    fontSize={14}
                    fontWeight={600}
                    color={'gray.500'}
                    justifyContent={'space-between'}>
                    <Text>{element?.index}</Text>
                    <Text>{element?.name}</Text>
                    <Flex
                      alignItems={'center'}
                      width={50}
                      justifyContent={'space-between'}>
                      <Text>{element?.users?.length} / 4</Text>
                      {element.users.length >= 4 ? (
                        <RoundRight className="false"></RoundRight>
                      ) : (
                        <RoundRight className="true"></RoundRight>
                      )}
                    </Flex>
                  </Flex>
                </ListItem>
              ))}

              <PaginationWrap>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  firstPageText={
                    <svg viewBox="-20 -20 65 65" focusable="false">
                      <g fill="currentColor">
                        <path d="M10.416,12a2.643,2.643,0,0,1,.775-1.875L20.732.584a1.768,1.768,0,0,1,2.5,2.5l-8.739,8.739a.25.25,0,0,0,0,.354l8.739,8.739a1.768,1.768,0,0,1-2.5,2.5l-9.541-9.541A2.643,2.643,0,0,1,10.416,12Z"></path>
                        <path d="M.25,12a2.643,2.643,0,0,1,.775-1.875L10.566.584a1.768,1.768,0,0,1,2.5,2.5L4.327,11.823a.25.25,0,0,0,0,.354l8.739,8.739a1.768,1.768,0,0,1-2.5,2.5L1.025,13.875A2.643,2.643,0,0,1,.25,12Z"></path>
                      </g>
                    </svg>
                  }
                  prevPageText={
                    <svg viewBox="-5 -5 34 34" focusable="false">
                      <path
                        fill="currentColor"
                        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                  }
                  nextPageText={
                    <svg viewBox="-5 -5 34 34" focusable="false">
                      <path
                        fill="currentColor"
                        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                  }
                  lastPageText={
                    <svg viewBox="-20 -20 65 65" focusable="false">
                      <g fill="currentColor">
                        <path d="M13.584,12a2.643,2.643,0,0,1-.775,1.875L3.268,23.416a1.768,1.768,0,0,1-2.5-2.5l8.739-8.739a.25.25,0,0,0,0-.354L.768,3.084a1.768,1.768,0,0,1,2.5-2.5l9.541,9.541A2.643,2.643,0,0,1,13.584,12Z"></path>
                        <path d="M23.75,12a2.643,2.643,0,0,1-.775,1.875l-9.541,9.541a1.768,1.768,0,0,1-2.5-2.5l8.739-8.739a.25.25,0,0,0,0-.354L10.934,3.084a1.768,1.768,0,0,1,2.5-2.5l9.541,9.541A2.643,2.643,0,0,1,23.75,12Z"></path>
                      </g>
                    </svg>
                  }
                  activeClass={'active'}
                  itemClassFirst={'first'}
                  itemClassPrev={'prev'}
                  itemClassNext={'next'}
                  itemClassLast={'last'}
                  onChange={handlePageChange}
                />
              </PaginationWrap>
            </List>
          </Card>
          <Fade in={showAlert.active}>
            <Alert
              marginTop={10}
              status="error"
              width={400}
              height={70}
              variant="solid"
              borderRadius={6}
              position="absolute"
              bottom={30}
              left="50%"
              marginLeft={-200}>
              <AlertIcon />
              <Box>
                <AlertTitle mr={2}>방 입장 오류</AlertTitle>
                <AlertDescription>{showAlert.message}</AlertDescription>
              </Box>
            </Alert>
          </Fade>
        </>
      )}
    </>
  );
};

const SpinerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoundRight = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 100%;

  &.true {
    background-color: #48bb78;
  }
  &.false {
    background-color: #f56565;
  }
`;

const PaginationWrap = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 5px;

    .first,
    .prev,
    .next,
    .last {
      position: absolute;
    }

    .first {
      left: 30px;
    }

    .prev {
      left: 65px;
    }

    .next {
      right: 65px;
    }

    .last {
      right: 30px;
    }

    li {
      width: 30px;
      height: 30px;
      border-radius: 10px;
      background-color: #f7fafc;
      border: 1px solid #e2e8f0;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      font-weight: 600;
      cursor: pointer;

      &.active {
        color: #fff;
        background-color: #4fd1c5;
        border-color: #4fd1c5;
      }
    }
  }
`;

export default CheckGameRoom;

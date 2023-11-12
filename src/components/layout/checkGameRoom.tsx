import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, leaveGameRoom, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';
import usePollingData from '../template/usePollingData';
import {
  disconnectChattingSocket,
  disconnectLoginSocket,
} from '../../api/socket';

const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const accessToken: any = useRecoilValue(accessTokenState);

  const fetchData = async () => {
    try {
      const allRoomsData = await getAllGameRooms(accessToken);
      if (JSON.stringify(allRoomsData.chats) !== JSON.stringify(allRooms)) {
        setAllRooms(allRoomsData.chats);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  usePollingData(fetchData, [allRooms, setAllRooms]);

  const handleParticipate = async (numberOfPeople: number, chatId: any) => {
    if (numberOfPeople === 4) {
      alert('방이 꽉 찼어요.');
    } else {
      try {
        await participateGameRoom(chatId, accessToken);
        navigate(`/room/:${chatId}`);
      } catch (error: any) {
        console.log(error.response.data.message);
        if (error.response.data.message === 'Chat not found') {
          alert('방이 사라졌어요');
        } else if (error.response.data.message === 'Already participated') {
          alert('이미 참여한 방입니다. 로그아웃 합니다.');
          try {
            await leaveGameRoom(accessToken, chatId);
          } catch (error) {
            console.error(error);
          } finally {
            disconnectChattingSocket();
            disconnectLoginSocket();
            navigate('/');
          }
        }
      }
    }
  };

  return (
    <>
      <button onClick={fetchData}>Refresh Data</button>
      {allRooms.map((element, index) => (
        <div
          key={index}
          onClick={() => handleParticipate(element.users.length, element.id)}>
          <p>{element.name}</p>
          <p>{element.id}</p>
          <p>{element.users.length}</p>
          {element.users.length === 4 && <p>Four users in this room</p>}
          <p>{element.users[0].id}</p>
        </div>
      ))}
    </>
  );
};

export default CheckGameRoom;

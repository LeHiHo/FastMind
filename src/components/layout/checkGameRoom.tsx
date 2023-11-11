import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';
import usePollingData from '../template/usePollingData';

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
      await participateGameRoom(chatId, accessToken);
      navigate(`/room/:${chatId}`);
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

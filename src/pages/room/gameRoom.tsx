import { useParams } from 'react-router-dom';

const GameRoom = () => {
  let { id } = useParams();
  return <div style={{ padding: 20, textAlign: 'center' }}>게임방{id}</div>;
};

export default GameRoom;

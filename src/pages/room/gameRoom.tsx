import { useParams } from 'react-router-dom';
import Drawing from '../../components/template/drawing';

const GameRoom = () => {
  let { id } = useParams();
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      게임방{id}
      <Drawing />
    </div>
  );
};

export default GameRoom;

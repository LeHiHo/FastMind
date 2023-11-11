import { Route, Routes } from 'react-router-dom';
import GameLobby from '../pages/lobby/gameLobby';
import GameRoom from '../pages/room/gameRoom';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="/room/:id" element={<GameRoom />} />
    </Routes>
  );
};

export default MainRouter;

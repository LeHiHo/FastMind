import { Outlet, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/login/userLogin';
import UserJoin from '../pages/login/userJoin';
import GameLobby from '../pages/lobby/gameLobby';
import GameRoom from '../pages/room/gameRoom';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
function Dashboard() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<UserLogin />} />
          <Route path="/join" element={<UserJoin />} />
          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/room/:id" element={<GameRoom />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;

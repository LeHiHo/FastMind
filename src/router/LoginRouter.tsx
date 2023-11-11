import { Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/login/userLogin';
import UserJoin from '../pages/login/userJoin';

const LoginRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/join" element={<UserJoin />} />
      </Routes>
    </>
  );
};

export default LoginRouter;

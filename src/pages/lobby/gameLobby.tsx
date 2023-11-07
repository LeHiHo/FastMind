import { getAllUsers } from '../../api/index';
const GameLobby = () => {
  const token: string | null = localStorage.getItem('jwt');

  const handleGetAllUsers = () => {
    if (token) {
      getAllUsers(token);
    } else {
      alert('error');
    }
  };

  return (
    <>
      <button onClick={handleGetAllUsers}>getAllUsers</button>
    </>
  );
};

export default GameLobby;

import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { disconnectLoginSocket } from '../../api/socket';

function UserLogout() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const handleLogout = () => {
    try {
      console.log('Before disconnectLoginSocket', accessToken);
      disconnectLoginSocket();
      console.log('After disconnectLoginSocket', accessToken);

      localStorage.removeItem('refreshToken');
      setAccessToken('');

      console.log('After setAccessToken', accessToken);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

export default UserLogout;

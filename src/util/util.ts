import { NavigateFunction } from 'react-router';
import { leaveGameRoom } from '../api';
import { disconnectChattingSocket } from '../api/socket';

export const titleAction = async (
  navigate: NavigateFunction,
  accessToken: string,
  id: string,
) => {
  const url = window.location.pathname;
  if (url === '/' || url === '/account' || url === '/join') {
    navigate('/');
  } else if (url === '/lobby') {
    navigate('/lobby');
  } else {
    try {
      await leaveGameRoom(accessToken, id);
    } catch (error) {
      console.log(error);
    } finally {
      disconnectChattingSocket();
      navigate('/lobby');
    }
  }
};

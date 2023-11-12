import { NavigateFunction } from 'react-router';
import { getAllUsers, leaveGameRoom, postRefresh, getUserData } from '../api';
import { disconnectChattingSocket } from '../api/socket';

export const getAllUsersData = async (accessToken: string) => {
  try {
    const res = await getAllUsers(accessToken);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);

    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const getMyUserData = async (accessToken: string, userId: string) => {
  try {
    const res = await getUserData(accessToken, userId);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const postRefreshToken = async (
  setAccessToken: (accessTokenState: string) => void,
) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken === null) {
    alert('로그인이 만료되었습니다.');
    return;
  }

  try {
    const res = await postRefresh(refreshToken);
    setAccessToken(res.data.accessToken);
    console.log(res.data);
    alert('토큰 재발급에 성공했습니다.');
  } catch (e) {
    console.error(e);
    alert('토큰 재발급에 실패했습니다.');
  }
};

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

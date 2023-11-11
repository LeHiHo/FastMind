import { NavigateFunction, useNavigate } from 'react-router';
import { getAllUsers, postRefresh } from '../api';
export const handleGetAllUsers =
  (accessToken: string) => async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await getAllUsers(accessToken);
      console.log(res);
    } catch (e) {
      console.error(e);
      alert('사용자 정보를 가져오는데 실패했습니다.');
    }
  };

export const handlePostRefresh =
  (setAccessToken: (accessTokenState: string) => void) =>
  async (e: React.FormEvent) => {
    e.preventDefault();

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

export const titleAction = (navigate: NavigateFunction) => {
  const url = window.location.pathname;
  if (url === '/' || url === '/account' || url === '/join') {
    navigate('/');
  } else if (url === '/lobby') {
    navigate('/lobby');
  } else {
    alert('게임 리브 로직 구현 예정');
  }
};

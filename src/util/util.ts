import { NavigateFunction } from 'react-router';
import { getAllUsers, leaveGameRoom, postRefresh, getUserData } from '../api';
import { disconnectChattingSocket } from '../api/socket';
import { useRef, useEffect } from 'react';

export const setCookises = async (
  accessToken: string,
  refreshToken: string,
  userId: string,
) => {
  try {
    document.cookie = `accessToken=${accessToken};max-age=3600;path=/;secure`;
    document.cookie = `refreshToken=${refreshToken};max-age=604800;path=/;secure`;
    document.cookie = `userId=${userId};max-age=3600;path=/;secure`;
  } catch (e) {
    console.error(e);
    alert('쿠키설정에 실패했습니다.');
  }
};

export function getCookie(name: string): string | undefined {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return cookieValue || undefined;
}

export const removeCookie = async () => {
  try {
    document.cookie = `accessToken='';expires=0;`;
    document.cookie = `refreshToken='';expires=0;`;
    document.cookie = `userId='';expires=0;`;
  } catch (e) {
    console.error(e);
    alert('쿠키삭제에 실패했습니다.');
  }
};

export const getAllUsersData = async () => {
  try {
    const res = await getAllUsers();
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);

    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const getMyUserData = async (userId: string) => {
  try {
    const res = await getUserData(userId);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const postRefreshToken = async () => {
  try {
    const res = await postRefresh();
    console.log(res.data);
    alert('토큰 재발급에 성공했습니다.');
  } catch (e) {
    console.error(e);
    alert('토큰 재발급에 실패했습니다.');
  }
};

export const titleAction = async (navigate: NavigateFunction, id: string) => {
  const url = window.location.pathname;
  if (url === '/' || url === '/account' || url === '/join') {
    navigate('/');
  } else if (url === '/lobby') {
    navigate('/lobby');
  } else {
    try {
      await leaveGameRoom(id);
    } catch (error) {
      console.log(error);
    } finally {
      disconnectChattingSocket();
      navigate('/lobby');
    }
  }
};

// 랜덤 방제목 정하는 함수
export const randomNameFunc = () => {
  const data = [
    '캐치마인드 신나는 한 판~!',
    '아이브 영원하라',
    '그림 고수분만',
    '초보만 들어오세요',
    '중랑 12여 남자만',
    '15살 수다방',
    '김가을양재혁',
    '안유진은 양재혁 여친',
    '살려주세요',
    '패캠 뒷담방 ex) 돈 내놔....',
  ];

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomPick = data[randomIndex];
  return randomPick;
};

export const useUnload = (fn: any) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

import { NavigateFunction } from 'react-router';
import { getAllUsers, leaveGameRoom, getUserData } from '../api';
import { disconnectChattingSocket } from '../api/socket';
import { Chat, ChatResponse } from '../interfaces/interface';

export const setCookies = async (
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

export const setAccessToken = async (accessToken: string) => {
  try {
    document.cookie = `accessToken=${accessToken};max-age=3600;path=/;secure`;
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

export const removeCookies = async () => {
  try {
    document.cookie = 'accessToken=; Max-Age=0; path=/';
    document.cookie = 'refreshToken=; Max-Age=0; path=/';
    document.cookie = 'userId=; Max-Age=0; path=/';
  } catch (e) {
    console.error(e);
    alert('쿠키삭제에 실패했습니다.');
  }
};

export const getAllUsersData = async () => {
  try {
    const res = await getAllUsers();
    return res;
  } catch (e) {
    console.error(e);

    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const getMyUserData = async (userId: string) => {
  try {
    const res = await getUserData(userId);
    return res;
  } catch (e) {
    console.error(e);
    alert('사용자 정보를 가져오는데 실패했습니다.');
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
      console.error(error);
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

// 방생성 기준 최신순 정렬
export const sortCreatedAt = (roomData: ChatResponse): Chat[] => {
  return roomData.chats.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // 최신순으로 정렬
    return dateA.getTime() - dateB.getTime();
  });
};

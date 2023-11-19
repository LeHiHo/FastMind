import axios from 'axios';
import { CONTENT_TYPE, SERVER_ID, SERVER_URL } from '../constant';
import { JoinData } from '../interfaces/interface';
import { getCookie, setAccessToken } from '../util/util';
import swal from 'sweetalert';
import { redirect } from 'react-router-dom';

const client = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'content-type': CONTENT_TYPE,
    serverId: SERVER_ID,
  },
});

client.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl = error.config?.url;

    if (requestUrl !== 'login') {
      if (error.response && error.response.status === 401) {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken) {
          try {
            const res = await postRefresh(refreshToken);
            setAccessToken(res.data.accessToken);
            return axios(error.config); // 원래 요청을 재시도
          } catch (refreshError) {
            console.error('토큰 재발급 시도 실패: ', refreshError);
          }
        } else {
          swal({
            title: '토큰만료',
            text: '로그인이 만료되었습니다.',
            icon: 'error',
          });
          redirect('/');
        }
      } else {
        console.error('API 요청 실패: ', error);
      }
      return Promise.reject(error);
    }
  },
);

export const postLogin = async (id: string, password: string) => {
  const res = await client.post('login', {
    id: id,
    password: password,
  });
  return res;
};

export const postJoin = async (joinData: JoinData) => {
  const res = await client.post('signup', joinData);
  return res;
};

export const postRefresh = async (refreshToken: string) => {
  const res = await client.post('refresh', {
    refreshToken: refreshToken,
  });
  return res;
};

export const getAllUsers = async () => {
  const res = await client.get('users');
  return res;
};

export const getUserData = async (userId: string) => {
  const res = await client.get(`user?userId=${userId}`);

  return res.data;
};

export const patchUserData = async (name: string, picture: string) => {
  const payload = {
    ...(name !== undefined && { name }),
    ...(picture !== undefined && { picture }),
  };
  if (name) payload.name = name;
  if (picture) payload.picture = picture;
  const res = await client.patch(`user`, payload);
  return res;
};

export const createGameRooms = async (
  name: string,
  users: string[],
  isPrivate: boolean,
) => {
  const res = await client.post(`chat`, {
    name: name,
    users: users,
    isPrivate: isPrivate,
  });
  return res.data;
};

export const getAllGameRooms = async () => {
  const res = await client.get(`chat/all`);
  return res.data;
};

export const participateGameRoom = async (chatId: string) => {
  const res = await client.patch(`chat/participate`, { chatId: chatId });
  return res.data;
};

export const getAllMyChat = async () => {
  const res = await client.get(`chat`);
  return res.data;
};

export const leaveGameRoom = async (chatId: string) => {
  const res = await client.patch(`chat/leave`, { chatId: chatId });
  return res;
};

export const inviteGameRoom = async (chatId: string, users: string[]) => {
  const res = await client.patch(`chat/invite`, {
    chatId: chatId,
    users: users,
  });
  return res;
};

export const getOnlyGameRoom = async (chatId: string) => {
  const res = await client.get(`chat/only?chatId=${chatId}`);
  return res;
};

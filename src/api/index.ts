import axios from 'axios';
import { SERVER_URL, CONTENT_TYPE, SERVER_ID } from '../constant';

export const signup = async (
  id: string,
  password: string,
  name: string,
  picture?: string,
) => {
  const authData = {
    id,
    password,
    name,
    picture,
  };
  console.log(authData);

  try {
    return await axios.post(`${SERVER_URL}/signup`, authData, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (id: string, password: string) => {
  const authData = {
    id,
    password,
  };
  try {
    const response = await axios.post(`${SERVER_URL}/login`, authData, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
      },
    });
    const { accessToken } = response.data;
    localStorage.setItem('jwt', accessToken);
    console.log('Login successful');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const getAllUsers = async (accessToken: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/users`, {
      headers: {
        'content-type': CONTENT_TYPE,
        serverId: SERVER_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

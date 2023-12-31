import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  onlineUserStateInGameRoom,
  userState,
  nowProfiles,
} from '../../../states/atom';
import { io } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../../../constant';
import { getCookie } from '../../../util/util';
import styled from 'styled-components';
import { getOnlyGameRoom, getUserData } from '../../../api';
import { OnlyResponse } from '../../../interfaces/interface';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface ChattingDetailProps {
  chatId: string;
}
type ResponseValue = {
  user: User;
};

interface User {
  id: string;
  name: string;
  picture: string;
}
const CheckUsersInGameRoom: React.FC<ChattingDetailProps> = ({ chatId }) => {
  const accessToken: any = getCookie('accessToken');
  const [, setRoomUser] = useRecoilState(userState);
  const [UsersInGameRoom, setUsersInGameRoom] = useRecoilState<string[]>(
    onlineUserStateInGameRoom,
  );
  const [profiles, setProfiles] = useState<ResponseValue[]>([]);
  const [, setNow] = useRecoilState(nowProfiles);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const setUsers = async () => {
      try {
        if (id) {
          const response: AxiosResponse<OnlyResponse> | null =
            await getOnlyGameRoom(id.substring(1));

          if (response && response.data) {
            const foundChats = response.data;
            const chatData: any = foundChats.chat;

            const users: User[] | null = chatData.users;
            const usersNumber: any = chatData.users.length;
            setRoomUser(usersNumber);
            const profilesArray: ResponseValue[] = [];
            if (users) {
              for (const user of users) {
                const res = await getUserData(user.id);
                profilesArray.push(res);
              }
              setProfiles(profilesArray);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    setUsers();
  }, []);

  useEffect(() => {
    try {
      const socket = io(`${SERVER_URL}chat?chatId=${chatId}`, {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
          serverId: SERVER_ID,
        },
      });

      socket.on('connect', () => {
        socket?.emit('users');
      });

      socket.on('users-to-client', (data) => {
        setUsersInGameRoom(data.users);
      });

      socket.on('leave', (data) => {
        setUsersInGameRoom(data.users);
      });

      socket.on('join', (data) => {
        setUsersInGameRoom(data.users);
      });

      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }, [accessToken, chatId]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profilesArray: ResponseValue[] = [];
      for (const userId of UsersInGameRoom) {
        try {
          const res = await getUserData(userId);
          profilesArray.push(res);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      setProfiles(profilesArray);
      setNow(profiles.length);
    };

    fetchUserProfiles();
  }, [UsersInGameRoom]);

  const MAX_USERS = 4;

  return (
    <>
      <UserList>
        {Array.from({ length: MAX_USERS }).map((_, index) => {
          const user = profiles[index];
          return (
            <div key={index}>
              {user ? (
                <UserBox>
                  <ImgBox>
                    <UserImage src={user.user.picture} alt="profileImg" />
                  </ImgBox>

                  <TextBox>
                    <UserId>{user.user.id}</UserId>
                    <UserNick>{user.user.name}</UserNick>
                  </TextBox>
                </UserBox>
              ) : (
                <UserBoxEmpty />
              )}
            </div>
          );
        })}
      </UserList>
    </>
  );
};

const UserList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserId = styled.div`
  color: #2d3748;
  font-size: 18px;
`;

const UserNick = styled.div`
  color: #a0aec0;
  font-size: 14px;
`;

const UserBox = styled.div`
  width: 335px;
  height: 120px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px #e2e8f0;

  &:first-child {
    margin-left: 0;
  }

  &[id='painter'] {
    background-image: linear-gradient(90deg, #313860 10%, #151928 90%);

    ${UserId} {
      color: #fff;
    }

    ${UserNick} {
      color: #cbd5e0;
    }
  }
`;

const UserBoxEmpty = styled.div`
  width: 335px;
  height: 120px;
  background-color: #edf2f7;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px #edf2f7;
  margin-left: 20px;
`;

const ImgBox = styled.div`
  width: 70px;
  height: 70px;
  margin-left: 20px;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const TextBox = styled.div`
  margin-left: 20px;
  font-weight: 700;
`;

export default CheckUsersInGameRoom;

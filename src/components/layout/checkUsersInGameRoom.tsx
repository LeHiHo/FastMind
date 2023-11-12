import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, onlineUserStateInGameRoom } from '../../states/atom';
import { io } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../../constant';
import { getUserData } from '../../api';
import UserProfile from '../template/userProfile';

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
  const accessToken: any = useRecoilValue(accessTokenState);
  const [UsersInGameRoom, setUsersInGameRoom] = useRecoilState<string[]>(
    onlineUserStateInGameRoom,
  );
  const [profiles, setProfiles] = useState<ResponseValue[]>([]);

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
        console.log(data);
        setUsersInGameRoom(data.users);
      });

      socket.on('join', (data) => {
        console.log(data);
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
          const res = await getUserData(accessToken, userId);
          profilesArray.push(res);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      setProfiles(profilesArray);
    };

    fetchUserProfiles();
  }, [accessToken, UsersInGameRoom]);

  return (
    <>
      {profiles.map((element, index) => (
        <div key={index}>
          <UserProfile userImg={element.user.picture} />
          <p>{element.user.id}</p>
          <p>{element.user.name}</p>
          <p>{element.user.picture}</p>
        </div>
      ))}
    </>
  );
};

export default CheckUsersInGameRoom;

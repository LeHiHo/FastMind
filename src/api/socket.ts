import { io, Socket } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../constant';

let socket: Socket | null = null;

export const loginSocket = (
  accessToken: any,
  onDataReceived: (data: any[]) => void,
) => {
  socket = io(`${SERVER_URL}/server`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });

  socket.on('connect', () => {
    socket?.emit('users-server');
  });

  socket.on('users-server-to-client', (data) => {
    onDataReceived(data);
  });

  return socket;
};

export const chatSocket = (accessToken: any, chatId: string) => {
  socket = io(`${SERVER_URL}/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });
  socket.emit('fetch-messages');

  socket.on('connect', () => {
    console.log('Connected from server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
};

export const drawSocket = io(
  'https://young-wave-37170-0a19781643d5.herokuapp.com/',
  {
    withCredentials: true,
  },
);

export const disconnectLoginSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

import { io, Socket } from 'socket.io-client';
import { SERVER_URL, SERVER_ID } from '../constant';

let serverSocket: Socket | null = null;
let chattingSocket: Socket | null = null;

export const loginSocket = (
  accessToken: any,
  onDataReceived: (data: any[]) => void,
) => {
  serverSocket = io(`${SERVER_URL}server`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });

  serverSocket.on('connect', () => {
    serverSocket?.emit('users-server');
  });

  serverSocket.on('users-server-to-client', (data) => {
    onDataReceived(data);
  });

  serverSocket.on('error', (error) => {
    console.error('Socket.IO connection error:', error);
    // 여기에 연결 오류 처리 로직을 추가하세요
  });

  return serverSocket;
};

export const chatSocket = (accessToken: any, chatId: string) => {
  chattingSocket = io(`${SERVER_URL}chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
      serverId: SERVER_ID,
    },
  });
  chattingSocket.emit('fetch-messages');

  chattingSocket.on('connect', () => {
    console.log('Connected from server');
  });

  chattingSocket.on('error', (error) => {
    console.error('Socket.IO connection error:', error);
    // 여기에 연결 오류 처리 로직을 추가하세요
  });

  chattingSocket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return chattingSocket;
};

export const drawSocket = io(
  'https://young-wave-37170-0a19781643d5.herokuapp.com/',
  {
    withCredentials: true,
  },
);

export const disconnectLoginSocket = () => {
  if (serverSocket) {
    serverSocket.disconnect();
    serverSocket = null;
  }
};

export const disconnectChattingSocket = () => {
  if (chattingSocket) {
    chattingSocket.disconnect();
    chattingSocket = null;
  }
};

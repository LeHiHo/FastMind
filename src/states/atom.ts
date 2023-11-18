import { atom } from 'recoil';

export const allUserState = atom<any[]>({
  key: 'allUserState',
  default: [],
});

export const allRoomState = atom<any[]>({
  key: 'allRoomsState',
  default: [],
});

export const allRoomNumberState = atom<any>({
  key: 'allRoomNumberState',
  default: [],
});

export const privateChatState = atom<any[]>({
  key: 'privateChatState',
  default: [],
});

export const privateChatDetail = atom<any[]>({
  key: 'privateChatDetail',
  default: [],
});
export const privateChatNew = atom<any[]>({
  key: 'privateChatNew',
  default: [],
});

export const onlineUserState = atom<any>({
  key: 'onlineUserState',
  default: [],
});

export const myUserDataState = atom<any>({
  key: 'myUserDataState',
  default: {},
});

export const onlineUserStateInGameRoom = atom<any>({
  key: 'onlineUsersInGameRoomState',
  default: [],
});

export const chattingIdState = atom<any>({
  key: 'chattingIdState',
  default: '',
});

export const inviteUsersState = atom<any>({
  key: 'inviteUsersState',
  default: new Set(),
});

export const uniqueUserState = atom<any>({
  key: 'uniqueUserState',
  default: [],
});

export const myMessageState = atom<
  Array<{ text: string; userId: string; chatId: string }>
>({
  key: 'myMessageState',
  default: [{ text: '', userId: '', chatId: '' }],
});

export const roomIdState = atom<any>({
  key: 'roomIdState',
  default: '',
});

export const usersInRoom = atom<number>({
  key: 'usersInRoom',
  default: 0,
});

export const sortSelect = atom<any>({
  key: 'sortSelect',
  default: '',
});

export const openChatDetailState = atom<boolean>({
  key: 'openChatDetailState',
  default: false,
});

export const openChatOnlineDetailState = atom<boolean>({
  key: 'openChatOnlineDetailState',
  default: false,
});

export const openNewChatState = atom<boolean>({
  key: 'openNewChatState',
  default: false,
});

export const userRoomState = atom<number>({
  key: 'userRoomState',
  default: 0,
});

export const userState = atom<number>({
  key: 'userState',
  default: 0,
});

export const btnState = atom<any>({
  key: 'btnState',
  default: true,
});

export const submitState = atom<any>({
  key: 'submitState',
  default: false,
});

export const nowProfiles = atom<number>({
  key: 'nowProfiles',
  default: 0,
});

export const userNewDetailData = atom<any>({
  key: 'userNewDetailData',
  default: null,
});

import { atom } from 'recoil';

export const allUserState = atom<any[]>({
  key: 'allUserState',
  default: [],
});

export const allRoomState = atom<any[]>({
  key: 'allRoomsState',
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

export const buttonState = atom<any>({
  key: 'buttonState',
  default: true,
});

export const AnswerFormState = atom<any>({
  key: 'AnswerFormState',
  default: false,
});

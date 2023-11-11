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

export const accessTokenState = atom<string>({
  key: 'accessTokenState',
  default: '',
});

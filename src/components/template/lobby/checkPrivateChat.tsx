import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllMyChat } from '../../../api';
import {
  accessTokenState,
  myUserDataState,
  privateChatState,
  onlineUserState,
} from '../../../states/atom';
import usePollingData from '../../../util/usePollingData';
import ChattingDetail from './chattingDetail';

const CheckPrivateChat = () => {
  const [allMyChat, setAllMyChat] = useRecoilState(privateChatState);
  const accessToken: any = useRecoilValue(accessTokenState);
  const myUserData: any = useRecoilValue(myUserDataState);
  const onLine = useRecoilValue(onlineUserState);

  const [openChatId, setOpenChatId] = useState<string | null>(null);

  // const [chatModals, setChatModals] = useState<any>({});

  const fetchData = async () => {
    if (myUserData) {
      try {
        let allMyChatData = await getAllMyChat(accessToken);
        allMyChatData = allMyChatData.chats;

        // 비공개방만 필터
        const privateChatArray = await allMyChatData.filter(
          (obj: any) => obj.isPrivate,
        );

        // users 배열에서 내 id만 빼고 반환
        const nonMyIdArray = privateChatArray.map((chatObject: any) => ({
          ...chatObject,
          users: chatObject.users.filter(
            (user: any) => user.id !== myUserData.id,
          ),
        }));

        // 온라인 / 오프라인 여부 반환
        const updatedOnline = nonMyIdArray.map((element: any) => {
          const array = element.users.map((userElement: any) => {
            // onLine.users 값이 있는지 확인
            const isOnline =
              onLine.users &&
              onLine.users.find(
                (onlineUser: any) => onlineUser === userElement.id,
              );

            if (isOnline) {
              return {
                ...userElement,
                isOnline: true,
              };
            } else {
              return {
                ...userElement,
                isOnline: false,
              };
            }
          });

          return {
            ...element,
            users: array,
          };
        });

        setData(updatedOnline);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
  };

  const setData = (allChatData: any) => {
    if (JSON.stringify(allChatData) !== JSON.stringify(allMyChat)) {
      setAllMyChat(allChatData);
    }
  };

  usePollingData(fetchData, [allMyChat, setAllMyChat]);

  const handleChatDetailModal = (chatId: string) => {
    setOpenChatId((prevChatId) => (prevChatId === chatId ? null : chatId));
  };
  console.log(allMyChat);

  return (
    <>
      {allMyChat.length > 0 &&
        allMyChat.map((element, index) => (
          <div key={index}>
            <div onClick={() => handleChatDetailModal(element.id)}>
              <p>{element?.latestMessage?.text}</p>
              {element.users.some((user: any) => user.isOnline) && (
                <p>온라인</p>
              )}
              {element.users.length > 0 && <p>{element.users[0].username}</p>}
              {element.users.length > 0 && <p>{element.users[0].picture}</p>}
            </div>
            {openChatId === element.id && (
              <ChattingDetail chatId={element.id} />
            )}
          </div>
        ))}
    </>
  );
};
export default CheckPrivateChat;

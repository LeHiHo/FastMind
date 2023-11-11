import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllMyChat } from '../../api';
import { accessTokenState, privateChatState } from '../../states/atom';
import usePollingData from '../template/usePollingData';
import ChattingDetail from './chattingDetail';

const CheckPrivateChat = () => {
  const [allMyChat, setAllMyChat] = useRecoilState(privateChatState);
  const accessToken: any = useRecoilValue(accessTokenState);

  const [chatModals, setChatModals] = useState<any>({});

  const fetchData = async () => {
    try {
      let allMyChatData = await getAllMyChat(accessToken);
      allMyChatData = allMyChatData.chats;
      const privateChatArray = allMyChatData.filter(
        (obj: any) => obj.isPrivate,
      );
      setData(privateChatArray);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const setData = (allChatData: any) => {
    if (JSON.stringify(allChatData) !== JSON.stringify(allMyChat)) {
      setAllMyChat(allChatData);
    }
  };

  usePollingData(fetchData, [allMyChat, setAllMyChat]);

  const handleChatDetailModal = (chatId: string) => {
    setChatModals((chatModals: any) => ({
      ...chatModals,
      [chatId]: !chatModals[chatId] as boolean,
    }));
  };

  return (
    <>
      {allMyChat.map((element, index) => (
        <div key={index}>
          <div onClick={() => handleChatDetailModal(element.id)}>
            <p>{element.name}</p>
            <p>{element.id}</p>
            <p>{element.users.length}</p>
            <p>{element.users[0].id}</p>
          </div>
          {chatModals[element.id] && (
            <ChattingDetail
              chatId={element.id}
              isModalOpen={chatModals[element.id]}
            />
          )}
        </div>
      ))}
    </>
  );
};
export default CheckPrivateChat;

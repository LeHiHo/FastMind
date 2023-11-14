import { useNavigate } from 'react-router-dom';
import { disconnectLoginSocket } from '../api/socket';
import { useEffect, useRef } from 'react';
import { removeCookie } from '../util/util';
import { getAllMyChat, leaveGameRoom } from '../api';
// export const controlGameRoomReload = (chatId: string) => {

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       disconnectLoginSocket();
//       disconnectChattingSocket();
//     };

//     const handleBeforeUnload = () => {
//       localStorage.setItem('beforeGameUnload', 'true');
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
//         event.preventDefault();
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     window.addEventListener('keydown', handleKeyDown);

//     const cleanup = async () => {
//       const beforeUnloadValue = localStorage.getItem('beforeGameUnload');
//       if (
//         beforeUnloadValue === 'true' &&
//         window.performance?.navigation?.type === 1
//       ) {
//         fetchData();
//         if (!chatId) {
//           navigate('/');
//         }
//       }
//     };

//     cleanup();

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [chatId, navigate]);
// };

export const controlLobbyReload = () => {
  const navigate = useNavigate();
  const handleBeforeUnload = async (event: any) => {
    event.preventDefault().then(() => {
      setTimeout(() => {
        localStorage.removeItem('beforeLobbyUnload');
      }, 1000);
    });
    event.returnValue = false;

    localStorage.setItem('beforeLobbyUnload', 'true');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
      event.preventDefault();
    }
  };

  const removeFunc = async () => {
    let allMyChatData = await getAllMyChat();
    allMyChatData = allMyChatData.chats.filter((obj: any) => !obj.isPrivate);

    for (const chat of allMyChatData) {
      const id = chat.id;
      await leaveGameRoom(id);
    }

    disconnectLoginSocket();
    localStorage.removeItem('beforeLobbyUnload');
    removeCookie();

    navigate('/');
  };

  const cb = useRef(handleBeforeUnload);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', onUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const beforeUnloadValue = localStorage.getItem('beforeLobbyUnload');
    if (
      beforeUnloadValue === 'true' &&
      window.performance?.navigation?.type === 1
    ) {
      removeFunc();
    }
  }, [navigate]);
};

export const controlBack = () => {
  history.pushState(null, '', location.href);

  window.onpopstate = function () {
    history.go(1);
  };
};

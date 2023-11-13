import { useNavigate } from 'react-router-dom';
import { disconnectLoginSocket } from '../api/socket';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../states/atom';
import { useEffect } from 'react';
// export const controlGameRoomReload = (chatId: string) => {
//   const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
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
//   }, [setAccessToken, accessToken, chatId, navigate]);
// };

export const controlLobbyReload = () => {
  const [__, setAccessToken] = useRecoilState(accessTokenState);
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = async (event: any) => {
      console.log(event);
      localStorage.setItem('beforeLobbyUnload', 'true');
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const beforeUnloadValue = localStorage.getItem('beforeLobbyUnload');
    if (
      beforeUnloadValue === 'true' &&
      window.performance?.navigation?.type === 1
    ) {
      localStorage.removeItem('beforeLobbyUnload');
      disconnectLoginSocket();
      localStorage.removeItem('refreshToken');
      setAccessToken('');
      navigate('/');
    }
  }, [navigate, setAccessToken]);
};

export const controlBack = () => {
  history.pushState(null, '', location.href);

  window.onpopstate = function () {
    history.go(1);
  };
};

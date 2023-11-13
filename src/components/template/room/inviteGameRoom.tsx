// import { getAllGameRooms, inviteGameRoom } from '../../api';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import {
//   accessTokenState,
//   inviteUsersState,
//   onlineUserState,
//   uniqueUserState,
// } from '../../states/atom';
// import { useEffect } from 'react';
// import usePollingData from './usePollingData';

// const InviteGameRoom = (chatId: any) => {
//   const [uniqueUsers, setUniqueUsers] = useRecoilState(inviteUsersState);
//   const [toInviteUsers, setToInviteUsers] = useRecoilState(uniqueUserState);
//   const onLine = useRecoilValue(onlineUserState);
//   const allOnlineUsers = onLine.users || [];
//   const accessToken: any = useRecoilValue(accessTokenState);
//   const id = chatId.chatId;

//   const checkUsers = async () => {
//     try {
//       const allRoomsData = await getAllGameRooms(accessToken);
//       setUniqueUsers((prevUniqueUsers: Set<any>) => {
//         const updatedUniqueUsers = new Set(prevUniqueUsers);

//         for (let i = 0; i < allRoomsData.chats.length; i++) {
//           for (let j = 0; j < allRoomsData.chats[i].users.length; j++) {
//             updatedUniqueUsers.add(allRoomsData.chats[i].users[j].id);
//           }
//         }

//         return updatedUniqueUsers;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   usePollingData(checkUsers, [setUniqueUsers]);
//   // console.log(allOnlineUsers, uniqueUsers);
//   useEffect(() => {
//     const notInUniqueUsers = allOnlineUsers.filter(
//       (userId: any) => !uniqueUsers.has(userId),
//     );
//     setToInviteUsers(notInUniqueUsers);
//   }, [uniqueUsers, setToInviteUsers]);

//   // console.log(toInviteUsers);

//   const handleInvite = async (user: any) => {
//     try {
//       await inviteGameRoom(accessToken, id, [user]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {toInviteUsers.map((element, index) => (
//         <div key={index} onClick={() => handleInvite(element)}>
//           {element}
//         </div>
//       ))}
//     </>
//   );
// };

// export default InviteGameRoom;

import { useRecoilValue } from 'recoil';
import { allUserState, onlineUserState } from '../../states/atom';

const OnlineUserList = () => {
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const allOnlineUsers = onLine.users || [];

  const onlineUserListData = all.filter((element) => {
    return allOnlineUsers.includes(element.id);
  });

  const onlineUserId = onlineUserListData.map((element) => element.id);
  // const onlineUserName = onlineUserListData.map((element) => element.name);

  return (
    <div>
      <div>OnlineUserList</div>
      <div>Users: {onlineUserId.join(', ')}</div>
    </div>
  );
};

export default OnlineUserList;

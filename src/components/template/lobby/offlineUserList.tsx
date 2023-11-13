import { useRecoilValue } from 'recoil';
import { allUserState, onlineUserState } from '../../../states/atom';
import { useEffect, useState } from 'react';

const OfflineUserList = () => {
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const allOnlineUsers = onLine.users || [];
  
  const differentNames = all.filter((element) => {
    return !allOnlineUsers.includes(element.id);
  });

  const [offlineUsers, setOfflineUsers] = useState<string[]>([]);

  useEffect(() => {
    const offlineUserId = differentNames.map((element) => element.id);
    if (JSON.stringify(offlineUserId) !== JSON.stringify(offlineUsers)) {
      setOfflineUsers(offlineUserId);
    }
  }, [differentNames, offlineUsers]);

  return (
    <div>
      <div>OfflineUserList</div>
      <div>Users: {offlineUsers.join(', ')}</div>
    </div>
  );
};

export default OfflineUserList;

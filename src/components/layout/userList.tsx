import { getAllUsers } from '../../api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allUserState } from '../../states/atom';
import usePollingData from '../template/usePollingData';

const UserList = () => {
  const [allUsers, setAllUsers] = useRecoilState(allUserState);
  const accessToken: any = useRecoilValue(accessTokenState); 
  const fetchData = async () => {
    try {
      const allUsersData = await getAllUsers(accessToken);
      if (JSON.stringify(allUsersData.data) !== JSON.stringify(allUsers)) {
        setAllUsers(allUsersData.data);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  usePollingData(fetchData, [allUsers, setAllUsers]);

  return (
    <>
      <div>AllUserList</div>
      {allUsers.map((element, index) => (
        <div key={index}>{element.id}</div>
      ))}
    </>
  );
};

export default UserList;

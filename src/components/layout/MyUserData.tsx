import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myUserDataState } from '../../states/atom';
import { getUserData } from '../../api';
import { getCookie } from '../../util/util';

const MyUserData = () => {
  const [myData, setMyData] = useRecoilState(myUserDataState);
  const myUserId = getCookie('userId');
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (myUserId) {
          const userData = await getUserData(myUserId);
          setMyData(userData.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [myUserId, setMyData]);

  return (
    <>
      <p>{myData && myData.id}</p>
      <p>{myData && myData.name}</p>
      <p>{myData && myData.picture}</p>
    </>
  );
};

export default MyUserData;

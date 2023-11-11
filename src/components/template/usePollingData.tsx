// usePollingData.tsx
import { useEffect } from 'react';

const usePollingData = (fetchDataFn: any, dependencies: any) => {
  const POLLING_INTERVAL = 30000;
  useEffect(() => {
    const fetchDataCallback = async () => {
      await fetchDataFn();
    };

    fetchDataCallback(); // 초기 데이터 가져오기

    const pollingInterval = setInterval(fetchDataCallback, POLLING_INTERVAL);

    return () => clearInterval(pollingInterval); // 컴포넌트 언마운트 시 clearInterval 호출
  }, dependencies);
};

export default usePollingData;

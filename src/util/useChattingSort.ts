// createdAt을 기준으로 시간순서로 정렬하는 함수
export const sortCreatedAt = (messages: any[]) => {
  return messages.sort((a: any, b: any) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

// createdAt을 날짜와 시간으로 분리하는 함수
export const createSeparatedTime = (createdAt: Date) => {
  return {
    date: new Date(createdAt).toLocaleDateString().replace(/\.$/, ''), // 마지막의 마침표를 제거
    time: new Date(createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

// 이전 채팅의 날짜와 시간을 비교하여 같은 날짜라면 date 값 null로 반환
export const modifyDate = (SeparatedTime: any) => {
  return SeparatedTime.map((element: any, index: any) => {
    // 초기값은 그대로 반환
    if (index === 0) {
      return element;
    }
    const isDateSame = SeparatedTime.slice(0, index).some(
      (prevElement: any) => prevElement.date === element.date,
    );

    const isTimeSame = SeparatedTime.slice(0, index).some(
      (prevElement: any) =>
        prevElement.time === element.time &&
        prevElement.userId === element.userId,
    );

    return {
      ...element,
      date: isDateSame ? null : element.date,
      time: isTimeSame ? null : element.time,
    };
  });
};

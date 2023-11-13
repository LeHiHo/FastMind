import styled from 'styled-components';

const CheckUser = () => {
  return (
    <UserList>
      <UserBox id="painter">
        <ImgBox>
          <UserImg
            src="https://i.namu.wiki/i/ckyw5zMNXPPWXcS8fOaReaHtNBXuo_MHJwds3YO82wS3WVcw28ZJpfUOZN8wBCqWYg_OaCzb0Kz6ZOUDUHy_DbuMcvoiIUVWBnc2vQyGYngpjYV3iCQAzXii4FzJydMGToLNY2uIshfxXtMVRXCclA.webp"
            alt="쵸파"
          />
        </ImgBox>
        <TextBox>
          <UserId>seacrab808</UserId>
          <UserNick>유나에요</UserNick>
        </TextBox>
      </UserBox>

      <UserBox>
        <ImgBox>
          <UserImg
            src="https://i.namu.wiki/i/ckyw5zMNXPPWXcS8fOaReaHtNBXuo_MHJwds3YO82wS3WVcw28ZJpfUOZN8wBCqWYg_OaCzb0Kz6ZOUDUHy_DbuMcvoiIUVWBnc2vQyGYngpjYV3iCQAzXii4FzJydMGToLNY2uIshfxXtMVRXCclA.webp"
            alt="쵸파"
          />
        </ImgBox>
        <TextBox>
          <UserId>DORA</UserId>
          <UserNick>쵸코에몽</UserNick>
        </TextBox>
      </UserBox>

      <UserBox>
        <ImgBox>
          <UserImg
            src="https://i.namu.wiki/i/ckyw5zMNXPPWXcS8fOaReaHtNBXuo_MHJwds3YO82wS3WVcw28ZJpfUOZN8wBCqWYg_OaCzb0Kz6ZOUDUHy_DbuMcvoiIUVWBnc2vQyGYngpjYV3iCQAzXii4FzJydMGToLNY2uIshfxXtMVRXCclA.webp"
            alt="쵸파"
          />
        </ImgBox>
        <TextBox>
          <UserId>Shrimp</UserId>
          <UserNick>안녕하새우</UserNick>
        </TextBox>
      </UserBox>

      <UserBox>
        <ImgBox>
          <UserImg
            src="https://i.namu.wiki/i/ckyw5zMNXPPWXcS8fOaReaHtNBXuo_MHJwds3YO82wS3WVcw28ZJpfUOZN8wBCqWYg_OaCzb0Kz6ZOUDUHy_DbuMcvoiIUVWBnc2vQyGYngpjYV3iCQAzXii4FzJydMGToLNY2uIshfxXtMVRXCclA.webp"
            alt="쵸파"
          />
        </ImgBox>
        <TextBox>
          <UserId>I am </UserId>
          <UserNick>신뢰에요</UserNick>
        </TextBox>
      </UserBox>
    </UserList>
  );
};

const UserList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserId = styled.div`
  color: #2d3748;
  font-size: 18px;
`;

const UserNick = styled.div`
  color: #a0aec0;
  font-size: 14px;
`;

const UserBox = styled.div`
  width: 285px;
  height: 110px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px #e2e8f0;

  &[id='painter'] {
    background-image: linear-gradient(90deg, #313860 10%, #151928 90%);

    ${UserId} {
      color: #fff;
    }

    ${UserNick} {
      color: #cbd5e0;
    }
  }
`;

const ImgBox = styled.div`
  width: 70px;
  height: 70px;
  margin-left: 20px;
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const TextBox = styled.div`
  margin-left: 15px;
  font-weight: 700;
`;

export default CheckUser;

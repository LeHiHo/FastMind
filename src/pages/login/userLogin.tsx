import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Input,
  Button,
  Img,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { accessTokenState, onlineUserState } from '../../states/atom';
import { postLogin } from '../../api/index';
import { loginSocket } from '../../api/socket';
function UserLogin() {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUserState);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSetRecoilState(accessTokenState);
  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
    type: '',
  });
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postLogin(id, password);
      const { accessToken, refreshToken } = res.data;
      setAccessToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert('로그인에 성공했습니다.');
      loginSocket(accessToken, (data: any) => {
        setOnlineUsers(data);
      });

      // const socket = io(`${SERVER_URL}/server`, {
      //   extraHeaders: {
      //     Authorization: `Bearer ${accessToken}`,
      //     serverId: SERVER_ID,
      //   },
      // });
      // socket.on('connect', () => {
      //   socket.emit('users-server');
      // });
      // socket.on('users-server-to-client', (data) => {
      //   setOnlineUsers(data);
      // });
      navigate('/lobby');
    } catch (e: any) {
      let errorMessage = '';
      let errorType = '';
      if (e.message === 'Request failed with status code 401') {
        errorMessage = '비밀번호가 일치하지 않습니다.';
        errorType = 'password';
      } else if (e.message === 'Request failed with status code 400') {
        errorMessage = '일치하는 아이디가 없습니다.';
        errorType = 'id';
      } else {
        errorMessage = `로그인에 실패했습니다. 오류코드: ${e.message}`;
        errorType = 'general';
      }
      setShowAlert({ active: true, message: errorMessage, type: errorType });
    }
  };

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      backgroundColor="#f8fafc"
      height={'100vh'}>
      <Img
        src="/assets/fastMind.svg"
        position={'relative'}
        bottom={-140}
        alt="fastMind"
      />
      <Center
        marginBottom={200}
        backgroundColor={'white'}
        borderRadius={10}
        boxShadow="lg"
        flexDirection={'column'}
        minHeight={550}
        width={450}
        justifyContent={'flex-end'}>
        <form onSubmit={handleLoginSubmit}>
          <FormControl>
            <FormLabel marginLeft={7}>아이디</FormLabel>
            <Input
              placeholder="아이디를 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'id'
                  ? 'red.500'
                  : 'gray.200'
              }
              autoComplete="on"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              marginBottom={5}
              marginLeft={7}
              width={250}
            />
          </FormControl>
          <FormControl>
            <FormLabel marginLeft={7}>비밀번호</FormLabel>
            <Input
              placeholder="비밀번호를 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'password'
                  ? 'red.500'
                  : 'gray.200'
              }
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              marginBottom={7}
              marginLeft={7}
              width={250}
            />
          </FormControl>
          <FormControl
            marginLeft={7}
            display="flex"
            alignItems="center"
            marginBottom={7}>
            <Switch
              id="email-alerts"
              marginRight={3}
              sx={{
                '.css-p27qcy[data-checked]': {
                  // 활성화 상태에서의 트랙 색상
                  backgroundColor: '#4FD1C5',
                },
                '.css-7roig[data-checked]': {
                  // 활성화 상태에서의 썸 색상
                  backgroundColor: 'white',
                },
              }}
            />
            <FormLabel htmlFor="email-alerts" mb="0">
              계정 정보 기억하기
            </FormLabel>
          </FormControl>
          <Button
            width={300}
            height={50}
            type="submit"
            size="lg"
            color="white"
            bg={'#9AEBE0'}
            _hover={{
              bg: '#4FD1C5',
            }}
            _disabled={{
              bg: '#CBD5E0',
            }}
            isDisabled={!id || !password}>
            로그인
          </Button>
        </form>
        <Flex justifyContent={'center'} gap="10px" padding="10">
          회원이 아니신가요?
          <Link
            as={ReactRouterLink}
            to="/join"
            marginRight={2}
            color="#4FD1C5"
            fontWeight={700}>
            회원가입
          </Link>
        </Flex>
      </Center>
      {showAlert.active && (
        <Alert status="error" marginBottom={4} width={400} height={500}>
          <AlertIcon />
          <AlertTitle mr={2}>로그인 오류</AlertTitle>
          <AlertDescription>{showAlert.message}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() =>
              setShowAlert({ active: false, message: '', type: '' })
            }
          />
        </Alert>
      )}
    </Flex>
  );
}

export default UserLogin;

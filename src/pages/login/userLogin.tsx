import React, { useState, useEffect } from 'react';
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
  Box,
  Fade,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../../states/atom';
import { loginSocket } from '../../api/socket';
import { postLogin } from '../../api/index';
import { setCookies, getCookie, removeCookies } from '../../util/util';
import swal from 'sweetalert';
import { useLoginSocket } from '../../hooks/useLoginSocket';

function UserLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUserState);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
    type: '',
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    removeCookies();

    try {
      const res = await postLogin(id, password);
      setIsLogin(true);
      const { accessToken, refreshToken } = res.data;
      await setCookies(accessToken, refreshToken, id);
      loginSocket(accessToken, (data) => {
        setOnlineUsers(data); // Recoil 상태 업데이트
      });
      swal({
        title: '로그인에 성공했습니다.',
        icon: 'success',
      });
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

  useEffect(() => {
    if (showAlert.active) {
      const timer = setTimeout(() => {
        setShowAlert({ active: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert.active]);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (accessToken || refreshToken) {
      navigate('/lobby');
      console.log('리디렉션됨');
    }
  }, []);

  return (
    <Flex
      justifyContent={'flex-end'}
      alignItems={'center'}
      flexDirection={'column'}
      height={850}>
      <Center
        backgroundColor={'white'}
        borderRadius={10}
        boxShadow="lg"
        flexDirection={'column'}
        height={550}
        width={450}
        justifyContent={'flex-end'}>
        <Img
          src="/assets/fastMind.svg"
          position={'relative'}
          alt="fastMind"
          bottom={4}
        />
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
            bg={'#4FD1C5'}
            _hover={{
              bg: '#9AEBE0',
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
            fontWeight={600}>
            회원가입
          </Link>
        </Flex>
      </Center>
      <Fade in={showAlert.active}>
        <Alert
          bg={'red.500'}
          color={'white'}
          marginTop={5}
          marginBottom={3}
          status="error"
          width={400}
          height={70}
          borderRadius={10}>
          <AlertIcon color={'white'} />
          <Box>
            <AlertTitle mr={2}>로그인 오류</AlertTitle>
            <AlertDescription>{showAlert.message}</AlertDescription>
          </Box>
        </Alert>
      </Fade>
    </Flex>
  );
}

export default UserLogin;

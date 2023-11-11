import React, { useState, useEffect } from 'react';
import { postJoin } from '../../api/index';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Flex,
  Img,
  Link,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { ValidationInput, FormData } from '../../interfaces/interface';

const UserJoin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    picture: '',
  });

  const [isError, setIsError] = useState({
    id: false,
    password: false,
    confirmPassword: false,
    name: false,
    picture: false,
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    picture: '',
  });

  const [filePreviewUrl, setFilePreviewUrl] = useState('');

  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
    type: '',
  });

  const [isHovering, setIsHovering] = useState(false);

  const validateField = ({
    fieldName,
    value,
    formData,
  }: ValidationInput): string => {
    let error = '';
    switch (fieldName) {
      case 'id':
        if (value.trim() === '') error = '아이디을 입력해주세요';
        else if (!/^[a-zA-Z]+$/.test(value))
          error = '아이디는 알파벳만 포함할 수 있습니다.';

        break;
      case 'password':
        if (value.trim() === '') error = '비밀번호를 입력해주세요';
        else if (value.length < 5)
          error = '비밀번호는 최소 5자 이상이어야 합니다';
        break;
      case 'confirmPassword':
        if (value.trim() === '') error = '비밀번호를 한번 더 입력해주세요';
        else if (value !== formData.password)
          error = '비밀번호가 일치하지 않습니다';
        break;
      case 'name':
        if (value.trim() === '') error = '닉네임을 입력해주세요';
        else if (value.length < 2 || value.length > 20)
          error = '닉네임은 2자에서 20자 사이어야 합니다';
        else if (!/^[a-zA-Z가-힣]+$/.test(value))
          error = '닉네임은 알파벳과 완성된 한글 음절로만 구성되어야 합니다';
        break;
      default:
        break;
    }
    return error;
  };

  const fieldNames: Array<keyof FormData> = [
    'id',
    'password',
    'confirmPassword',
    'name',
  ];

  useEffect(() => {
    const newErrors: { [key in keyof FormData]?: string } = {};
    const newIsError: { [key in keyof FormData]?: boolean } = {};

    fieldNames.forEach((fieldName) => {
      const value: string = formData[fieldName];
      const error = validateField({ fieldName, value, formData });

      newErrors[fieldName] = error;
      newIsError[fieldName] = !!error;
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    setIsError((prevIsError) => ({ ...prevIsError, ...newIsError }));
  }, [formData]);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 닉네임중복 핸들링 로직 필요
      const res = await postJoin(formData);
      console.log(res);
      alert('회원가입에 성공했습니다.');
      navigate('/');
    } catch (e: any) {
      let errorMessage = '';
      let errorType = '';
      if (e.message === 'Request failed with status code 401') {
        errorMessage = '이미 가입된 아이디입니다.';
        errorType = 'id';
      } else {
        errorMessage = `회원가입에 실패했습니다. 오류코드: ${e.message}`;
        errorType = 'general';
      }
      setShowAlert({ active: true, message: errorMessage, type: errorType });
    }
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => error === '');
  };

  const handleImgUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setFilePreviewUrl(result);
          setFormData({ ...formData, picture: result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      backgroundColor="#f8fafc"
      height={'100vh'}>
      <Center
        margin={100}
        backgroundColor={'white'}
        borderRadius={10}
        boxShadow="lg"
        flexDirection={'column'}
        width={450}
        height={730}
        justifyContent={'flex-end'}>
        <form onSubmit={handleJoinSubmit}>
          <label
            htmlFor="picture"
            style={{ cursor: 'pointer', position: 'relative' }}>
            <Box
              width={150}
              height={150}
              backgroundColor={'#f8fafc'}
              borderRadius={10}
              overflow="hidden"
              margin={'auto'}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}>
              <Img
                src={filePreviewUrl || '/assets/inputImg.svg'}
                alt="File preview"
                width="100%"
                height="100%"
                borderRadius={10}
                objectFit="cover"
                style={
                  filePreviewUrl
                    ? {
                        border: '2px solid #E2E8F0',
                      }
                    : {}
                }
              />
              {isHovering && filePreviewUrl && (
                <Box
                  position="absolute"
                  top="50%" // 상단에서부터 50% 위치
                  left="50%" // 좌측에서부터 50% 위치
                  transform="translate(-50%, -50%)" // 자신의 크기의 절반만큼 이동
                  width={150}
                  height={150}
                  backgroundColor="rgba(0, 0, 0, 0.5)" // 불투명한 배경
                  borderRadius={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center">
                  <Img
                    src="public/assets/trashBin.svg" // 쓰레기통 이미지 경로
                    alt="Delete"
                    width="24px"
                    height="24px"
                  />
                </Box>
              )}
            </Box>
            <Input
              id="picture"
              accept="image/*"
              type="file"
              style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
              onChange={handleImgUploader}
            />
          </label>

          <FormControl
            isRequired
            isInvalid={isError.id}
            marginTop={3}
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>아이디</FormLabel>
            <Input
              placeholder="알파벳만 가능합니다"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'id'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="text"
              autoComplete="off"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <FormErrorMessage textAlign={'left'}>{errors.id}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={isError.name}
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>닉네임</FormLabel>
            <Input
              placeholder="2자이상 20자 이하로 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'name'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="text"
              autoComplete="off"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.name}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={isError.password}
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>비밀번호</FormLabel>
            <Input
              placeholder="5자 이상 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'password'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.password}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={isError.confirmPassword}
            marginBottom={10}
            marginLeft={7}
            width={250}>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              placeholder="5자 이상 입력해주세요"
              _placeholder={{ fontSize: 'sm' }}
              borderColor={
                showAlert.active && showAlert.type === 'confirmPassword'
                  ? 'red.500'
                  : 'gray.200'
              }
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>
          <Button
            width={300}
            type="submit"
            size="lg"
            isDisabled={!isFormValid()}
            color="white"
            bg={'#9AEBE0'}
            _hover={{
              bg: '#4FD1C5',
            }}
            _disabled={{
              bg: '#CBD5E0',
            }}>
            가입하기
          </Button>
        </form>
        <Flex justifyContent={'center'} gap="10px" padding="10">
          이미 가입하셨나요?
          <Link
            as={ReactRouterLink}
            to="/"
            marginRight={2}
            color="#4FD1C5"
            fontWeight={700}>
            로그인
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
};

export default UserJoin;

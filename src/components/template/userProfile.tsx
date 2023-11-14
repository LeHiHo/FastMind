import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Box,
  Img,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
import { getUserData, patchUserData } from '../../api';
import { disconnectLoginSocket } from '../../api/socket';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../util/util';

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [myID, setMyID] = useState('');
  const [myName, setMyname] = useState('');
  const [myImg, setMyImg] = useState('');

  const userId = getCookie('userId');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await getUserData(userId);
          setMyID(res.user.id);
          setMyname(res.user.name);
          setMyImg(res.user.picture);
        } catch (error) {
          console.error('내정보를 가져오는데 실패했습니다.:', error);
        }
      }
    };
    fetchData();
  }, [picture, name]);

  const handleImgUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setFilePreviewUrl(result);
          setPicture(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 닉네임중복 핸들링 로직 필요
      await patchUserData(name, picture);
      setMyname(name);
      setMyImg(picture);
      alert('수정에 성공했습니다.');
      navigate('/lobby');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserLogout = () => {
    try {
      disconnectLoginSocket();
      removeCookie();
      alert('로그아웃에 성공했습니다');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex
        width={450}
        height={160}
        backgroundImage={'src/assets/icons/card.png'}
        borderRadius={10}
        alignItems={'center'}
        justifyContent={'center'}
        color={'white'}>
        <Box
          width={100}
          height={100}
          backgroundImage={myImg}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          borderRadius={10}
          marginRight={23}></Box>
        <Box>
          <Text fontWeight="600" fontSize={20}>
            {myName}
          </Text>
          <Text fontSize={16} marginBottom={2} color="#CBD5E0">
            {myID}
          </Text>
          <Box>
            <Button
              onClick={onOpen}
              width={130}
              height="32px"
              marginRight={2}
              bg="#151928"
              border="1px solid #fff"
              _hover={{
                bg: '#fff',
                color: '#1A365D',
              }}
              color={'white'}>
              회원 정보 수정
            </Button>
            <Button
              width={130}
              height="32px"
              onClick={handleUserLogout}
              border="1px solid #fff"
              _hover={{
                bg: '#fff',
                color: '#1A365D',
              }}
              bg="#151928"
              color={'white'}>
              로그아웃
            </Button>
          </Box>
        </Box>
      </Flex>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent height={450}>
          <ModalHeader>회원 정보 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} marginTop={5}>
            <form onSubmit={handleEditSubmit}>
              <label
                htmlFor="picture"
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  bottom: 5,
                }}>
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
                    src={filePreviewUrl || myImg}
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
                  {isHovering && (
                    <Box
                      position="absolute"
                      transform="translate(0%, -100%)"
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
                  style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    opacity: 0,
                  }}
                  onChange={handleImgUploader}
                />
              </label>

              <FormControl marginTop={5} marginBottom={7}>
                <FormLabel>닉네임</FormLabel>
                <Input
                  placeholder="닉네임을 입력해주세요"
                  _placeholder={{ fontSize: 'sm' }}
                  borderColor={'gray.200'}
                  // borderColor={
                  //   showAlert.active && showAlert.type === 'name'
                  //     ? 'red.500'
                  //     : 'gray.200'
                  // }
                  autoComplete="on"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  width="388px"
                  height="50px"
                  justifyContent={'center'}
                />
              </FormControl>
              <Button
                width="390px"
                height="50px"
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
                // isDisabled={!name || !picture}
              >
                수정하기
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;

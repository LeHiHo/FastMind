import { useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { getMyUserData } from '../../util/util';

const UserProfile: React.FC<{ userImg: string }> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    picture: '',
  });
  const [mydata, setMydata] = useState('');

  const accessToken: string = useRecoilValue(accessTokenState);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && userId) {
        try {
          const res = await getMyUserData(accessToken, userId);
          setMydata(res.user.picture);
        } catch (error) {
          console.error('내정보를 가져오는데 실패했습니다.:', error);
        }
      }
    };
    fetchData();
  }, [accessToken, userId]);

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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          backgroundImage={mydata}
          borderRadius={10}
          marginRight={23}></Box>
        <Box>
          <Text fontWeight="600" marginBottom={3}>
            아이디
          </Text>
          <Text marginBottom={3}>닉네임</Text>
          <Box>
            <Button onClick={onOpen} width={130} height="32px" marginRight={2}>
              회원 정보 수정
            </Button>
            <Button width={130} height="32px">
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

              <FormControl marginTop={5}>
                <FormLabel>닉네임</FormLabel>
                <Input
                  placeholder="닉네임을 입력해주세요"
                  _placeholder={{ fontSize: 'sm' }}
                  // borderColor={
                  //   showAlert.active && showAlert.type === 'id'
                  //     ? 'red.500'
                  //     : 'gray.200'
                  // }
                  autoComplete="on"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin={0}
                  width="388px"
                  height="50px"
                  justifyContent={'center'}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              marginBottom={4}
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              width="390px"
              height="50px">
              수정하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;

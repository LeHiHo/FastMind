import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalBody,
  Text,
  Img,
  Flex,
  Switch,
} from '@chakra-ui/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleClick = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        overflow={'hidden'}
        color="gray.500"
        width="220px"
        height="150px"
        marginRight={10}
        position={'relative'}
        top={0}
        right={-510}
        boxShadow="lg"
        border="1px solid #E2E8F0"
        borderRadius={15}>
        <ModalBody
          p={0}
          width="100%"
          height="100%"
          display={'flex'}
          flexDirection={'column'}
          alignContent={'center'}
          justifyContent={'space-between'}>
          <Flex px={5} py={4} flexDirection={'column'}>
            <Flex
              marginBottom={2}
              alignItems={'center'}
              justifyContent={'space-between'}
              onClick={() => handleClick('/')}
              _hover={{
                textDecoration: 'underline',
              }}>
              로그인
              <Img
                src="/assets/icons/rightArrow.svg"
                width="5px"
                height="9px"
              />
            </Flex>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              onClick={() => handleClick('/join')}
              _hover={{
                textDecoration: 'underline',
              }}>
              회원가입
              <Img
                src="/assets/icons/rightArrow.svg"
                width="5px"
                height="9px"
              />
            </Flex>
          </Flex>
          <Flex
            px={5}
            py={4}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderTop="1px solid #E2E8F0"
            backgroundColor="#F7FAFC"
            height="60px">
            <Img src="/assets/icons/moon.svg" width="18px" height="18px" />
            <Text marginRight={9}>다크모드</Text>
            <Switch
              sx={{
                '.css-p27qcy[data-checked]': {
                  // 활성화 상태에서의 트랙 색상
                  backgroundColor: 'gray.500',
                },
                '.css-7roig[data-checked]': {
                  // 활성화 상태에서의 썸 색상
                  backgroundColor: 'white',
                },
              }}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

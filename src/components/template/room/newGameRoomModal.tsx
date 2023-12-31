import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { createGameRooms } from '../../../api';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  randomName: string;
}

const NewGameRoomModal: React.FC<ModalProps> = ({
  randomName,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let check;

    if (!name) {
      check = await createGameRooms(randomName, [], false);
    } else {
      check = await createGameRooms(name, [], false);
    }

    if (check === undefined) {
      swal({ title: '중복된 방이 있습니다.', icon: 'warning' });
    } else {
      swal({ title: '방 생성 성공', icon: 'success' });
      navigate(`/room/:${check.id}`);
    }
  };

  return (
    <Modal
      isCentered
      onClose={() => {
        onClose();
        setName('');
      }}
      isOpen={isOpen}
      motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent height={250}>
        <ModalHeader>방 만들기</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} paddingTop="0">
          <form onSubmit={handleEditSubmit}>
            <FormControl marginTop={1} marginBottom={5}>
              <FormLabel paddingTop="0">방 제목</FormLabel>
              <Input
                placeholder={randomName}
                _placeholder={{ fontSize: 'sm' }}
                borderColor={'gray.200'}
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
              }}>
              방 만들기
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewGameRoomModal;

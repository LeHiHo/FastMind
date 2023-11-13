import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Select, Icon } from '@chakra-ui/react';
import { useState } from 'react';
const LobbyListTop = () => {
  // const [sortOption, setSortOption] = useState('');
  const [selectOption, __] = useState('');
  return (
    <Flex justifyContent={'space-between'} paddingBottom="10px">
      <Select
        placeholder={selectOption}
        width={260}
        height="40px"
        backgroundColor={'white'}
        borderColor={'gray.200'}
        fontSize={16}>
        <option value="option1">모든 게임방 보기</option>
        <option value="option2">참여 가능한 게임방 보기</option>
      </Select>
      <Flex width={230} justifyContent={'space-between'}>
        <Button
          leftIcon={<Icon as={AddIcon} w={3} h={3} />}
          size="md"
          backgroundColor={'teal.300'}
          color={'white'}
          _hover={{
            backgroundColor: 'teal.200',
          }}>
          방 만들기
        </Button>
        <Button
          leftIcon={<ArrowRightIcon w={3} h={3} />}
          size="md"
          backgroundColor={'teal.400'}
          color={'white'}
          _hover={{
            backgroundColor: 'teal.500',
          }}>
          빠른 참가
        </Button>
      </Flex>
    </Flex>
  );
};

export default LobbyListTop;

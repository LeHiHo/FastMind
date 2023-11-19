import React, { useState } from 'react';
import styled from 'styled-components';
import { titleAction } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import { ChatIcon, HamburgerIcon } from '@chakra-ui/icons';
import LoginModal from '../template/login/loginModal';
import { useRecoilValue } from 'recoil';
import { chattingIdState } from '../../states/atom';
import CheckPrivateChat from '../template/lobby/checkPrivateChat';

const Header: React.FC = () => {
  const id: string = useRecoilValue(chattingIdState);

  const navigate = useNavigate();
  const [isChatContainerClicked, setIsChatContainerClicked] = useState(false);
  const [isMenuContainerClicked, setIsMenuContainerClicked] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const locationPath: string = location.pathname;

  const checkLocation = () => {
    titleAction(navigate, id);
  };

  const handleChatContainerClick = () => {
    setIsChatContainerClicked(!isChatContainerClicked);
    setIsMenuContainerClicked(false);
    setIsMenuModalOpen(false);
    setIsChatModalOpen(!isChatModalOpen);
  };

  const handleMenuContainerClick = () => {
    setIsChatContainerClicked(false);
    setIsMenuContainerClicked(true);
    setIsMenuModalOpen(true);
  };

  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
    setIsChatContainerClicked(false);
    setIsMenuContainerClicked(false);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setIsChatContainerClicked(false);
    setIsMenuContainerClicked(false);
  };

  return (
    <HeaderContainer>
      <Title onClick={checkLocation}>FastMind</Title>
      <LogoContainer>
        {locationPath === '/lobby' && (
          <StyledContainer
            as="div"
            $isClicked={isChatContainerClicked}
            onClick={handleChatContainerClick}>
            <ChatIcon width="19px" height="19px" color="#2D3748" />
          </StyledContainer>
        )}
        <StyledContainer
          as="div"
          $isClicked={isMenuContainerClicked}
          onClick={handleMenuContainerClick}>
          <HamburgerIcon width="24px" height="24px" color="#2D3748" />
        </StyledContainer>
      </LogoContainer>

      <CheckPrivateChat isOpen={isChatModalOpen} onClose={closeChatModal} />
      <LoginModal isOpen={isMenuModalOpen} onClose={closeMenuModal} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  cursor: pointer;
  line-height: 28px;
  font-size: 32px;
  font-weight: 600;
  margin-top: 5px;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const StyledContainer = styled.div<{ $isClicked: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
  background-color: ${(props) =>
    props.$isClicked ? '#e2e8f0' : 'transparent'};

  &:hover {
    background-color: #e2e8f0;
  }
`;

export default Header;

import React, { useState } from 'react';
import styled from 'styled-components';
import { titleAction } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import { ChatIcon, HamburgerIcon } from '@chakra-ui/icons';
import LoginModal from './loginModal';
import { useRecoilValue } from 'recoil';
import { accessTokenState, chattingIdState } from '../../states/atom';

const Header: React.FC = () => {
  const id: string = useRecoilValue(chattingIdState);
  const accessToken: string = useRecoilValue(accessTokenState);

  const navigate = useNavigate();
  const [isChatContainerClicked, setIsChatContainerClicked] = useState(false);
  const [isMenuContainerClicked, setIsMenuContainerClicked] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [__, setIsChatModalOpen] = useState(false);

  const checkLocation = () => {
    titleAction(navigate, accessToken, id);
  };

  const handleChatContainerClick = () => {
    setIsChatContainerClicked(true);
    setIsMenuContainerClicked(false);
    setIsMenuModalOpen(false);
    setIsChatModalOpen(true);
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

  return (
    <HeaderContainer>
      <Title onClick={checkLocation}>FastMind</Title>
      <LogoContainer>
        <StyledContainer
          as="div"
          $isClicked={isChatContainerClicked}
          onClick={handleChatContainerClick}>
          <ChatIcon width="19px" height="19px" color="#2D3748" />
        </StyledContainer>
        <StyledContainer
          as="div"
          $isClicked={isMenuContainerClicked}
          onClick={handleMenuContainerClick}>
          <HamburgerIcon width="24px" height="24px" color="#2D3748" />
        </StyledContainer>
      </LogoContainer>

      <LoginModal isOpen={isMenuModalOpen} onClose={closeMenuModal} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Title = styled.div`
  cursor: pointer;
  line-height: 28px;
  font-size: 32px;
  font-weight: 600;
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
  background-color: ${(props) =>
    props.$isClicked ? '#e2e8f0' : 'transparent'};

  &:hover {
    background-color: #e2e8f0;
  }
`;

export default Header;

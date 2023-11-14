import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;

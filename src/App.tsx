import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
import LoginRouter from './router/LoginRouter';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <LoginRouter />
        <MainRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

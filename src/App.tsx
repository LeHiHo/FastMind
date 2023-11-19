import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

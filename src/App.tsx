import React from 'react';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <ToastContainer />
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;

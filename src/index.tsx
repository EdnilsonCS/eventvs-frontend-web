import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/index';
import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);

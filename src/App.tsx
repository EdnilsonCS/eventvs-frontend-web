import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

function App(): JSX.Element {
  return (
    <AppProvider>
      <ToastContainer />
      <Routes />
    </AppProvider>
  );
}

export default App;

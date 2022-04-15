import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import 'sweetalert2/dist/sweetalert2.js';

function App(): JSX.Element {
  return (
    <AppProvider>
      <ToastContainer />
      <Routes />
    </AppProvider>
  );
}

export default App;

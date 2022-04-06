import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignIn from '../screens/SignIn';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

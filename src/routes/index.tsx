import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

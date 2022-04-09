import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeParticipant from '../screens/Participant/Home';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/participant/home" element={<HomeParticipant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

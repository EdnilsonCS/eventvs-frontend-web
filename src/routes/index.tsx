import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeParticipant from '../screens/Participant/Home';
import SubscribesParticipant from '../screens/Participant/Subscribes';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/participant/home" element={<HomeParticipant />} />
        <Route
          path="/participant/subscribes"
          element={<SubscribesParticipant />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

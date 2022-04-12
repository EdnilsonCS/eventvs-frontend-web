/* eslint-disable react/jsx-wrap-multilines */
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeParticipant from '../screens/Participant/Home';
import SubscribesParticipant from '../screens/Participant/Subscribes';
import ProtectedRoute from './PrivateRouter';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="participant"
          element={
            <ProtectedRoute path="participant">
              <>
                <Route path="home" element={<HomeParticipant />} />
                <Route path="subscribes" element={<SubscribesParticipant />} />
              </>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>There is nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

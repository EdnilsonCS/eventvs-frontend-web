/* eslint-disable react/jsx-wrap-multilines */
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import { useAuth } from 'src/hooks/auth';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeParticipant from '../screens/Participant/Home';
import SubscribesParticipant from '../screens/Participant/Subscribes';
import ProtectedRoute from './PrivateRouter';
import HomeProducer from '../screens/Producer/Home';
import AddCategoryProducer from '../screens/Producer/AddCategory';
import AddEventProducer from '../screens/Producer/AddEvent';

function Navigate(): JSX.Element {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/producer/home" index={false} element={<HomeProducer />} />
        <Route
          path="/producer/add-category"
          index={false}
          element={<AddCategoryProducer />}
        />
        <Route
          path="/producer/add-event"
          index={false}
          element={<AddEventProducer />}
        />
        {!token ? (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        ) : (
          <Route
            path="participant"
            element={
              <ProtectedRoute path="participant">
                <>
                  <Route path="home" element={<HomeParticipant />} />
                  <Route
                    path="subscribes"
                    element={<SubscribesParticipant />}
                  />
                </>
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

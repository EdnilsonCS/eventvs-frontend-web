/* eslint-disable react/jsx-wrap-multilines */
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeParticipant from '../screens/Participant/Home';
import SubscribesParticipant from '../screens/Participant/Subscribes';
import ProtectedRoute from './PrivateRouter';
import HomeProducer from '../screens/Producer/Home';
import AddCategoryProducer from '../screens/Producer/AddCategory';
import AddEventProducer from '../screens/Producer/Event/Create';
import DetailEventProducer from '../screens/Producer/Event/Detail';
import EditEventProducer from '../screens/Producer/Event/Edit';
import HomeAdmin from '../screens/Admin/Home';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute path="/">
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ProtectedRoute path="/sign-up">
              <SignUp />
            </ProtectedRoute>
          }
        />

        <Route path="participant">
          <Route
            path="home"
            element={
              <ProtectedRoute path="participant">
                <HomeParticipant />
              </ProtectedRoute>
            }
          />
          <Route
            path="subscribes"
            element={
              <ProtectedRoute path="participant">
                <SubscribesParticipant />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="producer">
          <Route
            path="home"
            element={
              <ProtectedRoute path="producer">
                <HomeProducer />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-category"
            element={
              <ProtectedRoute path="producer">
                <AddCategoryProducer />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-event"
            element={
              <ProtectedRoute path="producer">
                <AddEventProducer />
              </ProtectedRoute>
            }
          />

          <Route
            path="event/:id"
            element={
              <ProtectedRoute path="producer">
                <DetailEventProducer />
              </ProtectedRoute>
            }
          />

          <Route
            path="event/edit/:id"
            element={
              <ProtectedRoute path="producer">
                <EditEventProducer />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="admin"
          element={
            <ProtectedRoute path="admin">
              <Route path="home" element={<HomeAdmin />} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;

import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RoomsPage } from './pages/RoomsPage';
import { CartPage } from './pages/CartPage';
import { RoomItemPage } from './pages/RoomItemPage';
import { ContactsPage } from './pages/ContactsPage';
import { RightsPage } from 'pages/RightsPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import { ActivatePage } from 'pages/ActivatePage';
import { ProfilePage } from 'pages/ProfilePage';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { AboutUsPage } from 'pages/AboutUsPage';

export const Root = () => {
  const [accToken, setAccToken] = useState<string | null>(Cookies.get('accessToken') || null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App accToken={accToken} />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:roomId" element={<RoomItemPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />

          <Route path="/profile" element={<ProfilePage onAccToken={setAccToken}/>} />
          <Route path="/booking-list" element={<CartPage />} />

          <Route path="/activate/:token" element={<ActivatePage />} />

          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/rights" element={<RightsPage />}/>

          <Route path='/login' element={<AuthorizationPage selectLogin={true} onAccToken={setAccToken} />}/>
          <Route path='/registration' element={<AuthorizationPage selectLogin={false} onAccToken={setAccToken} />}/>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

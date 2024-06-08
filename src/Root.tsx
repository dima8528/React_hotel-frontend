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
import { ProductItemPage } from './pages/ProductItemPage';
import { ContactsPage } from './pages/ContactsPage';
import { RightsPage } from 'pages/RightsPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import { ActivatePage } from 'pages/ActivatePage';
import { ProfilePage } from 'pages/ProfilePage';
import { useState } from 'react';
import Cookies from 'js-cookie';

export const Root = () => {
  const [accToken, setAccToken] = useState<string | null>(Cookies.get('accessToken') || null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App accToken={accToken} />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/rooms" element={<RoomsPage />}></Route>
          <Route path="/rooms/:roomId" element={<ProductItemPage />}></Route>

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage onAccToken={setAccToken} />} />

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

import './app.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MessageContainer } from "./components/UI/MessageNotification";

type Props = {
  accToken: string | null;
};

export const App: React.FC<Props> = ({ accToken }) => {
  return (
    <div data-cy="app" className="wrapper">
      <MessageContainer />

      <Header accToken={accToken} />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

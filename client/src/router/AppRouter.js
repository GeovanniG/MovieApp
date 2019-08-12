import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from '../contexts/loggedIn';

const AppRouter = () => {
    return (
      <BrowserRouter basename="/">
        <LoggedInProvider>
          <Routes />
        </LoggedInProvider>
      </BrowserRouter>
    )
}

export default AppRouter;
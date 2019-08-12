import React, { useReducer } from 'react';
import loggedInReducer from '../reducers/loggedIn';

const initialState = {
  loggedIn: !!localStorage.getItem('token'),
  id: localStorage.getItem('id')
};

const LoggedInContext = React.createContext(initialState);

const LoggedInProvider = ({ children }) => {

  const [loggedIn, dispatchLoggedIn] = useReducer(loggedInReducer, initialState);

  return (
    <LoggedInContext.Provider value={[loggedIn, dispatchLoggedIn]}>
      {children}
    </LoggedInContext.Provider>
  )
}

export { LoggedInProvider, LoggedInContext };
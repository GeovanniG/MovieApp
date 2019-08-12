import React, { useContext } from 'react';
import { LoggedInContext } from '../contexts/loggedIn';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    return (props) => {
      const [loggedIn, dispatchLoggedIn] = useContext(LoggedInContext);
      const stateToProps = mapStateToProps(loggedIn);
      const dispatchToProps = mapDispatchToProps(dispatchLoggedIn);
      const newProps = { ...props, ...stateToProps, ...dispatchToProps };

      return (
        <Component {...newProps} />
      )
    }
  }
}

export default connect;
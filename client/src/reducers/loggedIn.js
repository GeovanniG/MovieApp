const loggedIn = (state={}, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.token);
      localStorage.setItem('id', action.id);
      return {
        loggedIn: true,
        id: action.id
      }
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      return {
        loggedIn: false,
        id: ''
      }
    default:
      return state;
  }
}

export default loggedIn;
const loginMode = (state = 'LOGIN', action) => {
    switch (action.type) {
      case 'SET_TO_LOGIN_MODE':
        return 'LOGIN';
      case 'SET_TO_REGISTER_MODE':
        return 'REGISTER';
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default loginMode;
  
import { authConstants } from '../../constants/actions';

const setSocket = (socket) => {
  return {
    type: 'SET_SOCKET',
    payload: socket,
  };
};

const loginRequest = () => {
  return {
    type: authConstants.LOGIN_REQUEST,
  };
};

const loginSuccess = (sessionData) => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    payload: sessionData,
  };
};

const loginFailure = (error) => {
  return {
    type: authConstants.LOGIN_FAILURE,
    payload: { error },
  };
};

const resetState = () => {
  return {
    type: authConstants.LOGIN_RESET,
  };
};

const logout = () => {
  return {
    type: authConstants.LOGOUT,
  };
};

export {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  resetState,
  setSocket,
};

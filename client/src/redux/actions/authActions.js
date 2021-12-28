import { authConstants } from '../../constants/actions';

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
  console.log('error: ', error);
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

export { loginFailure, loginRequest, loginSuccess, logout, resetState };

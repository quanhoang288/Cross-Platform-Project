import { authConstants } from '../../constants/actions';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../../configs';

const initialState = {
  loggingIn: false,
  user: null,
  error: null,
  socket: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };

    case authConstants.LOGIN_SUCCESS:
      const socket = io(SOCKET_URL);
      return {
        ...state,
        loggingIn: false,
        error: null,
        user: action.payload.user,
        socket,
      };

    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        logginIn: false,
        error: action.payload.error,
      };

    case authConstants.LOGIN_RESET:
      return {
        logginIn: false,
        user: null,
        error: null,
      };

    case authConstants.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;

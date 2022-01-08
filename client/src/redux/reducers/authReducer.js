import { authConstants } from '../../constants/actions';

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
      return {
        ...state,
        loggingIn: false,
        error: null,
        user: action.payload.user,
        socket: action.payload.socket,
      };

    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        logginIn: false,
        error: action.payload.error,
      };

    case authConstants.LOGIN_RESET:
      return initialState;

    case authConstants.LOGOUT:
      return {
        ...state,
        user: null,
        socket: null,
      };

    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

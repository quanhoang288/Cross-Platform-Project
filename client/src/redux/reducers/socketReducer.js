import { io } from 'socket.io-client';
import { SOCKET_URL } from '../../configs';

const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECT':
      const socket = io(SOCKET_URL);
      return { socket };

    case 'EMIT':
      return {
        ...state,
        logginIn: false,
        error: action.payload.error,
      };

    case 'LISTEN':
      break;

    default:
      return state;
  }
};

export default socketReducer;

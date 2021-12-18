const connect = () => {
  return {
    type: 'CONNECT',
  };
};

const emit = (event, data = {}) => {
  return {
    type: 'EMIT',
    payload: {
      event,
      data,
    },
  };
};

const listen = (event, callback) => {
  return {
    type: 'LISTEN',
    payload: {
      event,
      callback,
    },
  };
};

export { connect, emit, listen };

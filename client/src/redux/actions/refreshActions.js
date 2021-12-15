const refresh = () => {
  return {
    type: 'REFRESH',
  };
};

const fetchNext = () => {
  return {
    type: 'FETCH_NEXT',
  };
};

const initStart = () => {
  return {
    type: 'INITIALIZING',
  };
};

const initFinished = () => {
  return {
    type: 'INITIALIZED',
  };
};

export { refresh, fetchNext, initStart, initFinished };

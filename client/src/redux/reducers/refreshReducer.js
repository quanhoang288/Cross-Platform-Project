const initialState = {
  isRefreshing: false,
  isFetchingMore: false,
  initializing: false,
  initialized: false,
};

export default refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZING':
      return {
        ...initialState,
        initializing: true,
      };

    case 'INITIALIZED':
      return {
        ...initialState,
        initialized: true,
      };

    case 'REFRESH':
      return {
        ...initialState,
        isRefreshing: true,
      };

    case 'FETCH_NEXT':
      return {
        ...initialState,
        isFetchingMore: true,
      };

    default:
      return state;
  }
};

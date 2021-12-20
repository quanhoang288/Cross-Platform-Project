const resetState = () => {
  return {
    type: 'EMPTY',
  };
};

const addAsset = (asset) => {
  return {
    type: 'ADD_ASSET',
    payload: asset,
  };
};

const removeAsset = (asset) => {
  return {
    type: 'REMOVE_ASSET',
    payload: asset,
  };
};

const setAlbumName = (name) => {
  return {
    type: 'SET_ALBUM_NAME',
    payload: name,
  };
};

export { addAsset, removeAsset, resetState, setAlbumName };

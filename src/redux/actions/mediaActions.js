
const resetState = () => {
    return {
        type: 'EMPTY'
    };
};

const addAsset = (data) => {
    return {
        type: 'ADD_ASSET',
        payload: data,
    };
};

const removeAsset = (data) => {
    return {
        type: 'REMOVE_ASSET',
        payload: data,
    };
};


const setAlbumName = (name) => {
    return {
        type: 'SET_ALBUM_NAME',
        payload: name
    };
}

export {
    addAsset,
    removeAsset,
    resetState,
    setAlbumName,
};
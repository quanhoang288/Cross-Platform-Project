const uploading = () => {
    return {
        type: 'UPLOADING'
    };
};

const uploadSuccess = () => {
    return {
        type: 'UPLOAD_SUCCESS'
    };
};

const uploadFailure = (err) => {
    return {
        type: 'UPLOAD_FAILURE',
        payload: err
    };
};

const resetState = () => {
    return {
        type: 'RESET'
    };
}


export { resetState, uploading, uploadSuccess, uploadFailure };
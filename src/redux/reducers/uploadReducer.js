const initialState = {
    uploading: false,
    uploadSuccess: false,
    err: null,
};


export default uploadReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'UPLOADING':
            return {
                ...state,
                uploading: true
            };

        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                uploading: false,
                uploadSuccess: true
            };

        case 'UPLOAD_FAILURE': 
            return {
                ...state,
                uploading: false,
                err: action.payload
            };

        case 'RESET':
            return initialState;

        default: 
            return state;
    }
}
const initialState = {
    uploading: false,
    data: null,
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
                data: action.payload
            };

        case 'UPLOAD_FAILURE': 
            return {
                uploading: false,
                data: null,
                err: action.payload
            };

        case 'RESET':
            return initialState;

        default: 
            return state;
    }
}
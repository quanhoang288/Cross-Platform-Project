const initialState = {
    uploading: false,
    data: null,
    err: null,
};


export default uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOADING':
            return {
                ...initialState, 
                uploading: true
            };

        case 'UPLOAD_SUCCESS':
            return {
                ...initialState,
                data: action.payload
            };

        case 'UPLOAD_FAILURE': 
            return {
                ...initialState,
                err: action.payload
            };

        case 'RESET':
            return initialState;

        default: 
            return state;
    }
}
const modalReducer = (state = {type: null, data: null}, action) => {
    // console.log(action);
    switch (action.type) {
        case 'SHOW': 
            return {
                ...state, 
                type: action.payload.modalType, 
                data: action.payload.propsData
            };
        case 'HIDE':
            return {
                ...state, 
                type: null,
                data: null
            };
        default:
            return state;
    }
}

export const showModal = data => {
    return {
        type: 'SHOW',
        payload: {
            modalType: data.modalType,
            propsData: data.propsData
        }
    };
}

export const hideModal = () => {
    return {
        type: 'HIDE',
    };
}

export default modalReducer;
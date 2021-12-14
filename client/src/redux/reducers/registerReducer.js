import { auth } from "../../apis";
import { registerConstants } from "../../constants/actions";

const registerReducer = (state = {registering: false, registered: false, error: null}, action) => {

    switch (action.type) {
        case registerConstants.REGISTER_REQUEST:
            return {
                ...state,
                registering: true,
            };

        case registerConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registered: true,
                error: null,
            };
        
        case registerConstants.REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                error: action.payload.error,
            };

        case registerConstants.REGISTER_RESET: {
            return {
                registering: false,
                register: false,
                error: null,
            };
        }

        default:
            return state;
    }
}


export default registerReducer;
import { authConstants } from "../../constants/actions";

const authReducer = (state = {loggingIn: false, user: null, error: null}, action) => {

    switch (action.type) {
        case authConstants.LOGIN_REQUEST: 
            return {
                ...state,
                loggingIn: true,
            };
        
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                error: null,
                user: action.payload.user,
            };

        case authConstants.LOGIN_FAILURE:
            return {
                ...state, 
                logginIn: false,
                error: action.payload.error,
            };

        case authConstants.LOGIN_RESET:
            return {
                logginIn: false,
                user: null,
                error: null,
            }
        
        case authConstants.LOGOUT:
            return {
                ...state,
                user: null,
            }
        
        default:
            return state;
    }
}


export default authReducer;
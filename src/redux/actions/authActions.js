import { authConstants } from "../../constants/actions"


const loginRequest = () => {
    return {
        type: authConstants.LOGIN_REQUEST,
    };
};

const loginSuccess = (user) => {
    return {
        type: authConstants.LOGIN_SUCCESS,
        payload: { user }
    };
};

const loginFailure = (error) => {
    return {
        type: authConstants.LOGIN_FAILURE,
        payload: { error }
    };
};

const resetState = () => {
    return {
        type: authConstants.LOGIN_RESET,
    };
};


const logout = () => {
    return {
        type: authConstants.LOGOUT
    };
}

export { loginFailure, loginRequest, loginSuccess,  logout, resetState };
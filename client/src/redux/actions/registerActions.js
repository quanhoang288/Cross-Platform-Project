import { registerConstants } from "../../constants/actions"
import { auth } from "../../apis";
import { stacks } from "../../constants/title";


const registerRequest = () => {
    return {
        type: registerConstants.REGISTER_REQUEST,
    };
};

const registerSuccess = () => {
    return {
        type: registerConstants.REGISTER_SUCCESS,
    };
};

const registerFailure = (error) => {
    return {
        type: registerConstants.REGISTER_FAILURE,
        payload: { error }
    };
};

const resetState = () => {
    return {
        type: registerConstants.REGISTER_RESET,
    };
};


export {registerFailure, registerRequest, resetState, registerSuccess};

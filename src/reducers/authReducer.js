const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                authError: null
            };
        case "SIGNUP_ERROR":
            return {
                ...state,
                authError: "Signup error!"
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authError: null
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                authError: "Login error!"
            };
        case "UPDATE_SUCCESS":
            return {
                ...state,
                authError: null
            };
        case "UPDATE_ERROR":
            return {
                ...state,
                authError: "Update error!"
            };
        case "LOGOUT_SUCCESS":
            return state;
        default:
            return state;
    };
};

export default authReducer;
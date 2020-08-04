export const SIGN_UP = "SIGN_UP";
export const LOGIN_USER = "LOGIN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const EDIT_USER = "EDIT_USER";

const initialState = {
    user: {},
    error: "",
}

export default function addUser(state = initialState, action) {

    if (action.type === SIGN_UP) {
        if (alert("Register Succesfully")) { }
        else localStorage.user = JSON.stringify(action.payload.data);
        return (
            {
                ...state
            } && window.location.assign("http://localhost:3000/")
        )

    }


    if (action.type === "ERROR") {
        alert("User with this email has already exist");
        return {
            error: action.payload
        }
    }

    if (action.type === LOGIN_USER) {
        localStorage.user = JSON.stringify(action.payload.data)
        if (alert(action.payload.data.message)) { }
        else return window.location.assign("http://localhost:3000/");
    }

    if(action.type === LOG_OUT_USER){
        if(alert("Good bye")){
        }
        else{
            localStorage.removeItem("user");
            window.location.assign("/logout");
        }
        return{
            ...state
        }
    }

    else {
        return {
            ...state
        }
    }
}
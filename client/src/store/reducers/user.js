export const SIGN_UP = "SIGN_UP";
export const LOGIN_USER = "LOGIN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const EDIT_USER = "EDIT_USER";

const initialState={
    user:{},
    error:"",
}


export default function addUser(state=initialState,action){
    if(action.type === SIGN_UP){
        return alert("User created correctly") && {
            user: action.payload
        }
    }
    if(action.type === "ERROR"){
        return alert("User with this email has already exist") && {
            error: action.payload
        }
    }

    if(action.type === LOGIN_USER){
        return alert({
            email: action.payload.email,
            password: action.payload.password
        });
    }

    else{
        return{
            ...state
        }
    }
}
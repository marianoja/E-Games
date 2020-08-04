import axios from 'axios';
export const SIGN_UP = "SIGN_UP";
export const LOGIN_USER = "LOGIN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const EDIT_USER = "EDIT_USER";

export const signUp = user=>{
   return function(dispatch){
       const pet = axios({
        method: 'post',
        url: 'http://localhost:3002/user/add',
        headers: {}, 
        data: {
          firstName : user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          rol: "user"
        }
      });
      
      pet.then(u=>{
        dispatch({
            type: SIGN_UP,
            payload: u
        },2000)
      })
      pet.catch(error=>{
        dispatch({
            type: "ERROR",
            payload: error
        },2000)
      });

    }
}

export const loginUser = user=>{
    return{
        type: LOGIN_USER,
        payload: user
    }
}

export const logOutUser = user=>{
    return{
        type: LOG_OUT_USER,
        payload: user
    }
}

export const editUser = user=>{
    return{
        type:LOG_OUT_USER,
        payload: user
    }
}
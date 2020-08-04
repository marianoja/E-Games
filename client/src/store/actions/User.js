import axios from 'axios';
export const SIGN_UP = "SIGN_UP";
export const LOGIN_USER = "LOGIN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const EDIT_USER = "EDIT_USER";

export const signUp = user => {
  return function (dispatch) {
    const pet = axios({
      method: 'post',
      url: 'http://localhost:3002/user/add',
      headers: {},
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        rol: "user"
      }
    });

    pet.then(u => {
      dispatch({
        type: SIGN_UP,
        payload: u
      })
    })
    pet.catch(error => {
      dispatch({
        type: "ERROR",
        payload: error
      })
    });

  }
}

export const loginUser = user => {
  return function (dispatch) {
    const pet = axios({
      method: 'post',
      url: 'http://localhost:3002/auth/login',
      headers:{},
      data: {
        email: user.email,
        password: user.password,
        googleAuthenticated: user.googleAuthenticated
      },
      
    });

    pet.then(u => {
      dispatch({
        type: LOGIN_USER,
        payload: u
      })
    })
    pet.catch(error => {
      alert("User not found");
      return;
    });

  }
}

export const logOutUser = user => {
  return function (dispatch) {
    const pet = axios.get("http://localhost:3002/auth/logout")
    pet.then(r => {
      dispatch({
        type: LOG_OUT_USER,
        payload: r
      })
    })
  }
}

export const editUser = user => {
  return {
    type: LOG_OUT_USER,
    payload: user
  }
}
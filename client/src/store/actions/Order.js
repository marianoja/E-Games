import axios from 'axios';
export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const GET_DETAILS = "GET_DETAILS";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const GET_STATUS = "GET_STATUS";
export const CHECKOUT = "CHECKOUT";


export const addOrder = (products) => {
  return function (dispatch) {
    const pet = axios({
      method: 'post',
      url: 'http://localhost:3002/order',
      headers: {},
      data: {
        productId: products.id,
        UserId: products.userId,
      }
    });

    pet.then(order => {
      dispatch({
        type: ADD_ORDER,
        payload: order
      }, 200)
    })
    pet.catch(error => {
      return;
    });

  }
}

export const getOrders = (id) => {
  return function (dispatch) {
    const pet = axios.get('http://localhost:3002/order/' + id)
    pet.then(order => {
      dispatch({
        type: GET_ORDERS,
        payload: order.data
      }, 200)
    })


  }
}

export const getStatus = (id) => {
  return function (dispatch) {
    const pet = axios.get('http://localhost:3002/order/status/' + id)
    pet.then(order => {
      dispatch({
        type: GET_STATUS,
        payload: order.data
      }, 200)
    })


  }
}

export const getDetails = idOrden => {
  return function (dispatch) {
    const pet = axios.get('http://localhost:3002/order/' + idOrden + '/details')
    pet.then(order => {
      dispatch({
        type: GET_DETAILS,
        payload: order.data
      }, 200)
    })


  }
}

export const deleteOrder = id => {
  return function (dispatch) {
    const pet = axios({
      method: "put",
      url: 'http://localhost:3002/order',
      headers: {},
      data: {
        status: "cancelled",
        orderId: id
      }
    });
    pet.then(r => {
      dispatch({
        type: REMOVE_ORDER,
        payload: r
      })
    })
  }
}

export const checkOut = order=>{
  return function(dispatch){
    const pet = axios({
      method: "post",
      url: 'http://localhost:3002/checkout',
      headers:{},
      data:order,
    })
    if (alert("Your order is being processed. Please check your email")) { }
    else {
        window.location.assign("http://localhost:3000/")
    }
  }
}
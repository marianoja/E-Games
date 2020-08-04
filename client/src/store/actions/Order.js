import axios from 'axios';
export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const GET_DETAILS = "GET_DETAILS";


export const addOrder = (products)=>{
    return function(dispatch){
        const pet = axios({
         method: 'post',
         url: 'http://localhost:3002/order',
         headers: {}, 
         data: {
           productId: products,
           UserId : 1,
         }
       });
       
       pet.then(order=>{
         dispatch({
             type: ADD_ORDER,
             payload: order
         },2000)
       })
      /* pet.catch(error=>{
         dispatch({
             type: "ERROR",
             payload: error
         },2000)
       });*/
 
     }
 }

 export const getOrders = (id)=>{
    return function(dispatch){
        const pet = axios.get('http://localhost:3002/order/'+id)
       pet.then(order=>{
         dispatch({
             type: GET_ORDERS,
             payload: order.data
         },2000)
       })

 
     }
 }

 export const getDetails= idOrden=>{
    return function(dispatch){
       const pet = axios.get('http://localhost:3002/order/'+idOrden+'/details')
       pet.then(order=>{
         dispatch({
             type: GET_DETAILS,
             payload: order.data
         },2000)
       })
 
 
 }}
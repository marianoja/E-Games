export const GET_ORDERS = "GET_ORDERS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_ORDER = "ADD_ORDER";

const initialState={
    orders:[],
    details: [],
    amount : 0,
    price : 0
}


export default function order(state=initialState,action){
    if(action.type === ADD_ORDER){
        return alert("orden añadida");
        /*return{
            ...state,
            order : action.payload
        }*/
    }
    if(action.type === GET_ORDERS){
        return {
            ...state,
            orders: action.payload
        }
    }

    if(action.type === GET_DETAILS){
        return{
            ...state,
            details: action.payload.orderDetail,
            price: action.payload.price,
            amount: action.payload.amount
        }
    }


    else{
        return{
            ...state
        }
    }

}
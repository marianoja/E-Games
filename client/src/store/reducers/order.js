import { destroy } from 'cart-localstorage'
export const GET_ORDERS = "GET_ORDERS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_ORDER = "ADD_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const GET_STATUS = "GET_STATUS";
export const CHECKOUT = "CHECKOUT";

const initialState = {
    orders: [],
    details: [],
    amount: 0,
    price: 0,
    status: ""
}


export default function order(state = initialState, action) {
    if (action.type === ADD_ORDER) {
        if (alert("order added!")) { }
        else {
            destroy();
            window.location.assign("http://localhost:3000/orders")
        }
        return {
            ...state,
            order: action.payload
        }
    }
    if (action.type === GET_ORDERS) {
        return {
            ...state,
            orders: action.payload
        }
    }

    if (action.type === GET_DETAILS) {
        return {
            ...state,
            details: action.payload.orderDetail,
            price: action.payload.price,
            amount: action.payload.amount
        }
    }

    if (action.type === GET_STATUS) {
        return {
            ...state,
            status: action.payload
        }
    }

    if (action.type === REMOVE_ORDER) {
        if (alert("Order cancelled!")) { }
        else
            window.location.reload();
        return {
            ...state
        }
    }

    else {
        return {
            ...state
        }
    }

}
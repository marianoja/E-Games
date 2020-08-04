import { add, remove, quantity } from 'cart-localstorage' 
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRICE = "UPDATE_PRICE";
export const DECREMENT_PRODUCT = "DECREMENT_PRODUCT";

const initialState = {
    productsInCart: [],
    price: 0,
    quantity: 0
}


export default function cart(state = initialState, action) {

    if (action.type === ADD_PRODUCT) {
       
            add({
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                image: action.payload.image
            })
            return {
                ...state,
            }
        
    }

    if (action.type === REMOVE_PRODUCT) {
        remove(action.payload.id);
        return{
            ...state
        }
    }

    if (action.type === DECREMENT_PRODUCT) {
        quantity(action.payload.id,-1)

        return {
            ...state,
        }
    }

    else {
        return {
            ...state
        }
    }
}


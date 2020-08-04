export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRICE = "UPDATE_PRICE";
export const DECREMENT_PRODUCT = "DECREMENT_PRODUCT";

export function addProduct(product){
    return{
        type: ADD_PRODUCT,
        payload: product
    }
}

export function decrementProduct(product){
    return{
        type: DECREMENT_PRODUCT,
        payload: product
    }
}

export function removeProduct(product){
    return{
        type: REMOVE_PRODUCT,
        payload: product
    }
}


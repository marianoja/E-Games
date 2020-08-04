export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRICE = "UPDATE_PRICE";

export function addProduct(product){
    return{
        type: ADD_PRODUCT,
        payload: product
    }
}

export function removeProduct(product){
    return{
        type: REMOVE_PRODUCT,
        payload: product
    }
}

export function updatePrice(price){
    return{
        type: UPDATE_PRICE,
        payload: price
    }
}
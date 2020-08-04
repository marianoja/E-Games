export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRICE = "UPDATE_PRICE";

const initialState = {
    productsInCart:[],
    price:0,
    quantity:0
}


export default function cart(state=initialState, action){
    if (action.type===ADD_PRODUCT){
        if(!state[action.payload.name+" quantity"]){
        return{
            ...state,
            quantity: state.quantity + 1,
            [action.payload.name+" quantity"] : 1, 
            productsInCart: state.productsInCart.concat(action.payload)
        }}
        else{
            return{
                ...state,
                quantity: state.quantity + 1,
                [action.payload.name+" quantity"] : state[action.payload.name+" quantity"] + 1, 
                productsInCart: state.productsInCart.concat(action.payload)
            }
        }
    }
    if (action.type === REMOVE_PRODUCT){
        var pos = state.productsInCart.map(function(e) { return e.name; }).indexOf(action.payload.name);
        const newProducts = [...state.productsInCart]
        newProducts.splice(pos,1);
        return{
            ...state,
            price: state.price - action.payload.price,
            quantity: state.quantity -1,
            [action.payload.name+" quantity"] : state[action.payload.name+" quantity"] - 1, 
            productsInCart: newProducts
        }
    }
    if (action.type === UPDATE_PRICE){
        return{
            ...state,
            price: state.price + action.payload
        }
    }
    else{
        return{
            ...state
        }
    }
}


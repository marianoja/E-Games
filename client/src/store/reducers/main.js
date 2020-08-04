import {combineReducers} from 'redux';
import cart from './cart'
import user from './user'
import order from './order'
import review from './review'

export default combineReducers({
    cart : cart,
    user : user,
    order : order,
    review: review,
});
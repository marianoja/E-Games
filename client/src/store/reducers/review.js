export const GET_REVIEWS = "GET_REVIEWS";
export const ADD_REVIEW = "ADD_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";

const initialState={
    review:{},
    reviews:[]
}

export default function review (state=initialState, action){

    if(action.type === ADD_REVIEW){
        return alert("Review created.") &&
        {
            review: action.payload,
            reviews: state.reviews.concat(action.payload)
        }
    }

    if(action.type === GET_REVIEWS){
        return{
            ...state,
            reviews: action.payload.data
        }
    }

    if(action.type === DELETE_REVIEW){
        if(alert('Review removed!')){}
        else    window.location.reload(); 
        return{
            ...state
        }
    }

    if(action.type === EDIT_REVIEW){
        if(alert('Review edited!')){}
        else    window.location.reload(); 
        return{
            ...state
        }
    }


    else{
        return{
            ...state
        }
    }
}
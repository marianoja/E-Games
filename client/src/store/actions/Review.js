import axios from 'axios';
export const ADD_REVIEW = "ADD_REVIEW";
export const GET_REVIEWS = "GET_REVIEWS";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";


export const addReview = (review)=>{
    return function(dispatch){
        const pet = axios({
         method: 'post',
         url: 'http://localhost:3002/review/'+ review.idProduct,
         headers: {}, 
         data: {
            star : review.star,
            description : review.description,
            UserId: review.userId
         }
       });
        pet.then(r=>{
            dispatch({
                type: ADD_REVIEW,
                payload: r
            })
        })
}}

export const getReviews = (id)=>{
    return function(dispatch){
        const pet = axios.get('http://localhost:3002/review/'+id)
        pet.then(r=>{
            dispatch({
                type:GET_REVIEWS,
                payload: r
            })
        })
    }
}

export const deleteReview = (id)=>{
    return function(dispatch){
        const pet = axios.delete('http://localhost:3002/review/'+ id);
        pet.then(r=>{
            dispatch({
                type: DELETE_REVIEW,
                payload: r
            })
        })
}}

export const editReview = (review)=>{
    return function(dispatch){
        const pet = axios({
         method: 'put',
         url: 'http://localhost:3002/review/'+ review.id,
         headers: {}, 
         data: {
            star : review.star,
            description : review.editDescription,
            UserId: review.userId
         }
       });
        pet.then(r=>{
            dispatch({
                type: EDIT_REVIEW,
                payload: r
            })
        })
}
}
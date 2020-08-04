import React from 'react';
import './styles/reviews.css';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { connect } from 'react-redux';
import { addReview, getReviews, deleteReview, editReview } from '../../store/actions/Review';

export class Review extends React.Component {

    constructor() {

        super();
        this.state = {
            star: 0,
            userId: 1,
            description: "",
            idProduct: 0,
            edit: false,
            editDescription: "",
            id: 0,
        }
        this.setInput = this.setInput.bind(this);
    }


    submit = (e) => {
        e.preventDefault();
        this.props.addReview(this.state);
        window.location.reload();
    }

    setRating = (e) => {
        const st = parseInt(e.target.value);
        this.setState({
            star: st
        })
    }

    setEdit = (e) => {
        this.setState({
            editDescription: e.target.value,
            idProduct: this.props.idProduct
        })
    }

    setInput = (e) => {
        this.setState({
            description: e.target.value,
            idProduct: this.props.idProduct
        })
    }

    showReview = (r) => {
        return (
            <div className="clearfix">
                <p>{r.description}</p>
            </div>
        )
    }

    editReview = (r) => {
        return (
            <div className="clearfix">
                <input id="ratings-hidden" name="rating" type="hidden" />
                <textarea onChange={this.setEdit} value={this.state.editDescription} className="form-control animated" cols="50" id="new-review" name="comment" placeholder={r.description} rows="5"></textarea>
                <div className="text-right">
                    <div className="rating">
                        <Rating onChange={this.setRating} name="size-large" defaultValue={2} size="large" />
                    </div>
                    <button onClick={() => this.props.editReview(this.state)} className="btn btn-success btn-lg" id="edit-review" type="button">Change</button>
                </div>
            </div>

        )

    }




    render() {
        return (
            <div className="col-md-10" id="reviews">
                {this.props.reviews.map(r => {
                    return (
                        <div className="card" id="card-review">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-1">
                                        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                    </div>
                                    <div className="col-md-9">
                                        <p id="">
                                            <a className="float-left" ><strong>{r.User.firstName + " " + r.User.lastName}</strong></a>
                                            <Rating name="read-only" value={r.star} readOnly />
                                        </p>
                                        {!this.state.edit && this.showReview(r)}
                                        {this.state.edit && this.editReview(r)}
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={() => this.setState({ edit: !this.state.edit, id: r.id })} type="button" id="edit" className="btn">Edit</button>
                                        <button onClick={() => this.props.deleteReview(r.id)} type="button" className="close" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                })}

                <div className="container">
                    <div className="row" id="create-review">
                        <div className="col-md-10">
                            <div className="well well-sm">
                                <div className="col-md-12">
                                    <form onSubmit={this.submit.bind(this)} acceptCharset="UTF-8" >
                                        <input id="ratings-hidden" name="rating" type="hidden" />
                                        <textarea onChange={this.setInput} value={this.state.description} className="form-control animated" cols="50" id="new-review" name="comment" placeholder="Enter your review here..." rows="5"></textarea>

                                        <div className="text-right">
                                            <div className="rating">
                                                <Rating onChange={this.setRating} name="size-large" defaultValue={2} size="large" />
                                            </div>
                                            <button className="btn btn-success btn-lg" id="submit" type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        reviews: state.review.reviews
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addReview: rev => dispatch(addReview(rev)),
        getReviews: id => dispatch(getReviews(id)),
        deleteReview: id => dispatch(deleteReview(id)),
        editReview: review => dispatch(editReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
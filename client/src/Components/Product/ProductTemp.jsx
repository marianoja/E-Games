import React from 'react';
import axios from 'axios';
import './styles/template.css';
import { connect } from 'react-redux';
import { addProduct, updatePrice } from '../../store/actions/index';
import { getReviews } from '../../store/actions/Review';
import Review from './Review';

export class ProductTemp extends React.Component {
    constructor() {
        super();
        this.state = {
            product: ""
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3002/product/' + this.props.match.params.productId)
            .then((e) => {
                console.log(e);
                this.setState({ product: e.data })
                this.props.getReviews(e.data.id);
            })

    }

    render() {
        return (
            <div style={{marginTop:"40px"}} className="container" id="product-section">
                <div className="row">
                    <div className="col-md-6" id="product-image">
                        <img
                            src={this.state.product.image}
                            alt={this.state.product.name}
                            className="image-responsive"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>{this.state.product.name}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                {/*console.log(this.state.product.categories.map(c=>{
                    return <span className="label label-primary">{c.name}</span>
                }))*/}

                                <span className="monospaced">Product id:{this.state.product.id}</span>
                            </div>
                            <div className="col-md-5 text-center">
                                <span className="monospaced">In Stock:{this.state.product.stock}</span>
                            </div>
                            <div className="col-md-3">
                                <span className="sr-only">Four out of Five Stars</span>
                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                                <span className="label label-success">61{/*this.state.product.valoration*/}</span>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="description">
                                    {this.state.product.description}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 bottom-rule">
                            <button style={{height:"50px", textAlign:"center",color:"black",width:"150px"}} type="button" class="btn btn-warning"><p>${this.state.product.price}</p></button>
                            </div>
                            <div className="col-md-3">
                                <button style={{width:"200px", height:"50px"}} disable={this.state.product.stock ? 0 : true} onClick={() => {
                                    (this.props.addProduct(this.state.product))
                                }} className="btn btn-success btn-primary btn-lg">
                                    Add to Cart
                 </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 bottom-rule top-10"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Review idProduct={this.state.product.id} />
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: product => dispatch(addProduct(product)),
        getReviews: id => dispatch(getReviews(id))
    }
}


export default connect(null, mapDispatchToProps)(ProductTemp)
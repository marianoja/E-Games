import React from 'react';
import './styles/product.css';
import {connect} from 'react-redux';
import {addProduct,updatePrice} from '../../store/actions/index';


export class Product extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="product-grid6">
                <div className="product-image6">
                    <a href={`/product/${this.props.id}`}>
                        <img className="pic-1" src={this.props.image} />
                    </a>
                </div>
                <div className="product-content">
                    <h3 className="title"><a href={`/product/${this.props.id}`}>{this.props.name}</a></h3>
                    <div className="price">${this.props.price}
                      
                    </div>
                </div>
                {this.props.stock > 0 &&                
                 <ul className="social">
                    <li><a href={`/product/${this.props.id}`} data-tip="View Details"><i className="fa fa-search"></i></a></li>
                    <li><a onClick={()=>{
                        (this.props.stock > 0 && this.props.addProduct(this.props.product ) && this.props.updatePrice(this.props.product.price)) 
                    }} data-tip="Add to Cart"><i className="fa fa-shopping-cart"></i></a></li>
                </ul> || <img className="social" src="http://www.jrsanfeliu.com/wp-content/uploads/2015/07/Out-of-stock3.jpg" />}
                
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        addProduct: product=>dispatch(addProduct(product)),
        updatePrice: price=> dispatch(updatePrice(price))
    }
}


export default connect(null,mapDispatchToProps)(Product)
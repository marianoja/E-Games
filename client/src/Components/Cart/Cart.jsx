import React from 'react';
import { connect } from "react-redux";
import {removeProduct} from '../../store/actions/Cart'
import {addOrder} from '../../store/actions/Order';

export class Cart extends React.Component{
    constructor(){
        super();
        this.state={
        }
    }

    componentDidUpdate(){
      return this.props; 
    }

    addProductsToOrder= (e)=>{
      e.preventDefault();
      const productsId = [];
      var oldId;
      this.props.products.map(p=>{
        if(oldId!=p.id) {
          productsId.push(p.id);
          oldId=p.id;
        }
      })
      this.props.addOrder(productsId)
      setTimeout(function() {
        window.location.href = "http://localhost:3000/orders"
      }, 100);
    }


    render(){
        return(
            <div className="container">
  <div className="shopping-cart">
    <div className="shopping-cart-header">
        <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">{this.props.quantity}</span>
      <div className="shopping-cart-total">
        <span className="lighter-text">Total:</span>
        <span className="main-color-text">${this.props.price}</span>
      </div>
    </div> 

    <ul className="shopping-cart-items">
      {this.props.products.map(p=>{
        if(!this.props[p.name]){
        this.props={
          ...this.props,
          [p.name] : p.name
        }
        return(
        <li className="clearfix">
          <button onClick={()=>this.props.removeProduct(p)} type="button" data-dismiss="modal" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
          <img src={p.image} alt="" />
          <span className="item-name">{p.name}</span>
          <span className="item-price">${p.price}</span>
          <span className="item-quantity">Quantity: {this.props.cartState[p.name+" quantity"]}</span>
        </li>)}
      })}
    </ul>

    <a href="/orders" onClick={this.addProductsToOrder.bind(this)} className="button">Checkout</a>
  </div>
</div>
           
        )
    }
}
    function typeOfCar(r){
        if(r.props.products.length > 0){
            return <i className="fas fa-cart-plus"></i>
        }
        else{
            return <i className="fas fa-shopping-cart"></i>
        }
    }

    function mapDispatchToProps(dispatch){
      return{
          removeProduct: product=>dispatch(removeProduct(product)),
          addOrder : productsId => dispatch(addOrder(productsId)),
      }
  }

    function mapStateToProps(state){
        return{
            quantity: state.cart.quantity,
            products : state.cart.productsInCart,
            price: state.cart.price,
            cartState : state.cart
        }
    }

export default connect(mapStateToProps,mapDispatchToProps)(Cart)



import React from 'react';
import { connect } from "react-redux";
import './styles/cart.css'
import { removeProduct, addProduct, decrementProduct, updatePrice } from '../../store/actions/Cart'
import { addOrder } from '../../store/actions/Order';
import { list, total } from 'cart-localstorage';

export class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  addProductsToOrder = (e) => {
    e.preventDefault();
    var user = JSON.parse(localStorage.user)
    const userId = user.userId;
    if (list().length > 0) {
      const productsId = [];
      list().map(p => {
        productsId.push(p.id);
      }
      )
      const order = {
        id: productsId,
        userId: userId
      }
      this.props.addOrder(order)
    }
  }

  componentDidUpdate() {
    this.props.navState.setState({})
  }


  render() {
    const cart = list();
    return (
      <div className="container">
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">{cart.length}</span>
            <div className="shopping-cart-total">
              <span className="lighter-text">Total:</span>
              <span className="main-color-text">${total()}</span>
            </div>
          </div>

          <ul className="shopping-cart-items">
            {cart.map(p => {
              return (
                <li className="clearfix">
                  <button onClick={() => this.props.removeProduct(p) && this.setState({ ...this.state })} type="button" data-dismiss="modal" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <button onClick={() => this.props.addProduct(p) && this.setState({ ...this.state })} id="add" className="btn btn-block btn-sm btn-outline-primary">+</button>
                  <button onClick={() => this.props.decrementProduct(p) && this.setState({ ...this.setState })} id="reduce" className="btn btn-block btn-sm btn-outline-primary">-</button>
                  <img src={p.image} alt="" />
                  <span className="item-name">{p.name}</span>
                  <span className="item-price">${p.price}</span>
                  <span className="item-quantity">Quantity: {p.quantity}</span>
                </li>)
            }
            )}
          </ul>

          <a href="#" onClick={this.addProductsToOrder.bind(this)} className="button">Checkout</a>
        </div>
      </div>

    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    removeProduct: product => dispatch(removeProduct(product)),
    addOrder: productsId => dispatch(addOrder(productsId)),
    addProduct: product => dispatch(addProduct(product)),
    decrementProduct: product => dispatch(decrementProduct(product)),

  }
}



export default connect(null, mapDispatchToProps)(Cart)



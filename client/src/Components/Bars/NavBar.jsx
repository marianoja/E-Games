import React, { Component } from 'react'
import SearchBar from './SearchBar'
import './styles/navBar.css'
import Cart from '../Cart/Cart'
import { connect } from "react-redux";

export class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      isOpen:false,
      quantity:0,
    }
  }

  clickCart = ()=>{
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  setQuantity= (p)=>{
    this.setState({
      quantity: p
    })
  }

  render() {
    return (
      <div>
      <nav>
  <div className="container">
    <ul className="navbar-left">
      <li><a href="/">Home</a></li>
      <li><a href="/catalog">Catalog</a></li>
      <li><SearchBar search={this.props.search}/></li>
    </ul> 

    <ul className="navbar-right">
      <li><a onClick={this.clickCart} href="#" id="cart"><i className="fa fa-shopping-cart"></i> Cart <span className="badge">{this.props.quantity}</span></a></li>
    </ul> 
  </div> 
</nav>
    {this.state.isOpen && <Cart setQuantity={this.setQuantity} /> }

</div>
      
    )
    }
}

function mapStateToProps(state){
  return{
      quantity: state.cart.quantity,
  }
}

export default connect(mapStateToProps)(Navbar)
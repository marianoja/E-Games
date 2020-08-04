import React, { Component } from 'react'
import SearchBar from './SearchBar'
import './styles/navBar.css'
import Cart from '../Cart/Cart'
import { connect } from "react-redux";
import { logOutUser } from '../../store/actions/User'

export class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      quantity: 0,
      user:{}
    }
  }

  clickCart = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setQuantity = (p) => {
    this.setState({
      quantity: p
    })
  }

  componentDidMount(){
    if(localStorage.user){
      this.setState({
        user: JSON.parse(localStorage.user)
      })
    }
  }


  render() {
    return (
      <div>
        <nav>
          <div id="navbar" className="container">
            <ul className="navbar-left">
              <li><a style={{fontWeight:"bold"}} href="/"><i class="fa fa-fw fa-home"></i>Home</a></li>
              <li><a style={{fontWeight:"bold"}} href="/catalog"><i class="fas fa-gamepad"></i>Catalog</a></li>
              <li><SearchBar search={this.props.search} /></li>
            </ul>

            <ul className="navbar-right">
              {!localStorage.user && <li><a style={{fontWeight:"bold"}} href="/login"><i class="fa fa-fw fa-user"></i> Login</a></li>}
              {localStorage.user &&
                <div class="dropdown">
                  <button style={{fontWeight:"bold"}} class="dropbtn" for="btnControl"><i class="fa fa-fw fa-user"></i> {this.state.user.firstName}</button>
                  <div class="dropdown-content">
                    <a href="/orders/">View Orders</a>
                    <a href="#" style={{color:"white"}}onClick={()=>this.props.logOut()}>Log Out</a>
                  </div>
                </div>
              }
              <li><a style={{fontWeight:"bold"}} onClick={this.clickCart} href="#" id="cart"><i className="fa fa-shopping-cart"></i> Cart</a></li>
            </ul>
          </div>
        </nav>
        {this.state.isOpen && <Cart navState={this} setQuantity={this.setQuantity} />}

      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    quantity: state.cart.quantity,
  }
}

function mapDispatchToProps(dispatch){
  return{
    logOut: ()=>dispatch(logOutUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
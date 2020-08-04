import React from 'react'
import Detail from './Detail'
import {connect} from 'react-redux';
import {getDetails,getStatus} from '../../store/actions/Order'
import {total} from 'cart-localstorage'
import './styles/checkout.css'


export class OrderDetail extends React.Component {
  componentDidMount(){
    this.props.getDetails(this.props.match.params.orderId);
    this.props.getStatus(this.props.match.params.orderId);
  }

  render(){
    console.log(this.props)
  return (
    <div className="container mt-5">
      <div className="row">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Cant</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {this.props.details.map(od=>{
              return <Detail name={od.product.name} image={od.product.image} price={od.product.price} amount={od.details.amount}/>
            })}
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>{this.props.amount}</th>
              <th> ${this.props.price} </th>
              <th></th>
            </tr>
            <button disabled={this.props.status==="cancelled" || this.props.status==="completed"} onClick={()=>window.location.assign('/checkout')} id="continue" class="btn btn-primary btn-lg btn-block" type="button">Continue to checkout</button>
          </tbody>
        </table>
      </div>
    </div>
  )}
}

function mapStateToProps(state){
  return{
    details: state.order.details,
    price: state.order.price,
    amount: state.order.amount,
    status: state.order.status
  }
}

function mapDispatchToProps(dispatch){
  return{
    getDetails: id => dispatch(getDetails(id)),
    getStatus: id=> dispatch(getStatus(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail)
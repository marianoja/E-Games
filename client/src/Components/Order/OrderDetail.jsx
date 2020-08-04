import React from 'react'
import Detail from './Detail'
import {connect} from 'react-redux';
import {getDetails} from '../../store/actions/Order'


export class OrderDetail extends React.Component {
  componentDidMount(){
    this.props.getDetails(this.props.match.params.orderId);
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
              <th>Options</th>
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
    amount: state.order.amount
  }
}

function mapDispatchToProps(dispatch){
  return{
    getDetails: id => dispatch(getDetails(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail)
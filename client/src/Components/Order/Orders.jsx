import React from 'react'
import Order from './Order'
import {connect} from 'react-redux';
import {getOrders} from '../../store/actions/Order'

export class Orders extends React.Component {

  componentDidMount(){
    this.props.getOrders(1);
  }
  
  render(){
  return (
    <div className="container">

      <div className="row">

        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <a className="nav-link disable" href="">Carrito de Compras</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="">Pedidos realizados</a>
          </li>
        </ul>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(o=>{
              const creat = o.createdAt.substr(0,10)
              return <Order id={o.id} status={o.status} created={creat}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}}

function mapStateToProps(state){
  return{
    orders: state.order.orders
  }
}

function mapDispatchToProps(dispatch){
  return{
    getOrders: id=>dispatch(getOrders(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
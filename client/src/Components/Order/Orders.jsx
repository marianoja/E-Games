import React from 'react'
import Order from './Order'
import {connect} from 'react-redux';
import {getOrders} from '../../store/actions/Order'
import './styles/orders.css'


export class Orders extends React.Component {

  constructor(){
    super();
    this.state={
      option:"All"
    }
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.user)
    this.props.getOrders(user.userId);
  }

  changeOption=(e)=>{
    console.log(e.target)
    this.setState({
      option: e.target.innerText
    })
  }
  
  
  render(){
  return (
    <div style={{marginTop:"50px"}}className="container">

      <div className="row">

        <ul className="nav nav-pills mb-4">
          <li>
          <div class="dropdown" id="filter">
                  <button style={{backgroundColor:"green"}} class="dropbtn" for="btnControl"><i class="fa fa-fw fa-filter"></i></button>
                  <div  class="dropdown-content" style={{backgroundColor:"#007d8a"}}>
                    <a onClick={this.changeOption} style={{color:"white"}} href="#">All</a>
                    <a onClick={this.changeOption} style={{color:"white"}} href="#">inprocess</a>
                    <a onClick={this.changeOption} style={{color:"white"}} href="#">cancelled</a>
                    <a onClick={this.changeOption} style={{color:"white"}} href="#">completed</a>
                  </div>
                </div>
          </li>
        </ul>
        <table id="table" className="table">
          <thead className="thead">
            <tr style={{height:"50px",backgroundColor:"#0b0122", alignContent:"center"}} className="table">
              <th style={{color:"white",fontWeight:"bold",fontSize:"18px"}}>#</th>
              <th style={{color:"white",fontWeight:"bold",fontSize:"18px"}}>Status</th>
              <th style={{color:"white",fontWeight:"bold",fontSize:"18px"}}>Date</th>
              <th style={{color:"white",fontWeight:"bold",fontSize:"18px"}}>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(o=>{
              const creat = o.createdAt.substr(0,10)
             if(this.state.option === "All") return <Order id={o.id} status={o.status} created={creat}/>
             else{
               if(o.status === this.state.option) return <Order id={o.id} status={o.status} created={creat}/>
             }
            })}
            <tr style={{height:"80px"}}><th></th><th></th><th></th><th></th></tr>
            <tr style={{height:"80px"}}><th></th><th></th><th></th><th></th></tr>
            <tr style={{height:"80px"}}><th></th><th></th><th></th><th></th></tr>
            <tr style={{height:"80px"}}><th></th><th></th><th></th><th></th></tr>
            <tr style={{height:"80px"}}><th></th><th></th><th></th><th></th></tr>
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
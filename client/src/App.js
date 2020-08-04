import React, { useState, useEffect } from 'react';
import './App.css';
import {Route, Router, BrowserRouter,} from 'react-router-dom';
import Catalog from './Components/Catalog/Catalog';
import Navbar from './Components/Bars/NavBar';
import Search from './Components/Search/Search';
import CRUD from './Components/Crud_Product/CRUD'
import ProductTemp from './Components/Product/ProductTemp'
import Categories from './Components/Crud_categories/Categories'
import CategoryNew from './Components/Crud_categories/CategoryNew'
import SignUp from './Components/Auth/SignUp'
import Administrator from './Components/Admin/Admin'
import Orders from './Components/Order/Orders';
import OrderDetail from './Components/Order/OrderDetail';
import Login from './Components/Auth/Login';




export default function App(){

    return(
      <BrowserRouter>
      <div className="App">
        <Route path="/" component = {Navbar} />
        <Route path='/' render={()=><div><h1>E-commerce</h1></div>}/> 
        <Route path='/catalog' component={(props)=><Catalog {...props}/>}/>        
        <Route path={"/category/:categoryId"} component={(props)=> <Catalog {...props}/>}/>
        <Route exact path={"/crud-product/"} component={(props)=> <CRUD {...props}/>}/>
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/categories/new" component={CategoryNew} />
        <Route exact path={"/product/:productId"} component={(props)=> <ProductTemp {...props} />}/>
        <Route path="/search" component={(props)=> <Search {...props}/> } />
        <Route path="/admin" component={Administrator} />
        <Route exact path="/signup" component={(props)=> <SignUp {...props}/> } />
        <Route exact path="/login" component={(props)=> <Login {...props} />} />
        <Route exact path="/orders" component={Orders}/>
        <Route exact path="/orders/:orderId" component={(props) => <OrderDetail {...props} />} />
      </div>
      </BrowserRouter>
     
    )
      }
  
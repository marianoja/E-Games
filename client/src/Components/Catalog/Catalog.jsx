import React from 'react';
import Product from '../Product/Product';
import './styles/catalog.css';
import LeftBar from '../Bars/LeftBar';
import axios from 'axios';
import '../Bars/styles/leftbar.css';


export default class Catalog extends React.Component{
    constructor(){
        super();
    }
    state={
        products : [],
        category : "All",
    }

    change=(name)=>{
        this.setState({
            category: name
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3002/catalogue/')
          .then(res => {
            if(!this.props.match.params.categoryId){
            console.log(res);
            const products = res.data;
            this.setState({ products });}
            else{
            const products = res.data.filter(p=>p.category === this.props.match.params.categoryId);
            this.setState({products})
            }
          }).catch(function(error){
            console.log(error);
          })
      }
    
    render(){
        return (
            <div style={{minHeight:"200%",marginTop:"40px"}}  className="catalog">
            <div style={{paddingTop:"0px", minHeight:"1000px"}} class = "row">
            <div style={{background:"rgba(0, 0, 0, 0.78)", minHeight:"100%"}} id="leftbar" className="col-lg-2">
            <LeftBar change={this.change}/>
            </div>
            <div class = "col-lg-10">
            <div className="container">
            <div className="row row-cols-4">
            {catalog(this.state,this.state.category,this)}
            </div>
            </div>
            </div>
            </div>
            </div>
        )                     ;
    }
}


function catalog(state,cat) {
    if(cat!=="All"){
        return(
        state.products.map(function(p){
            for(let i=0;i<p.categories.length;i++){
                if(cat===p.categories[i].name){ 
                    i=p.categories.length;
                    return product(p);
                }
            }
        }))
    }
    else {
        return(
        state.products.map(function(p){
            return product(p)}
        ))
    }
}

function product(p) {
    return <div id="product" className="col-sm-4"><Product 
    product = {p}
    id={p.id}
    name={p.name}
    categories = {p.categories}
    description = {p.description}
    image = {p.image}
    stock = {p.stock}
    price = {p.price}  
    /> </div>
}
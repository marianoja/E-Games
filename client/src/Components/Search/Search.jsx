import React from 'react';
import axios from 'axios';
import Product from '../Product/Product';


export default class Search extends React.Component{

    constructor(){
        super();
        this.state={
            products:[],
            oldSearch:"",
        }
    }
    
    componentDidMount(){
        
        axios.get(`http://localhost:3002/search${this.props.location.search}`)
        .then(p=>{
            this.setState({
                products: p.data,
                oldSearch: this.props.location.search
            })
        })
    }

    componentDidUpdate(){
        if(this.props.location.search !== this.state.oldSearch){
        axios.get(`http://localhost:3002/search${this.props.location.search}`)
        .then(p=>{
            this.setState({
                products: p.data,
                oldSearch: this.props.location.search
            })
        })  
    }}



    render(){
        console.log(this.props.location.search);
        return(

            <div className="container">
            <div className="row row-cols-4">
            {this.state.products.map(function(p){
                return <div className="col-sm-3"><Product 
                id={p.id}
                name={p.name}
                category = {p.category}
                description = {p.description}
                image = {p.image}
                stock = {p.stock}
                price = {p.price}  
                /> </div>
            })}
            </div>
            </div>
        )

    }
}
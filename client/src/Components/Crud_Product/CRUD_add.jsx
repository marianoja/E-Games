import React from 'react';
import './styles/crudadd.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class CRUD_add extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            image:"",
            description:"",
            price: 0,
            category: [],
            stock : 0,
            categoriesSelect : [],
        }
  
    }
    
    setName= (e)=>{
        this.setState({
            ...this.state,
            name: e.target.value
        })
    }

    componentDidMount(){
        axios.get('http://localhost:3002/categories/')
        .then(c=>{
            this.setState({
                category: c.data,
            })
        })
    }

    setImage= (e)=>{
        this.setState({
            ...this.state,
            image: e.target.value
        })
    }
    setDescription= (e)=>{
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }
    setPrice= (e)=>{
        this.setState({
            ...this.state,
            price: e.target.value
        })
    }
    setCategory= (e)=>{
        this.setState({
            ...this.state,
            category: e.target.value,
        })
    }
    setStock= (e)=>{
        this.setState({
            ...this.state,
            stock: e.target.value
        })
    }

    categorySelected = e=>{
        this.setState({
            ...this.state,
            categoriesSelect: []
        })
        this.setState({categoriesSelect: [...e.target.selectedOptions].map(o => o.value)}); 
    }

    submit= function(e){
        e.preventDefault();
        axios({
            method:'post',
            url: 'http://localhost:3002/product/add',
            headers:{},
            data:{
                name : this.state.name,
                image: this.state.image,
                description : this.state.description,
                price : this.state.price,
                stock : this.state.stock,
                categories : this.state.categoriesSelect
            }
        }).then(e=>{
            window.alert("Se agrego el producto " + this.state.name + " correctamente");
            window.location.reload();
        } )
        .catch(error=>console.log(error));
          
    }


    render(){
        return(
        <div className="crud">
        <form onSubmit={this.submit.bind(this)} className="form" role="form" autoComplete="off">
	        <div className="form-group row">
		<label className="col-lg-3 col-form-label form-control-label">Name</label>
		<div className="col-lg-9">
			<input className="form-control" type="text" value={this.state.name} onChange={this.setName} required />
		</div>
	</div>
	<div className="form-group row">
		<label className="col-lg-3 col-form-label form-control-label">Description</label>
		<div className="col-lg-9">
			<input className="form-control" type="text" value={this.state.description} onChange={this.setDescription} required/>
		</div>
	</div>
	<div className="form-group row">
		<label className="col-lg-3 col-form-label form-control-label">Image</label>
		<div className="col-lg-9">
             <input type="text" className="form-control-file" id="exampleFormControlFile1" value={this.state.image} onChange={this.setImage} required/>
		</div>
	</div>
	<div className="form-group row">
		<label className="col-lg-3 col-form-label form-control-label">Price</label>
		<div className="col-lg-9">
			<input className="form-control" type="text" value={this.state.price} onChange={this.setPrice} required/>
		</div>
	</div>
	<div className="form-group row">
		<label className="col-lg-3 col-form-label form-control-label">Categories</label>
		<div className="col-lg-9">
        <select onChange={this.categorySelected} className="custom-select mr-sm-2" id="inlineFormCustomSelect" multiple>
        {this.state.category.map(c=>{
            return <option value={c.id}>{c.name}</option>         
        })}
        </select>
		</div>
	</div>
	<div className="form-group row">
		<label className="col-lg-3 col-form-label form-control-label">Stock</label>
		<div className="col-lg-9">
			<input className="form-control" type="text" value={this.state.stock} onChange={this.setStock} required/>
		</div>
	</div>
	<div className="form-group row">
		<div className="col-lg-12 text-center">
			<input type="submit" className="btn btn-primary" value="Add"  />
            <button onClick={()=>this.props.pro.setState({selected:""})} id="cancel" to='/Products' className="btn btn-secondary">Cancel</button>
		</div>
        
	</div>
</form>
        </div>
        )}

}
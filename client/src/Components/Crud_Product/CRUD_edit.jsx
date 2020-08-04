import React from 'react';
import axios from 'axios';
import './styles/crud_edit.css';

export default class CRUD_edit extends React.Component{
    constructor(){
        super();
        this.state={
            product:"",
            name:"",
            image:"",
            description:"",
            price: 0,
            category: "",
            stock : 0,
            categories:[],
            categoriselected:[],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3002/product/'+this.props.id)
        .then(p=>this.setState({
            id: p.data.id,
            name:p.data.name,
            image:p.data.image,
            description:p.data.description,
            price: p.data.price,
            category: p.data.category,
            stock : p.data.stock,
            product: p.data,
            
        }))

        axios.get('http://localhost:3002/categories/')
        .then(c=>{
            this.setState({
                categories: c.data,
            })
        })
    }



    setName= (e)=>{
        this.setState({
            ...this.state,
            name: e.target.value
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
            category: e.target.value
        })
    }
    setStock= (e)=>{
        this.setState({
            ...this.state,
            stock: e.target.value
        })
    }

    submit= function(e){
        e.preventDefault();
        axios({
            method:'PUT',
            url: 'http://localhost:3002/product/'+ this.props.id,
            headers:{},
            data:{
                name : this.state.name,
                image: this.state.image,
                description : this.state.description,
                price : this.state.price,
                stock : this.state.stock,
                categories : this.state.categoriselected
            }
        }).then(e=>{
            window.alert("Se actualizó el producto " + this.state.name + " correctamente");
            window.location.reload();
        } )
          .catch(error=>alert("Se produjo un error " + error));
        
        }

        categorySelected = e=>{
            this.setState({
                ...this.state,
                categoriselected : []
            })
            this.setState({
                ...this.state,
                categoriselected : [...e.target.selectedOptions].map(o => o.value)
            })
        }
    

    render(){
        return(
            <div className="crud">
            <form onSubmit={this.submit.bind(this)} className="form" role="form" autocomplete="off">
                <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">Name</label>
            <div className="col-lg-9">
                <input className="form-control" type="text" value={this.state.product.name} required/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label">Description</label>
            <div className="col-lg-9">
                <input className="form-control" type="text" value={this.state.product.description} required/>
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
        {this.state.categories.map(c=>{
            return <option value={c.name}>{c.name}</option>         
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
                <input type="submit" className="btn btn-primary" value="Update"  />
                <button onClick={()=>this.props.prop.setState({selected:""})} id="cancel" className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    </form>
            </div>
        )
    }
}
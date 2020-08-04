import React from 'react';
import './styles/crud_product.css';
import axios from 'axios'
import CRUD_add from './CRUD_add';
import CRUD_edit from './CRUD_edit';


export default class CRUD extends React.Component{
    constructor(){
        super();
        this.state={
            products:[],
            id:"",
            selected:""
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3002/catalogue/')
        .then(p=>
            this.setState({
            products : p.data
        }))
    }

    deleteSelected= id=>{
        if(this.state.selected !== "delete"){
        this.setState({
            selected: "delete",
            id: id
        })
        axios.delete('http://localhost:3002/product/'+ id)
        .then(p=>{alert("Se ha borrado el producto correctamente" );
                  window.location.reload();
    } )
          .catch(error=>alert("Se produjo un error " + error));
    }
      }
    

    editSelected= (id)=>{
        if(this.state.selected !== "edit"){
        this.setState({
            id: id,
            selected: "edit",
        })
      }
    }

    addSelected = (e)=>{
        this.setState({
            selected: "add"
        })
    }


    render(){
    const selected = this.state.selected;
    return(
      <div>
        {setCrud(selected,this)}
      </div>
    )

    
}} 

//RENDERIZADO CONDICIONAL

export function crud(blockadd,blockedit,cr){

  return <div className="delete">
<div className="container">
      <h2>Products</h2>
      <div className="row mt-4">
      <button disabled={blockadd || false} id="agregar" type="submit" onClick={cr.addSelected} name="agregar" className="btn btn-primary">Add Product</button>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>id</th>
              <th>Name</th>
              <th className="options">Options</th>
            </tr>
          </thead>
          <tbody>
          {cr.state.products.map(p=>{
          return(
          <tr>
              <th scope="row">{p.id}</th>
              <td value={p.id}>{p.name}</td>
            <td>
            <div className="d-flex flex-row">
            <button disabled={blockedit || false} id="edit" type="submit" onClick={cr.editSelected.bind(this,p.id)} name="edit" className="btn btn-success">Edit</button>
            <button onClick={cr.deleteSelected.bind(this,p.id)} name="delete" className="btn btn-danger">Delete</button>
        </div>
      </td>
    </tr>
          )})}
          </tbody>
        </table>
      </div>
    </div>
        </div>;}

export function setCrud(props,cr) {

  if (props === "delete" || props==="") {
      return crud(false,false,cr);
  }
  else if(props==="add"){
  return(
      <div>
      {crud(true,false,cr)}
      <h2>Add Product</h2>
      <CRUD_add pro={cr}/>
      </div>
  )
  }
  else{
    return(
    <div>
      {crud(false,true,cr)}
      <h2>{`Edit Product ${cr.state.id}`}</h2>
      <CRUD_edit prop={cr} id={cr.state.id} />
    </div>
    )
  }
}
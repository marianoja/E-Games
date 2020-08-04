import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';
// import clienteAxios from '../../config/axios';


function CategoryNew() {
  
  

  const [category, setCategory] = useState({
    // name: ''
  });

  // leer los datos del formulario
  const leerInformacionCategoria = e => {
    setCategory({
      // obtener una copia del state y agregar el nuevo
      ...category,
      [e.target.name]: e.target.value
    })
  }

  // almacena nueva categoía en la base de datos.
  const agregarCategoria = async e => {
    e.preventDefault();

    // enviar peticion
   

   /* fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(category), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => updateCategory(response.newCategory))*/

    // redireccionar
   // history.push('/categories')

   axios({
    method:'post',
    url: 'http://localhost:3002/categories/add',
    headers:{},
    data:{
      name: category.name
    }
}).then(e=>{
    alert("Se creo la categoria correctamente");
    window.history.back();
} )
  .catch(error=>console.log(error) && alert("Se produjo un error " + error)); 

    
  }






  return (
    <div className="container">
      <h2>Nueva Categoría</h2>
      <form
        onSubmit={agregarCategoria}
      >
        <div className="row justify-content-center my-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-md-4 col-form-label text-md-right">Nombre</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Nombre Categoría"
                      onChange={leerInformacionCategoria}
                    />
                  </div>
                </div>
                <div className="form-group row mb-0">
                  <div className="col-md-6 offset-md-4">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Guardar"
                    />
                    <Link to='/categories' className="btn btn-secondary">Cancelar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default withRouter(CategoryNew) 

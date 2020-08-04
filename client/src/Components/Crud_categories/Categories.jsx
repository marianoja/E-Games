import React,{useState , useEffect}from 'react'
import { Link } from 'react-router-dom'
import Category from './Category'
import axios from 'axios';

function Categories() {

  const [categories, setCategories] = useState([]);


  useEffect(()=>{
      
    const cat = ()=>axios.get('http://localhost:3002/categories/')
  .then(c =>{
    setCategories(c.data)
  })
    cat();
},[]);
  // elimina categoria
  
  const eliminarCategoria = name => {
    const url = `http://localhost:3002/categories/`



    if (window.confirm('¿Estás seguro ?')) {
      // // eliminar en la rest api
      // clienteAxios.delete(`/category/${id}`)
      //   .then(res => {
      //     if (res.status === 200) {
      //       alert('Eliminada')
      //     }
      //   })
      fetch(url + name, {
        method: 'DELETE',
      })
        .then(res => res.text()) // or res.json()
        .then(res => { window.location.reload() })
    }
  }



  return (
    <div className="container">
      <h2>Categorías</h2>
      <div className="row mt-4">
        <Link to='/categories/new' type="button" className="btn btn-success my-4">Nueva Categoría</Link>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <Category
                key={category.id}
                name={category.name}
                id={category.id}
                eliminarCategoria={eliminarCategoria}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categories

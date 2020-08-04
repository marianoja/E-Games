import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'

function CategoryEdit(props) {

  // obtener el ID
  // const { id } = props.match.params;
  const { id } = useParams();

  const [category, setCategory] = useState({
    name: ''
  });

  // cuando el componente carga
  useEffect(() => {
    // consultar la api para traer categoria a editar
    const consultarAPI = async () => {
      const categoriaConsulta = await clienteAxios.get(`/category/${id}`);
      console.log("consultarAPI -> categoriaConsulta", categoriaConsulta)

      setCategory(categoriaConsulta.data.category);
    }

    consultarAPI();
  }, [])

  // edita categoría en la base de datos.
  const editarCategoria = async e => {
    e.preventDefault();

    // crear un formdata
    const formData = new FormData();
    formData.append('name', category.name);


    // almacenarlo en la BD
    try {
      const res = await clienteAxios.put(`/category/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Lanzar una alerta
      if (res.status === 200) {
        alert('Agregado Correctamente')
      }

      // redireccionar
      props.history.push('/categories');

    } catch (error) {
      console.log(error);
      // lanzar alerta
      alert('Hubo un error')
    }
  }

  // leer los datos del formulario
  const leerInformacionCategoria = e => {
    setCategory({
      // obtener una copia del state y agregar el nuevo
      ...category,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container">
      <h2>Editar Categoría</h2>
      <form
        onSubmit={editarCategoria}
      >
        <div className="row justify-content-center my-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="form-group row">
                  <label for="nombre" className="col-md-4 col-form-label text-md-right">Nombre</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={leerInformacionCategoria}
                      defaultValue={category.name}
                    />
                  </div>
                </div>
                <div className="form-group row mb-0">
                  <div className="col-md-6 offset-md-4">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Guardar cambios"
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

export default CategoryEdit

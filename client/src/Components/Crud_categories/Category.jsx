import React from 'react'
import { Link } from 'react-router-dom'

function Category({ name, id, eliminarCategoria }) {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>
        <div className="d-flex flex-row">
          <Link to={`/categories/edit/${name}`} className="btn btn-success">
            <i className="fa fa-edit"></i>
          </Link>
          <button
            type='button'
            className="btn btn-danger"
            onClick={() => eliminarCategoria(name)}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Category

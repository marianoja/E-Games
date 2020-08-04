import React from 'react'

function Order(order) {
  return (
    <tr>
      <th>{order.id}</th>
      <th>{order.status}</th>
      <th>{order.created}</th>
      <th>
        <a href={`/orders/${order.id}`} className="btn btn-primary">
          <i className="fa fa-eye"></i>
        </a>
      </th>
    </tr>
  )
}

export default Order
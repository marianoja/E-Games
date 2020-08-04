import React from 'react'

function Detail(orderDetail) {
  return (
    <tr>
      <th><img style={{maxWidth: 150}} src={orderDetail.image} /></th>
      <td> {orderDetail.name}</td>
      <td> {orderDetail.price}</td>
      <td> {orderDetail.amount}</td>
      <td> ${orderDetail.amount * orderDetail.price} </td>
    </tr>
  )
}

export default Detail
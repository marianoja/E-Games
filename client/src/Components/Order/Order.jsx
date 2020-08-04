import React from 'react'
import { connect } from 'react-redux'
import { deleteOrder } from '../../store/actions/Order'

export class Order extends React.Component {
  render() {
    return (
      <tr style={{height:"80px"}}>
        <th><p>{this.props.id}</p></th>
        {this.props.status==="cancelled" && <th><button type="button" class="btn btn-danger"><p>Cancelled</p></button></th>||
          this.props.status==="completed" && <th><button type="button" class="btn btn-success"><p>Completed</p></button></th>||
          this.props.status==="inprocess" && <th><button type="button" class="btn btn-secondary"><p>In Process</p></button></th>
        }
        <th><p>{this.props.created}</p></th>
        <th>
          <a href={`/orders/${this.props.id}`} id="vieworder" className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </a>
          {(this.props.status !== "cancelled" && this.props.status !== "completed") &&
            <button onClick={() => this.props.delete(this.props.id)} id="cancel" className="btn btn-danger">
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          }
        </th>
      </tr>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    delete: id => dispatch(deleteOrder(id))
  }
}



export default connect(null, mapDispatchToProps)(Order)
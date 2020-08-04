import React from 'react';
import axios from 'axios';

export default class LeftBar extends React.Component{
    constructor(){
        super();
        this.state={
            categories:[]
        }
    }

    clickCategory = (e)=>{
        this.props.change(e.target.text);
        
    }

    componentDidMount(){
        axios.get('http://localhost:3002/categories')
        .then(c=>{
            this.setState({
                categories: c.data
            })
        })
    }

    render(){
        return(
            <div className="row">
            <div className="col-12">
            <h4>Categories</h4>
            </div>
            <div className="col-12">
              <div className="list-group" id="list-tab" role="tablist">
              <a onClick={this.clickCategory.bind(this)} className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="all">All</a>
                {this.state.categories.map(c=>{
                    return <a onClick={this.clickCategory.bind(this)} className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls={c.name}>{c.name}</a>
                })}
              </div>
            </div>
          </div>

        )
    }
}
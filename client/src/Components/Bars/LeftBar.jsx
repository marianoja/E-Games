import React from 'react';
import axios from 'axios';
import './styles/leftbar.css'


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
            <div id="leftbar" className="row">
            <div style={{marginBottom:"50px"}} className="col-12">
            <h4 style={{color:"azure"}}><i class="fas fa-align-justify"></i>Categories</h4>
            <hr style={{color:"white"}}/>
            </div>
            <div className="col-12">
              <div className="list-group" id="list-tab" role="tablist">
              <a style={{width:"105%",fontWeight:"bolder"}} onClick={this.clickCategory.bind(this)} className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="all">All</a>
                {this.state.categories.map(c=>{
                    return <a style={{width:"105%", marginTop:"15px",fontWeight:"bold"}} onClick={this.clickCategory.bind(this)} className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls={c.name}>{c.name}</a>
                })}
              </div>
            </div>
          </div>

        )
    }
}
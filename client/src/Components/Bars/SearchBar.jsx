import React from 'react';
import {Link} from 'react-router-dom'
import './styles/searchBar.css';


export default class SearchBar extends React.Component{
    constructor(){
        super();
        this.state = {
            name:"",
        }
        this.change = this.change.bind(this);
    }

    change = function (e) {
        this.setState({name : e.target.value});
    }

    render(){
        return(
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Product..." aria-label="Search" value={this.state.name} onChange={this.change}/>
                <Link to={`/search?q=${this.state.name}`} ><button style={{fontWeight:"bold"}} className="btn btn-outline-light my-2 my-sm-0"><i class="fa fa-fw fa-search"></i>Search</button></Link>
            </form>
        )
    }
}
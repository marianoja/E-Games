import React from 'react';
import './style/home.css';
import Carousel from './Carousel';
import Products from './Products';

export default class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div style={{marginTop:"50px"}}>
            <Carousel />
            <Products />
            </div>
        )
    }

}
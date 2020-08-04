const sequelize = require('sequelize');
const conn = require('../db.js');

const OrderDetail = (sequelize, O) => {

    const orderDe = sequelize.define('OrderDetail', {
        id: {
            type: O.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: O.DECIMAL,
            allowNull: false
        },
        amount: {
            type: O.DECIMAL,
            allowNull: true,
            defaultValue: 1
        }


    });
    return orderDe;

};

module.exports = OrderDetail;
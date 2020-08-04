const sequelize = require('sequelize');
const conn = require('../db.js')

const Order = (sequelize, Or) => {

    const UniqueOrder = sequelize.define('order', {
        status: {
            type: Or.ENUM,
            values: ['inprocess', 'cancelled', 'completed']

        }

    })

    return UniqueOrder;

}

module.exports = Order;
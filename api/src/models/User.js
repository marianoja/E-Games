const sequelize = require('sequelize');
const conn = require('../db.js');
const Order = require('./Order');

const User = (sequelize, U) => {
    const Us = sequelize.define('User', {

        id: {
            type: U.INTEGER,
            allowNull: false,
            autoIncrement: true,
            validate: {
                notEmpty: true,

            },
            primaryKey: true,

        },
        firstName: {
            type: U.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        lastName: {
            type: U.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: U.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
            unique: {
                args: true,
                msg: 'Email address already in use!',
            },
        },
        rol: {
            type: U.ENUM,
            values: ['user', 'admin'],
            DefaultValue: 'user',
        },

        password: {
            type: U.STRING,
            allowNull: false
        }

    });
    return Us;
}

module.exports = User;
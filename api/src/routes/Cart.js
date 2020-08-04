'use strict'
const sequelize = require('sequelize');
const express = require('express');
const app = express();
const { Order } = require('../models/index.js');
const { Cart } = require('../models/index.js');

  app.post('/', (req, res) => {
      console.log('orderId ' + req.body.orderId)
      console.log('orderssssId ' + req.body.ordersId)
      console.log('Quantity ' + req.body.quantity)
    Cart.create({
        quantity: req.body.quantity,
        ordersId: req.body.ordersId,
      })
      .then(buy => res.status(201).send(buy))
      .catch(error => res.sendStatus(400));
  });
  
  app.get('/', (req, res) => {
    Cart.findAll({
        include: [{
          model: Order,
          as: 'orders'
        }]
      })
      .then(orders => res.status(200).send(orders))
      .catch(error => res.sendStatus(400));
  });
  
  app.get('/:id', (req, res) => {
      Cart.findByPk(req.params.id)
      .then(comprita => res.status(200).send(comprita))
      .catch(error => res.sendStatus(400))
  });
  
  app.delete('/:id', (req, res) => {
      Cart.findByPk(req.params.id)
      .then(item => {
        return item
          .destroy()
          .then(() => res.sendStatus(204))
          .catch(error => res.sendStatus(404))
      })
      .catch(error => res.sendStatus(400))   
  });

  app.patch('/:id', (req, res) => {
      console.log(req.body.quantity)
      console.log(req.body.orderId)
      console.log(req.params.id)
    Cart.findByPk(req.params.id)
      .then(item => {
        return item
          .update({
            quantity: req.body.quantity,
            orderId: req.body.orderId
          })
          .then(rotito => res.status(200).send(rotito))
          .catch(error => res.sendStatus(400))
      })
      .catch(error => res.sendStatus(400))
  });

module.exports = app;
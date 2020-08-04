const conn = require('../db.js');
const express = require('express');
const app = require('express').Router();
const {
  Order
} = require('../models/index.js');
const {
  User
} = require('../models/index.js');
const {
  Product
} = require('../models/index.js')
const {
  OrderDetail
} = require('../models/index.js');
const moment = require('moment');

/*
UNA VEZ QUE ESTE TODO FUNCIONANDO,
ELIMINAR COMENTARIOS INNECESARIOS
*/

//Retorna todas ordenes
app.get('/', (req, res) => {
  Order.findAll({
    include: [{
      model: User,
    }, ],
  }).then(orders => {
    res.json(orders);
  });
});

//Retorna una orden particular
app.get('/:id', (req, res) =>
  Order.findAll({
    where: {
      UserId: req.params.id,
    }
  }).then(order => res.json(order)),
);

app.get('/:id/details', (req, res) =>
  OrderDetail.findAll({
    where:{
      orderId: req.params.id
    }})
  .then(od=>{
    var orderDetail = [];
    var amount =0;
    var price = 0;
    od.map(o=>{
      Product.findByPk(o.productId)
      .then(p=>{
        amount= amount + parseInt(o.amount);
        price = price + p.price
        orderDetail.push({details:o, product:p})
      })
    })
    setTimeout(function(){
      res.json({orderDetail: orderDetail, price: price, amount: amount});
    },50)

  })
);

app.delete('/:id/details', (req, res) =>
  Order.destroy({
    where: {
      id: req.params.id,
    },
    include: [{
      model: Product
    }],
  }).then(order => res.sendStatus(200),
));

//Modificar una orden
app.put('/', (req, res) => {
  OrderDetail.findOne({
    where: {
      orderId: req.body.orderId,
      productId: req.body.productId,
    },
  }).then(orderdetail => {
    orderdetail
      .update({
        amount: Number(req.body.value),
        status: req.body.status
      })
      .then(orderdetail => res.json(orderdetail));
  });
});

app.post('/', (req, res) => {
  // busca si existe una orden con el userid y con status 'Uncreated'
  Order.findOne({
    where: { status: 'Uncreated', UserId: req.body.UserId },
  }).then(order => {
    //si no se cumple la condicion del where crea una nueva orden
    if (!order) {
      Order.create({
        status: 'Uncreated',
        address: 'adress',
        UserId: req.body.UserId,
      }).then(newOrder => {
        //le agrega una producto a la orden nueva
        req.body.productId.map(id=>{
          Product.findByPk(id).then(product => {
            OrderDetail.create({
              price: product.price,
              amount: 1,
              productId: product.id,
              orderId: newOrder.id,
            }).then(orderDetail => res.json(orderDetail));
          });
        })
      });
    } else {
      //si existe una orden uncreated y con el id del user
      // le agrega al order detail de esa orden el id el producto
      req.body.productId.map(id=>{
        Product.findByPk(id).then(product => {
          OrderDetail.findOne({
            where: { productId: product.id, orderId: order.id },
          }).then(orderdetail => {
            if (!orderdetail) {
              OrderDetail.create({
                price: product.price,
                productId: product.id,
                orderId: order.id,
              }).then(orderDetail => res.json(orderDetail));
            } else {
              orderdetail.update({ amount: Number(orderdetail.amount) + 1})
              .then(order=>{
                res.json(order);
              })
            }
          });
        });
      })

    }
  });
});


//Vaciar orden
//Retorna orden con sus item
//Editar cantidades de una orden
//Retorna TODAS las ordenes de los usuarios (logueados?)









// app.get('/', async (req, res) =>{

//     let order = await order.findAll();

//     res.json(order)
// });

// app.get('/:idOrder', async (req, res) => {
//     let order = await Order.findOne(
//       {
//         where:
//         {
//           id: req.params.id
//         }
//       })
//     res.send(order)
//   });

// //añadir orden  
//   app.post('/add', async (req, res) => {
//     let order = await Order.create(req.body);
//     res.json(order)

//   });

//   app.put('/:idOrder', async (req, res) => {
//     let order = await Order.update(req.body, {
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(order)
//   });
//   //eliminar orden
//   app.delete('/', async (req, res) =>{
//     await Order.destroy({
//         where : {
//             id: req.body.id
//         }
//     })
//     let order = await Order.findAll();
//     res.json(order)
//   });

module.exports = app;
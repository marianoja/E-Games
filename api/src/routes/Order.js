const conn = require("../db.js");
const express = require("express");
const app = require("express").Router();
const { Order } = require("../models/index.js");
const { User } = require("../models/index.js");
const { Product } = require("../models/index.js");
const { OrderDetail } = require("../models/index.js");
const moment = require("moment");

app.get("/", (req, res) => {
  Order.findAll({
    include: [
      {
        model: User,
      },
    ],
  }).then((orders) => {
    res.json(orders);
  });
});

app.get("/:id", (req, res) =>
  Order.findAll({
    where: {
      UserId: req.params.id,
    },
  }).then((order) => res.json(order))
);

app.get("/status/:id", (req, res) =>
  Order.findOne({
    where: {
      id: req.params.id,
    },
  }).then((order) => res.json(order.status))
);

app.get("/:id/details", (req, res) =>
  OrderDetail.findAll({
    where: {
      orderId: req.params.id,
    },
  }).then((od) => {
    let orderDetail = [];
    let amount = 0;
    let price = 0;
    od.map((o) => {
      Product.findByPk(o.productId).then((p) => {
        amount = amount + parseInt(o.amount);
        price = price + (p.price * parseInt(o.amount));
        orderDetail.push({
          details: o,
          product: p,
        });
      });
    });
    setTimeout(function () {
      res.json({
        orderDetail: orderDetail,
        price: price,
        amount: amount,
      });
    }, 50);
  })
);

app.get("/inprocess/:userId", (req, res) => {
  Order.findOne({
    include: [
      {
        model: Product,
        attributes: ["name", "id", "image"],
      },
    ],
    where: {
      status: "inprocess",
      userId: req.params.userId,
    },
  }).then((order) => res.json(order));
});

app.delete("/:id/details", (req, res) =>
  Order.destroy({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  }).then((order) => res.sendStatus(200))
);

app.put("/", (req, res) => {
  Order.findOne({
    where: {
      id: req.body.orderId,
    },
  }).then((order) => {
    order
      .update({
        status: req.body.status,
      })
      .then((orderdetail) => res.json(orderdetail));
  });
});

// app.put("/statusupdate", (req, res) => {
//   Order.findByPk(req.body.orderId).then((order) =>
//     order
//       .update({ status: req.body.status })
//       .then(() => {
//         return Order.findAll({
//           include: [
//             {
//               model: User,
//             },
//           ],
//         });
//       })
//       .then((orders) => {
//         res.json(orders);
//       })
//   );
// });

app.post("/", (req, res) => {
  Order.findOne({
    where: {
      status: "inprocess",
      UserId: req.body.UserId,
    },
  }).then((order) => {
    if (!order) {
      Order.create({
        status: "inprocess",
        address: "adress",
        UserId: req.body.UserId,
      }).then((newOrder) => {
        req.body.productId.map((id) => {
          Product.findByPk(id).then((product) => {
            OrderDetail.create({
              price: product.price,
              amount: 1,
              productId: product.id,
              orderId: newOrder.id,
            }).then((orderDetail) => res.json(orderDetail));
          });
        });
      });
    } else {
      req.body.productId.map((id) => {
        Product.findByPk(id).then((product) => {
          OrderDetail.findOne({
            where: {
              productId: product.id,
              orderId: order.id,
            },
          }).then((orderdetail) => {
            if (!orderdetail) {
              OrderDetail.create({
                price: product.price,
                productId: product.id,
                orderId: order.id,
              }).then((orderDetail) => res.json(orderDetail));
            } else {
              orderdetail
                .update({
                  amount: Number(orderdetail.amount) + 1,
                })
                .then((order) => {
                  res.json(order);
                });
            }
          });
        });
      });
    }
  });
});

module.exports = app;

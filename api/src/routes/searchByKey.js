const app = require('express').Router();
const {
  Product
} = require('../models/index.js');
const {
  Op
} = require("sequelize");

app.get('/', async (req, res) => {

  let product = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `${req.query.q}` + '%'
      }

    }
  })
  res.send(product)
});

module.exports = app;
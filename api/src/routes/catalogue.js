const app = require('express').Router();
const { Product, Categories } = require('../models/index.js');

app.get('/', (req, res) => {
  const category = req.body.category;
  let detect;
  if (category !== undefined) {
    detect = {
      include: [
        { model: Categories, where: { id: c } },
      ],
    };
  } else {
    detect = {
      include: [{ model: Categories }],
    };
  }
  Product.findAll(detect).then(products => {
    res.send(products);
  });
});

app.post('/add', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  let product = await Product.create(req.body)
    .then(p => {
      req.body.categories.map(c => {
        Categories.findAll({
            where: {
              id: c
            }
          }).then(c => {
            p.addCategory(c);
          })
          .catch(r => res.status(500));
      })
    })
    .then(product => {
      res.json(product);
    })
    .catch(r => {
      res.status(500).send(r)
    })
});

  module.exports = app;

  
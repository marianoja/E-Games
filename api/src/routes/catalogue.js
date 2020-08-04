const app = require('express').Router();
const { Product, Categories } = require('../models/index.js');


app.get('/', (req, res) => {
  const category = req.body.category;
  let find;

  if (category !== undefined) {
    find = {
      include: [
        { model: Categories, where: { id: c } },
      ],
    };
  } else {
    find = {
      include: [{ model: Categories }],
    };
  }
  Product.findAll(find).then(products => {
    res.send(products);
  });
});

app.post('/add', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  let product = await Product.create(req.body)
    .then(p => {
      req.body.categories.map(c => {
        Categories.findAll({
            where: {
              id: c
            }
          }).then(c => {
            // console.log(c);
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
      // console.log(r);
    })

});


  module.exports = app;

  
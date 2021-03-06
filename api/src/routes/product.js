const app = require('express').Router();
const {
  Product,
  Categories
} = require('../models/index.js');

app.get('/', (req, res) => {
  const category = req.body.category;
  let detect;
  if (category !== undefined) {
    detect = {
      include: [{
        model: Categories,
        where: {
          id: c
        }
      }, ],
    };
  } else {
    detect = {
      include: [{
        model: Categories
      }],
    };
  }
  Product.findAll(detect).then(products => {
    res.send(products);
  });
});

app.get('/:id', async (req, res) => {
  let product = await Product.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Categories
    }]
  })
  res.send(product)
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
          }).then(cat => {
            p.addCategory(cat);
          })
          .catch(error => res.status(500));
      })
    })
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.status(500).send(err)
    })
});

app.put('/:id', async (req, res) => {
  const product = Product.findOne({where:{name:req.body.name}})
  product.then(p=>{
    p.update(req.body)
    .then(newProduct=>{
      req.body.categories.map(c=>{
        Categories.findOne({where:{name:c}})
        .then(c=>{
          newProduct.addCategory(c)
        })
      })
    })
    .then(p=>{
      res.json(p)
    })
  })})
  /*let product = await Product.update(req.body, {
    where: {
      id: req.params.id
    },
    include: [{
      model: Categories
    }]
  })
  res.json(product)
});*/

app.delete('/:id', async (req, res) => {
  await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((deletedProduct) => {
      if (deletedProduct === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = app;
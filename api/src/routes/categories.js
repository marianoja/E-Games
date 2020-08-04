const app = require('express').Router();
const { Categories, Product } = require('../models/index.js'); 

app.get('/', async (req, res) => {
  let category = await Categories.findAll(); 
  res.json(category)
}); 

app.get('/:idCategoria', async (req, res) => {
  let category = await Categories.findOne(
    {
      where:
      {
        name: req.params.idCategoria
      }
    })
  res.send(category)
});

app.post('/add', async (req, res) => {
  let category = await Categories.create(req.body);
  res.json(category)
});

app.delete('/:idCategoria', async (req, res) => {
  let category = await Categories.destroy({
    where: {
      name: req.params.idCategoria
    }
  }).then((deletedProduct) => {
    if (deletedProduct === 1) {
      res.status(200).send({
        message: "Deleted successfully"
      });
    } else {
      res.sendStatus(404);
    }
  })
    .catch((error) => {
      res.status(500).send(error);
    });
})


module.exports = app;
const express = require('express');
const app = express.Router();
const { User } = require('../models/index.js');
const { Product } = require('../models/index.js');
const { Review } = require('../models/index.js');

app.get('/:id', (req, res) => {
  Review.findAll({
    where: {
      productId: req.params.id,
    },
    include:[{
      model: User
    }]
  }).then(reviews => {
    res.json(reviews);
  });
});

app.post('/:id', (req, res) => {
  let description = req.body.description;
  let star = req.body.star;
  let productId = req.params.id;
  let userId = req.body.UserId;
  Review.create({
      description: description,
      star: star,
    })
    .then(nRv => {
      nRv.setProduct(productId);
      nRv.setUser(userId);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err =>
      res.status(500).send(err));
});

app.put('/:id', (req, res) => {
  let id = req.params.id;
  Review.update(req.body, {
      where: {
        id: id,
      },
      returning: true,
    })
    .then(response => {
      let review = response[1][0];
      return review;
    })
    .then(review =>
      res.send(review))
    .catch(err =>
      res.send(err.message));
});

app.delete('/:id', (req, res) => {
  let id = req.params.id;
  Review.destroy({
      where: {
        id: id
      },
    })
    .then(ok => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.sendStatus(500)
    })
});

module.exports = app;
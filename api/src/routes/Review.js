const express = require('express');
const router = express.Router();
const {User} = require('../models/index.js');
const {Product} = require('../models/index.js');
const {Review} = require('../models/index.js');

router.get('/:id', (req, res) => {
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

router.post('/:id', (req, res) => {
  const description = req.body.description;
  const star = req.body.star;
  const productId = req.params.id;
  const userId = req.body.UserId;
  

  Review.create({
    description: description,
    star: star,
  })
    .then(newReview => {
      newReview.setProduct(productId);
      newReview.setUser(userId);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;

  Review.update(req.body, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then(response => {
      const review = response[1][0];
      return review;
    })
    .then(review => res.send(review))
    .catch(err => res.send(err.message));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Review.destroy({
    where: { id: id },
  })
    .then(deletedReview => {
      res.json(deletedReview);
    })
    .catch(res.send);
});

module.exports = router;
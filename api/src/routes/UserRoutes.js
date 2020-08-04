const express = require('express');
const app = express.Router();
const { User } = require('../models/index.js');
const { Orders } = require('../models/Order.js');
const passport = require('passport');

app.post('/add', async (req, res) => {
    let user = await User.create(req.body)
    .then(user=>res.json(user))
    .catch(error=>{
        res.status(500).send(error)});
});

app.get('/', async (req, res) => {
    let users = await User.findAll();
    res.json(users);
});

app.get('/:id', async (req, res) => {
    let users = await User.findByPk(req.params.id)
    res.json(users)
});

app.put('/:id', async (req, res) => {
    await User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.sendStatus(200);
});

app.get('/:id/orders', (req, res) => {
  let id = req.params.id;
  User.findByPk(id)
    .then(user => user.getOrders())
    .then(orders => res.json(orders));
});

app.delete('/:id', async (req, res) => {
    await User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((del) => {
            if (del === 1) {
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

 app.put('/changestatus', (req, res) => {
  User.findByPk(id).then(user =>
    user
      .update({ status: req.body.status })
      .then(() => {
        return User.findAll({
          include: [
            {
              id: id
            },
          ],
        });
      })
      .then(users => {
        res.json(users);
      }),
  );
});

module.exports = app;
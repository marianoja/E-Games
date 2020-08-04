const express = require('express');
const router = express.Router();
const { User } = require('../models/index.js');
const { Orders } = require('../models/Order.js');
const passport = require('passport');

router.post('/add', async (req, res) => {
    let user = await User.create(req.body)
    .then(user=>res.json(user))
    .catch(error=>{
        res.status(500).send(error)});
});

router.get('/', async (req, res) => {
    let users = await User.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    let users = await User.findByPk(req.params.id)
    console.log(req.body)
    res.json(users)
});

router.put('/:id', async (req, res) => {
    await User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
    await User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((userDeleted) => {
            if (userDeleted === 1) {
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
})

//LINEA DE ORDENES




//LINEA DE LOGIN Y LOGOUT

module.exports = router;
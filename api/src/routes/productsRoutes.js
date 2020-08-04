const express = require('express');
const app = express.Router();
const { categories } = require('./models/Categories');

app.get('/', (req , res) => {
    res.send(categories)
} )
module.exports = app;


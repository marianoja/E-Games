const { Router } = require('express');
// import all routers;
const authRouter = require('./auth.js');
const productRouter = require('./product.js');
const catalogueRouter = require('./catalogue.js');
const searchByKeyRouter = require('./searchByKey.js');
const categoriesRouter = require('./categories.js');
const UserRoutes = require('./UserRoutes.js');
const OrderRouter = require('./Order.js');
const ReviewRouter = require('./Review.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/catalogue', catalogueRouter);
router.use('/product', productRouter);
router.use('/search', searchByKeyRouter);
router.use('/categories', categoriesRouter);
router.use('/user', UserRoutes);
router.use('/order', OrderRouter);
router.use('/review', ReviewRouter);

// require('../DATABASE');

module.exports = router;
const fs = require('fs');
const path = require('path');
const db = require('../db.js');
const { userInfo } = require('os');

const basename = path.basename(__filename);
const models = {};

models.conn = db();

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = models.conn.import(path.join(__dirname, file));
    const name = file.split('.')[0];
    models[name] = model;
  });

const {
  Product,
  Categories,
  Order,
  OrderDetail,
  User,
  Review,
  Cart,
} = models;

Product.belongsToMany(Categories, {through: "products_categories"});
Categories.belongsToMany(Product,{through: "products_categories"});
User.hasMany(Order, { as: 'orders'})
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderDetail });
Product.belongsToMany(Order, {through: OrderDetail});
Product.hasMany(Review, { as: "reviews" });
User.hasMany(Review, { as: 'review' });
Review.belongsTo(Product, { as: 'product' });
Review.belongsTo(User);


module.exports = models;
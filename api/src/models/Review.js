const sequelize = require('sequelize');
const conn = require('../db.js');

const Review = (sequelize, R) => {

  const RV = sequelize.define('review', {
    description: {
      type: R.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    star: {
      type: R.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return RV;
}

module.exports = Review;
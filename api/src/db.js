const Sequelize = require('sequelize');
/* const { singularize } = require('sequelize/types/lib/utils'); */

function db() {
  return new Sequelize('postgres://postgres:manano@localhost:5432/development', {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  });
}

module.exports = db;

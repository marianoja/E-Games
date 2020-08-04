const sequelize = require("sequelize");
const conn = require("../db.js");
const Order = require("./Order");
const crypto = require("crypto");
const passport = require('passport');

const User = (sequelize, U) => {
  const Us = sequelize.define("User", {
    id: {
      type: U.INTEGER,
      allowNull: false,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },

    firstName: {
      type: U.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },

    lastName: {
      type: U.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: U.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },

    rol: {
      type: U.ENUM,
      values: ["user", "admin"],
      DefaultValue: "user",
    },

    password: {
      type: U.STRING,
      allowNull: false,
      set(value) {
        const rSalt = Us.randomSalt();
        this.setDataValue("salt", rSalt);
        this.setDataValue(
          "password",
          crypto.createHmac("sha512", this.salt).update(value).digest("hex")
        );
      },
    },
    salt: {
      type: U.STRING,
    },
  });

  Us.randomSalt = function () {
    return crypto.randomBytes(127).toString("hex");
  };

  Us.prototype.checkPassword = function (password) {
    return (
      crypto.createHmac("sha512", this.salt).update(password).digest("hex") === this.password);
  };
  return Us;
};

module.exports = User;

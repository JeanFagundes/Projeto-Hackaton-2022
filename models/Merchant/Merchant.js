const { DataTypes } = require("sequelize");

const db = require("../../db/conn");

const Merchant = db.define("Merchant", {
  cpfOuCnpj: {
    type: DataTypes.STRING,
    require: true,
  },
  razaoSocial: {
    type: DataTypes.STRING,
    require: true,
  },
  ramo: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  telefone: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = Merchant;

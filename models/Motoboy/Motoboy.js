const { DataTypes } = require("sequelize");

const db = require("../../db/conn");

const Motoboy = db.define("Motoboy", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  cpf: {
    type: DataTypes.STRING,
    require: true,
  },
  sexo: {
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
  celular: {
    type: DataTypes.STRING,
    require: false,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = Motoboy;

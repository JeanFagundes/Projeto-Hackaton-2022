const { DataTypes } = require("sequelize");
const db = require("../../db/conn");
const Motoboy = require("./Motoboy");

const MotoboyAddress = db.define("MotoboyAddress", {

  cep: {
    type: DataTypes.STRING,
    require: true,
  },
  address: {
    type: DataTypes.STRING,
    require: true,
  },
  number: {
    type: DataTypes.INTEGER,
    require: true,
  },
  complement: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
    require: true,
  },
  city: {
    type: DataTypes.STRING,
    require: true,
  },
});

MotoboyAddress.belongsTo(Motoboy, {
  foreignKey: {
    allowNull: false,
    require: true,
  },
});

module.exports = MotoboyAddress;

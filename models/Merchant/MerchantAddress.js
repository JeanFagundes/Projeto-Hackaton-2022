const { DataTypes } = require("sequelize");
const db = require("../../db/conn");
const Merchant = require("./Merchant");

const MerchantAddress = db.define("MerchantAddress", {

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

MerchantAddress.belongsTo(Merchant, {
  foreignKey: {
    allowNull: false,
    require: true,
  },
});

module.exports = MerchantAddress;

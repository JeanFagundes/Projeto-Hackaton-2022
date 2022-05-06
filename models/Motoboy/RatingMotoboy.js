const { DataTypes } = require("sequelize");
const db = require("../../db/conn");
const Motoboy = require("./Motoboy");

const RatingMotoboy = db.define("RatingMotoboy", {
  rating: {
    type: DataTypes.STRING,
    require: false,
    allowNull: true,
  },
  comments: {
    type: DataTypes.TEXT,
    require: false,
    allowNull: true,
  },
});

RatingMotoboy.belongsTo(Motoboy, {
  foreignKey: {
    allowNull: false,
    require: true,
  },
});

module.exports = RatingMotoboy;

const { DataTypes } = require("sequelize");
const db = require("../../db/conn");
const Motoboy = require("./Motoboy");

const DocumentRegistration = db.define("MotoboyDocuments", {

  photo: {
    type: DataTypes.BLOB,
    require: true,
  },
  photocnh: {
    type: DataTypes.BLOB,
    require: true,
  },
  motorcycledoc: {
    type: DataTypes.BLOB,
    require: true,
  },
});

DocumentRegistration.belongsTo(Motoboy, {
  foreignKey: {
    allowNull: false,
    require: true,
  },
});

module.exports = DocumentRegistration;

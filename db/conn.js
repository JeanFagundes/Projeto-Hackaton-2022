const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hackaton", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao Banco de Dados");
} catch (err) {
  console.log("Não foi possivel conectar ao Banco de Dados: ", err);
}

module.exports = sequelize;

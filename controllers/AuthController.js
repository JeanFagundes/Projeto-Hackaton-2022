const soma = require("../helpers/soma");

module.exports = class UserController {
  static async registerUser(req, res) {
    console.log("entrou");
    const resultado = soma;
    res.send({ resultado });
    return;
  }
};

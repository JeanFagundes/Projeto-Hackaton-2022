const soma = require("../helpers/soma");

module.exports = class UserController {
  static async registerUser(req, res) {
    const resultado = await soma(10, 20);
    res.send({ resultado });
    return;
  }
};

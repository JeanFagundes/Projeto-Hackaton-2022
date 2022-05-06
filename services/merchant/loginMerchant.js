const bcrypt = require("bcrypt");
const Merchant = require("../../models/Merchant/Merchant");

async function execute(req, res) {
  const {
    email,
    password,
  } = req.body;

  const merchant = await Merchant.findOne({ where: { email } });
  if (!merchant) {
    return res.json({ message: "usuario não encontrato" });
  }
  const passwordMatch = bcrypt.compareSync(password, merchant.password);
  if (!passwordMatch) {
    return res.json({ message: "Usuario ou senha invalido" });
  }
  return res.json({ message: "logado com sucesso" });
}

execute();

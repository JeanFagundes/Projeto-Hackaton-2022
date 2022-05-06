const bcrypt = require("bcrypt");
const validator = require("validator");
const Merchant = require("../../models/Merchant/Merchant");

async function execute(req, res) {
  const {
    cpfoucnpjs,
    razaoSocial,
    ramo,
    email,
    telefone,
    password,
    confirmPassword,
  } = req.body;

  const checkIfCPFouCNPJExists = await Merchant.findOne({
    where: {
      cpfoucnpjs,
    },
  });

  if (checkIfCPFouCNPJExists) {
    return res.status(422).json({
      message: "Ja existe uma conta com esse CPF/CNPJ",
    });
  }

  const checkIfEmailExists = await Merchant.findOne({
    where: {
      email,
    },
  });

  if (checkIfEmailExists) {
    return res.status(422).json({
      message: "Ja existe uma conta com esse Email",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      message: "Insira um email válido.",
    });
  }

  if (!validator.equals(password, confirmPassword)) {
    return res.status(422).json({
      message: "As senhas estão diferentes.",
    });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(422).json({
      message: "A senha não tem os requisitos estipulados pela empresa.",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const motoboy = {
    cpfoucnpjs,
    razaoSocial,
    ramo,
    email,
    telefone,
    password: hashedPassword,
  };

  try {
    await Merchant.create(motoboy);
    console.log("Empresa criada com sucesso");
    return res.status(201).json(motoboy);
  } catch (err) {
    return res.status(500).json({
      message: `Não foi possivel criar a empresa: ${err}`,
    });
  }
}

execute();

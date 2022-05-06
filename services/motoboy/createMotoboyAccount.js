const bcrypt = require("bcrypt");
const validator = require("validator");
const Motoboy = require("../../models/Motoboy/Motoboy");

// eslint-disable-next-line no-unused-vars
exports.createMotoboy = async function execute(req, res) {
  console.log("entrou");
  const {
    name,
    cpf,
    sexo,
    email,
    telefone,
    celular,
    password,
    confirmPassword,
  } = req.body;

  const checkIfCPFExists = await Motoboy.findOne({
    where: {
      cpf,
    },
  });

  if (checkIfCPFExists) {
    return res.status(422).json({
      message: "Ja existe uma conta com esse CPF",
    });
  }

  const checkIfEmailExists = await Motoboy.findOne({
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
    name,
    cpf,
    sexo,
    email,
    telefone,
    celular,
    password: hashedPassword,
  };

  try {
    await Motoboy.create(motoboy);
    console.log("usuario criado com sucesso");
    return res.status(201).json(motoboy);
  } catch (err) {
    return res.status(500).json({
      message: `Não foi possivel criar o usuario: ${err}`,
    });
  }
};

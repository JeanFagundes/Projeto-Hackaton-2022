const bcrypt = require("bcrypt");
const validator = require("validator");
const Merchant = require("../../models/Merchant/Merchant");

async function execute(req, res) {
  const { id } = req.params.id;
  const {
    name,
    telefone,
    email,
    password,
    confirmPassword,
  } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      message: "Insira um email válido.",
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
    telefone,
    email,
    password: hashedPassword,
  };

  try {
    const updateMotoboy = await Merchant.update({ motoboy }, {
      where: {
        id,
      },
    });
    return res.status(201).json(updateMotoboy);
  } catch (error) {
    return res.status(401).json({ message: `Não foi possivel atualizar os dados ${error}` });
  }
}

execute();

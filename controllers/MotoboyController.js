const bcrypt = require("bcrypt");
const validator = require("validator");
const validarCpf = require("cpf-cnpj-validator");
const Motoboy = require("../models/Motoboy/Motoboy");
const MotoboyAddress = require("../models/Motoboy/MotoboyAddress");
const RatingMotoboy = require("../models/Motoboy/RatingMotoboy");
// const DocumentRegistration = require("../models/Motoboy/DocumentRegistration");

module.exports = class UserController {
  static async createMotoboyAccount(req, res) {
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

    if (!validarCpf.cpf.isValid(cpf)) {
      return res.status(400).json({ message: "Insira um cpf valido" });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({
        message: "Insira um email válido.",
      });
    }
    if (telefone.length < 8 || undefined) {
      return res.status(400).json({
        message: "Insira um telefone valido",
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
      console.log("usuario criado com sucesso", motoboy);
      return res.json({ message: "Usuario adicionado com sucesso" });
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel criar o usuario: ${err}`,
      });
    }
  }

  static async createMotoboyAddress(req, res) {
    const motoboyId = req.params.id;
    const {
      cep,
      address,
      number,
      complement,
      state,
      city,
    } = req.body;

    const motoboyAddress = {
      cep,
      address,
      number,
      complement,
      state,
      city,
      MotoboyId: motoboyId,
    };

    try {
      await MotoboyAddress.create(motoboyAddress);
      console.log("Endereço criado com sucesso", motoboyAddress);
      return res.status(201).json(motoboyAddress);
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel criar o endereço do motoboy: ${err}`,
      });
    }
  }

  static async createMotoboyDocumentation(req, res) {
    const motoboyId = req.params.id;
    const {
      photo,
      photocnh,
      motorcycledoc,
    } = req.body;

    const motoboyDocuments = {
      photo,
      photocnh,
      motorcycledoc,
      MotoboyId: motoboyId,
    };

    try {
      // await DocumentRegistration.create(motoboyDocuments);
      console.log("Imagens adicionadas com sucesso");
      return res.status(201).json(motoboyDocuments);
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel adicionar as fotos do motoboy: ${err}`,
      });
    }
  }

  static async updateMotoboyAccount(req, res) {
    const motoboyId = req.params.id;
    const {
      oldPassword,
      password,
      confirmPassword,
    } = req.body;

    const motoboy = await Motoboy.findOne({
      where: {
        id: motoboyId,
      },
      raw: true,
    });

    if (!motoboy) {
      return res.status(400).json({ message: "Motoboy não encontrado" });
    }
    console.log(motoboy);

    console.log("Entrou", motoboy.password);
    const motopassword = motoboy.password;
    console.log(motopassword);

    const passwordMatch = bcrypt.compareSync(oldPassword, motopassword);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Senha atual incorreta" });
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

    console.log(motoboy, motoboyId);
    try {
      const updateMotoboy = await Motoboy.update({ password: hashedPassword }, {
        where: {
          id: motoboyId,
        },
      });
      return res.status(201).json(updateMotoboy);
    } catch (error) {
      return res.status(401).json({ message: `Não foi possivel atualizar os dados ${error}` });
    }
  }

  static async deleteMotoboy(req, res) {
    const motoboyId = req.params.id;

    const motoboy = await Motoboy.findOne({
      where: {
        id: motoboyId,
      },
    });

    if (!motoboy) {
      return res.status(400).json({
        message: "Não foi encontrado o motoboy na nossa base de dados",
      });
    }
    try {
      const deleteMotoboy = await Motoboy.destroy({
        where: {
          id: motoboyId,
        },
      });
      return res.status(201).json({ message: `O motoboy foi excluido de nossa base de dados ${deleteMotoboy}` });
    } catch (error) {
      return res.status(401).json({ message: `Não foi possivel excluir o usuario ${error}` });
    }
  }

  static async showMotoboys(req, res) {
    try {
      const motoboys = await Motoboy.findAll();
      return res.status(200).json(motoboys);
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel visualizar os motoboys: ${err}`,
      });
    }
  }

  static async ratingMotoboy(req, res) {
    const motoboyId = req.params.id;
    const {
      rating,
      comments,
    } = req.body;

    const motoboy = await Motoboy.findOne({
      where: {
        id: motoboyId,
      },
    });

    if (!motoboy) {
      return res.status(400).json({ message: "Usuario não encontrado" });
    }

    const ratingMotoboy = {
      rating,
      comments,
      MotoboyId: motoboyId,
    };

    try {
      await RatingMotoboy.create(ratingMotoboy);
      console.log("Avaliação adicionadas com sucesso");
      return res.status(201).json(ratingMotoboy);
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel adicionar as fotos do motoboy: ${err}`,
      });
    }
  }

  static async AllRatingMotoboy(req, res) {
    const motoboyId = req.params.id;

    // const motoboy = Motoboy.findOne({
    //   where: {
    //     id: motoboyId,
    //   },
    // });
    try {
      const allAvaliation = await RatingMotoboy.findAll({
        where: {
          MotoboyId: motoboyId,
        },
      });
      return res.status(200).json(allAvaliation);
    } catch (error) {
      return res.status(400).json({ message: "Não foi possivel localizar as avaliações" });
    }
  }
};

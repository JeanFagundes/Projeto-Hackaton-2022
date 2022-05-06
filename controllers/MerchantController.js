/* eslint-disable camelcase */
// const puppeteer = require("puppeteer");
const bcrypt = require("bcrypt");
const validator = require("validator");
const validarCpf = require("cpf-cnpj-validator");
const Merchant = require("../models/Merchant/Merchant");
const MerchantAddress = require("../models/Merchant/MerchantAddress");

module.exports = class UserController {
  static async createMerchantAccount(req, res) {
    const {
      cnpj,
      razaoSocial,
      ramo,
      email,
      telefone,
      password,
      confirmPassword,
    } = req.body;

    console.log("aqui", cnpj);

    const checkIfcpfoucnpjExists = await Merchant.findOne({
      where: {
        cpfOuCnpj: cnpj,
      },
    });

    if (checkIfcpfoucnpjExists) {
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

    if (!validarCpf.cnpj.isValid(cnpj)) {
      return res.status(400).json({ message: "Insira um cpf valido" });
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

    const merchant = {
      cpfOuCnpj: cnpj,
      razaoSocial,
      ramo,
      email,
      telefone,
      password: hashedPassword,
    };

    try {
      console.log(merchant);
      await Merchant.create(merchant);
      console.log("Empresa criada com sucesso");
      return res.status(201).json(merchant);
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel criar a empresa: ${err}`,
      });
    }
  }

  static async createMerchantAddress(req, res) {
    const merchantId = req.params.id;
    const {
      cep,
      address,
      number,
      complement,
      state,
      city,
    } = req.body;

    const merchantAddress = {
      cep,
      address,
      number,
      complement,
      state,
      city,
      MerchantId: merchantId,
    };

    try {
      await MerchantAddress.create(merchantAddress);
      console.log("Endereço criado com sucesso", merchantAddress);
      return res.status(201).json(merchantAddress);
    } catch (err) {
      return res.status(500).json({
        message: `Não foi possivel criar o endereço do motoboy: ${err}`,
      });
    }
  }

  static async updateMerchantAccount(req, res) {
    const merchantId = req.params.id;
    const {
      oldPassword,
      password,
      confirmPassword,
    } = req.body;

    const merchant = await Merchant.findOne({
      where: {
        id: merchantId,
      },
      raw: true,
    });

    if (!merchant) {
      return res.status(400).json({ message: "comerciante não encontrado" });
    }
    const motopassword = merchant.password;
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

    try {
      const updateMerchant = await Merchant.update({ password: hashedPassword }, {
        where: {
          id: merchantId,
        },
      });
      return res.status(201).json(updateMerchant);
    } catch (error) {
      return res.status(401).json({ message: `Não foi possivel atualizar os dados ${error}` });
    }
  }

  static async deleteMerchant(req, res) {
    const merchantId = req.params.id;

    const merchant = await Merchant.findOne({
      where: {
        id: merchantId,
      },
    });

    if (!merchant) {
      return res.status(400).json({
        message: "Não foi encontrado o comerciant na nossa base de dados",
      });
    }
    try {
      const deleteMerchant = await Merchant.destroy({
        where: {
          id: merchantId,
        },
      });
      return res.status(201).json({ message: `O comerciante foi excluido de nossa base de dados ${deleteMerchant}` });
    } catch (error) {
      return res.status(401).json({ message: `Não foi possivel excluir o usuario ${error}` });
    }
  }

  static async loginMerchant(req, res) {
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
};

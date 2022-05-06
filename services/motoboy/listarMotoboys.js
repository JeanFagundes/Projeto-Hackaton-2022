const Motoboy = require("../../models/Motoboy/Motoboy");

async function execute(req, res) {
  try {
    const motoboys = await Motoboy.findAll();
    console.log("usuario criado com sucesso");
    return res.status(200).json(motoboys);
  } catch (err) {
    return res.status(500).json({
      message: `Não foi possivel visualizar os motoboys: ${err}`,
    });
  }
}

execute();

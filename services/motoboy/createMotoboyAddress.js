const MotoboyAddress = require("../../models/Motoboy/MotoboyAddress");

async function execute(req, res) {
  const { motoboyId } = req.params;
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
    console.log("Endereço criado com sucesso");
    return res.status(201).json(motoboyAddress);
  } catch (err) {
    return res.status(500).json({
      message: `Não foi possivel criar o endereço do motoboy: ${err}`,
    });
  }
}
execute();

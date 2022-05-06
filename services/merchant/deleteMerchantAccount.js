const Merchant = require("../../models/Merchant/Merchant");

async function execute(req, res) {
  const { id } = req.params.id;

  try {
    const deleteMotoboy = await Merchant.destroy({
      where: {
        id,
      },
    });
    return res.status(201).json({ message: `O motoboy foi excluido de nossa base de dados ${deleteMotoboy}` });
  } catch (error) {
    return res.status(401).json({ message: `Não foi possivel excluir o usuario ${error}` });
  }
}

execute();

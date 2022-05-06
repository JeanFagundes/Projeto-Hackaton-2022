const Motoboy = require("../../models/Motoboy/Motoboy");

async function execute(req, res) {
  const { id } = req.params.id;

  try {
    const deleteMotoboy = await Motoboy.destroy({
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

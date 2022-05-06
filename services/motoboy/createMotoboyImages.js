const DocumentRegistration = require("../../models/Motoboy/DocumentRegistration");

async function execute(req, res) {
  const { motoboyId } = req.params;
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
    await DocumentRegistration.create(motoboyDocuments);
    console.log("Imagens adicionadas com sucesso");
    return res.status(201).json(motoboyDocuments);
  } catch (err) {
    return res.status(500).json({
      message: `Não foi possivel adicionar as fotos do motoboy: ${err}`,
    });
  }
}
execute();

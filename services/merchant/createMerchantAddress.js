const MerchantAddress = require("../../models/Merchant/MerchantAddress");

async function execute(req, res) {
  const { merchantId } = req.params;
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
    console.log("Endereço do estabelecimento criado com sucesso");
    return res.status(201).json(merchantAddress);
  } catch (err) {
    return res.status(500).json({
      message: `Não foi possivel criar o endereço do estabelecimento: ${err}`,
    });
  }
}
execute();

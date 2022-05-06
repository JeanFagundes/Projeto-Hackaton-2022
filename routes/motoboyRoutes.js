const express = require("express");
const motoboyController = require("../controllers/MotoboyController");
const merchantController = require("../controllers/MerchantController");

const router = express.Router();

// router.post("./register", AuthController.registerUser);
// rotas de motoboy
router.post("/register", motoboyController.createMotoboyAccount);
router.post("/registerAddress/:id", motoboyController.createMotoboyAddress);
router.post("/registerDocumentation/:id", motoboyController.createMotoboyDocumentation);
router.patch("/updateMotoboy/:id", motoboyController.updateMotoboyAccount);
router.delete("/deleteMotoboy/:id", motoboyController.deleteMotoboy);
router.get("/showMotoboys", motoboyController.showMotoboys);

// rotas de comerciante
router.post("/merchant/register", merchantController.createMerchantAccount);
router.post("/merchant/registerAddress/:id", merchantController.createMerchantAddress);
router.patch("/merchant/updateMerchant/:id", merchantController.updateMerchantAccount);
router.delete("/merchant/deleteMerchant/:id", merchantController.deleteMerchant);
router.post("/merchant/login", merchantController.loginMerchant);
module.exports = router;

const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

//router.post("./register", AuthController.registerUser);
router.get("/register", AuthController.registerUser);

module.exports = router;

const express = require("express");

const app = express();

const AuthController = require("./controllers/AuthController");
const authRoutes = require("./routes/authRoutes");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", authRoutes);

app.listen(3000);

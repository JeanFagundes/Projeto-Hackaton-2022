const express = require("express");

const app = express();

const conn = require('./db/conn')

//models de motoboy
const Motoboy = require('./models/Motoboy/Motoboy')
const MotoboyAddress = require("./models/Motoboy/MotoboyAddress")
const DocumentRegistration = require("./models/Motoboy/DocumentRegistration");

//models de comerciante
const Merchant = require('./models/Merchant/Merchant')

const MotoboyController = require("./controllers/MotoboyController");
const motoboyRoutes = require("./routes/motoboyRoutes");


app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", motoboyRoutes);

//conexao com banco de daods
conn
    //.sync({force : true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(error))
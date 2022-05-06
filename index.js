const express = require("express");
const exphbs = require("express-handlebars");

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

//template engine
app.engine('handlebars', exphbs.engine())
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//acessar css
app.use(express.static("public"));


app.use("/", motoboyRoutes);

//conexao com banco de daods
conn
    //.sync({force : true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(error))
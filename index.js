const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const Routes =  require("./routes/rutaWebhook");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/", Routes); 

app.listen(PORT, () => console.log(`servidor corriendo en el puerto ${PORT}`)); 
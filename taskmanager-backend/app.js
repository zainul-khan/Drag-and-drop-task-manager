require("dotenv").config();
const express = require("express");
const app = express();
require("./src/db/conn")();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT;
const router = require("./src/routes/index");
const path = require("path");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(router);
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(PORT, (err) => {
    if(err) console.log("error in listening", err);
    else console.log("Listening to port", PORT);
})
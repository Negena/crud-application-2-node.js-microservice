const express    = require('express');
const mongoose   = require('mongoose');
const ejs        = require('ejs');
const dotenv     = require('dotenv');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const path       = require("path");

const router     = require('./server/routes/router.js');
const connectDB  = require('./server/database/connection.js');


const app = express();

dotenv.config({path: 'config.env'});

connectDB();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/css", express.static(path.resolve(__dirname, "assests/css")));
app.use("/img", express.static(path.resolve(__dirname, "assests/img")));
app.use("/js", express.static(path.resolve(__dirname, "assests/js")));

app.set("view engine", "ejs");

app.use("/", router);


app.listen(3000, ()=> {
  console.log("port...");
});

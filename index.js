"use strict";
/**
 *@author Tilak
 *@since May 17, 2020
 */

const express = require("express");
const cors = require('cors')
const http = require("http");
const app = express();
const mongoose = require("mongoose");
let bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const congif = require("./lib/config");
const port = congif.server_port;

// mongo connection
mongoose.connect("mongodb://localhost:27017/emailCampaign", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

bodyParser = {
  json: { limit: "50mb", extended: true },
  urlencoded: { limit: "50mb", extended: true }
};

routes(app);
app.use(function (req, res, next) {
  res.status(404).send("Are you lost!??")
})

app.listen(port, function() {
  console.log("Server is listening on port " + port);
});

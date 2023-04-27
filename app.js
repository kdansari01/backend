const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("./mongo");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  next();
});

module.exports = app;

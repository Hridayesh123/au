"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var Routes_1 = require("./routes_container/Routes");
var app = express();
var port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routes_1.default);
app.use('/subject', Routes_1.default);
var server = app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
exports.default = server;

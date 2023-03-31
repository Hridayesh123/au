"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Routes_1 = require("./routes_container/Routes");
const app = express();
const key = "key";
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routes_1.default);
app.use('/subject', Routes_1.default);
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = server;
//# sourceMappingURL=App.js.map
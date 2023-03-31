"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dot = require("dotenv");
dot.config();
const client = new pg_1.Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '5432'),
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
client.connect();
exports.default = client;
//# sourceMappingURL=db_config.js.map
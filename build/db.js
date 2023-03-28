const { Client } = require("pg");
const dot = require("dotenv");
dot.config();
const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.PORT),
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
 
client.connect();

module.exports = client;

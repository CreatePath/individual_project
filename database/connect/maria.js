const maria = require('mysql');
require('dotenv').config('.env');

const dbconfig = {
    connectionLimit: 20,

    // localhost 사용시
    // host:'localhost',
    // user:'root',
    // password:'dltngus1',
    // database:'clubs'

    // heroku 사용시
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
}

var conn = maria.createPool(dbconfig);

module.exports = conn;
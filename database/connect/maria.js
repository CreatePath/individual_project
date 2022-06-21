const maria = require('mysql');

const dbconfig = {
    connectionLimit: 20,

    // localhost 사용시
    // host:'localhost',
    // user:'root',
    // password:'dltngus1',
    // database:'clubs',
    // dateStrings: true

    // heroku 사용시
    host: "us-cdbr-east-05.cleardb.net",
    user: "bc8f4f8b6e4f2f",
    password: "81241a6c",
    database: "heroku_3b004a7462fcefc",
    dateStrings: true
}

var conn = maria.createPool(dbconfig);

module.exports = conn;
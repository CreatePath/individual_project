const maria = require('mysql');

const conn = maria.createConnection({
    host:'localhost',
    user:'root',
    password:'dltngus1',
    database:'clubs',
    dateStrings: true
})

module.exports = conn;
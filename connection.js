let mssql = require("mssql")

let connection = new mssql.ConnectionPool(
    {
        server: "185.165.116.34",
        password: "HHH123456hhh",
        database: "hackathon",
        port: "1436",
        user: "hackathon",
    })
connection.connect(err => err ? console.log(err) : console.log("DB Connection Was Successful"))

module.exports.connection = connection
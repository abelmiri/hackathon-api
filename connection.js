let mssql = require("mssql")

let connection = new mssql.ConnectionPool(
    {
        user: "hackathon",
        password: "HHH123456hhh",
        server: "185.211.57.18\\Mssqlserver2016",
        // port: "1435",
        database: "hackathon",
    })
connection.connect(err => err ? console.log(err) : console.log("DB Connection Was Successful"))

module.exports.connection = connection
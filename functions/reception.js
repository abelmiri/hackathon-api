// let JDate = require("jalali-date")
let mssql = require("mssql")
let Connection = require("../connection")

////////////////////////////////////// MODULES_IMPORTS_ENDED


const select = ({response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from Reception`, (error, records) =>
    {
        if (error) response.send({state: -1, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_PRESCRIPTION", form: records.recordset})
        }
    })
}

module.exports =
    {
        select: select,
    }
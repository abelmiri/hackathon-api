let JDate = require("jalali-date")
let mssql = require("mssql")
let Connection = require("../connection")

////////////////////////////////////// MODULES_IMPORTS_ENDED

const select = ({response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from Bed`, (error, records) =>
    {
        if (error) response.send({state: -1, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_BED", form: records.recordset})
        }
    })
}

const insert = ({number, room, section, response}) =>
{
    let request = new mssql.Request(Connection.connection)

    let Jdate = new JDate()
    let dateObj = new Date()

    /** @namespace Jdate.date */
    let create_time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    let create_date = `${Jdate.date[0]}/${Jdate.date[1]}/${Jdate.date[2]}`

    request.query(`insert into Bed 
        (number, room, section, create_time, create_date) 
        output inserted.id
        values (N'${number}'
        ${room ? `, N'${room}'` : ",NULL"}
        ${section ? `, N'${section}'` : ",NULL"}
        ,N'${create_time}'
        ,N'${create_date}'
        )`, (error, records) =>
    {
        if (error) response.send({state: -2, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_CREATE_BED", form: records.recordset[0]})
        }
    })
}

module.exports =
    {
        select: select,
        insert: insert,
    }
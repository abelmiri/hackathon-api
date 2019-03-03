let JDate = require("jalali-date")
let mssql = require("mssql")
let Connection = require("../connection")

////////////////////////////////////// MODULES_IMPORTS_ENDED


const select = ({response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from Prescription`, (error, records) =>
    {
        if (error) response.send({state: -1, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_PRESCRIPTION", form: records.recordset})
        }
    })
}

const insert = ({personnel_id, reception_id, have_notification, is_done, interval, description, notification, response}) =>
{


    let request = new mssql.Request(Connection.connection)

    let Jdate = new JDate()
    let dateObj = new Date()

    /** @namespace Jdate.date */
    let create_time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    let create_date = `${Jdate.date[0]}/${Jdate.date[1]}/${Jdate.date[2]}`

    request.query(`insert into Prescription 
        (personnel_id, reception_id, have_notification, is_done, interval, description, notification, create_time, create_date) 
        output inserted.id
        values (N'${personnel_id}', N'${reception_id}', N'${have_notification}'
        ${is_done ? `, N'${is_done}'` : ",'0'"}
        ${interval ? `, N'${interval}'` : ",NULL"}
        ${description ? `, N'${description}'` : ",NULL"}
        ${notification ? `, N'${notification}'` : ",NULL"}
        ,N'${create_time}'
        ,N'${create_date}'
        )`, (error, records) =>
    {
        if (error) response.send({state: -2, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_CREATE_PRESCRIPTION", form: records.recordset[0]})
        }
    })
}

module.exports =
    {
        select: select,
        insert: insert,
    }
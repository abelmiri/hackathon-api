let JDate = require("jalali-date")
let mssql = require("mssql")
let Connection = require("../connection")

////////////////////////////////////// MODULES_IMPORTS_ENDED


const select = ({response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from NursePatients`, (error, records) =>
    {
        if (error) response.send({state: -1, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_NURSE_PATIENT", form: records.recordset})
        }
    })
}

const insert = ({personnel_id, reception_id, response}) =>
{
    let request = new mssql.Request(Connection.connection)

    let Jdate = new JDate()
    let dateObj = new Date()

    /** @namespace Jdate.date */
    let create_time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    let create_date = `${Jdate.date[0]}/${Jdate.date[1]}/${Jdate.date[2]}`

    request.query(`insert into NursePatients 
        (personnel_id, reception_id, create_time, create_date) 
        output inserted.id
        values (N'${personnel_id}', N'${reception_id}'
        ,N'${create_time}'
        ,N'${create_date}'
        )`, (error, records) =>
    {
        if (error) response.send({state: -2, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_CREATE_NURSE_PATIENT", form: records.recordset[0]})
        }
    })
}

const select_by_personnel_id = ({personnel_id, response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from NursePatients where personnel_id = N'${personnel_id}'`, (error0, records0) =>
    {
        if (error0) response.send({state: -2, log: "DATA_BASE_ERROR", form: error0})
        else
        {
            response.send({state: 1, log: "GET_NURSE_PATIENT_BY_PERSONNEL_ID", form: records0.recordset})
        }
    })
}

module.exports =
    {
        select: select,
        insert: insert,
        select_by_personnel_id: select_by_personnel_id,
    }
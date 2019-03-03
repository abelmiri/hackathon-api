let JDate = require("jalali-date")
let mssql = require("mssql")
let Connection = require("../connection")

////////////////////////////////////// MODULES_IMPORTS_ENDED


const select = ({response}) =>
{
    let request = new mssql.Request(Connection.connection)

    request.query(`select * from Patient`, (error, records) =>
    {
        if (error) response.send({state: -1, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_PATIENT", form: records.recordset})
        }
    })
}

const insert = ({national_code, phone_number, backup_phone_number, profile, age, first_name, last_name, father_name, response}) => // add pic later
{
    if (national_code.length >= 8 && national_code.length <= 10 && phone_number.length === 11)
    {
        let request = new mssql.Request(Connection.connection)

        let Jdate = new JDate()
        let dateObj = new Date()

        /** @namespace Jdate.date */
        let create_time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
        let create_date = `${Jdate.date[0]}/${Jdate.date[1]}/${Jdate.date[2]}`

        request.query(`insert into Patient 
        (national_code, phone_number, backup_phone_number, profile, age, first_name, last_name, father_name, create_time, create_date) 
        output inserted.id
        values (N'${national_code}', N'${phone_number}'
        ${backup_phone_number ? `, N'${backup_phone_number}'` : ",NULL"}
        ${profile ? `, N'${profile}'` : ",NULL"}
        ${age ? `, N'${age}'` : ",NULL"}
        ${first_name ? `, N'${first_name}'` : ",NULL"}
        ${last_name ? `, N'${last_name}'` : ",NULL"}
        ${father_name ? `, N'${father_name}'` : ",NULL"}
        ,N'${create_time}'
        ,N'${create_date}'
        )`, (error, records) =>
        {
            if (error) response.send({state: -2, log: "DATA_BASE_ERROR", form: error})
            else
            {
                response.send({state: 1, log: "SUCCESSFUL_CREATE_PATIENT", form: records.recordset[0]})
            }
        })
    }
}

module.exports =
    {
        select: select,
        insert: insert,
    }
let JDate = require("jalali-date")
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
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_RECEPTION", form: records.recordset})
        }
    })
}

const insert = ({patient_id, disease_id, description, bed_id, state, response}) =>
{
    let request = new mssql.Request(Connection.connection)

    let Jdate = new JDate()
    let dateObj = new Date()

    /** @namespace Jdate.date */
    let create_time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    let create_date = `${Jdate.date[0]}/${Jdate.date[1]}/${Jdate.date[2]}`

    request.query(`insert into Reception 
        (patient_id, disease_id, description, bed_id, state, create_time, create_date) 
        output inserted.id
        values (N'${patient_id}'
        ${disease_id ? `, N'${disease_id}'` : ",NULL"}
        ${description ? `, N'${description}'` : ",NULL"}
        ${bed_id ? `, N'${bed_id}'` : ",NULL"}
        ${state ? `, N'${state}'` : ",'1'"}
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

const select_by_disease_id = ({disease_id, response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from Reception where disease_id = N'${disease_id}' and state = 'True'`, (error0, records0) =>
    {
        if (error0) response.send({state: -2, log: "DATA_BASE_ERROR", form: error0})
        else
        {
            if (records0.recordset.length > 0)
            {
                let receptions = records0.recordset
                let patients = []

                receptions.forEach((p, index) =>
                {
                    /** @namespace p.patient_id */
                    request.query(`select * from Patient where id = N'${p.patient_id}'`, (error1, records1) =>
                    {
                        if (error1) response.send({state: -3, log: "DATA_BASE_ERROR", form: error1})
                        else
                        {
                            records1.recordset[0] && patients.push(records1.recordset[0])
                            if (receptions.length - 1 === index)
                            {
                                patients.length === receptions.length ?
                                    response.send({state: 1, log: "SUCCESSFUL_GET_ALL_RECEPTION_FIRST", form: {receptions: receptions, patients: patients}})
                                    : setTimeout(() =>
                                    {
                                        response.send({state: 1, log: "SUCCESSFUL_GET_ALL_RECEPTION_SECOND", form: {receptions: receptions, patients: patients}})
                                    }, 250)
                            }
                        }
                    })
                })
            } else
            {
                response.send({state: 1, log: "NO_RECEPTION", form: records0.recordset})
            }
        }
    })
}


module.exports =
    {
        select: select,
        insert: insert,
        select_by_disease_id: select_by_disease_id,
    }
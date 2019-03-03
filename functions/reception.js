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
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_RECEPTION", form: records.recordset})
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
                                response.send({state: 1, log: "SUCCESSFUL_GET_ALL_RECEPTION", form: {receptions: receptions, patients: patients}})
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
        select_by_disease_id: select_by_disease_id,
    }
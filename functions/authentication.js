// let JDate = require("jalali-date")
let mssql = require("mssql")
let Connection = require("../connection")

////////////////////////////////////// MODULES_IMPORTS_ENDED

const login = ({phone, password, response}) =>
{
    if (phone.length === 11)
    {
        let request = new mssql.Request(Connection.connection)

        request.query(`select * from Personnel where phone_number = N'${phone}'`, (err0, res0) =>
        {
            if (err0) response.send({state: -3, log: "DATA_BASE_ERROR", form: err0})
            else
            {
                if (res0.recordset.length < 1) response.send({state: -4, log: "LOGIN_PHONE_NUMBER_DOES_NOT_EXIST"})
                else
                {
                    let form_data = {...res0.recordset[0]}
                    if (password === form_data.password)
                    {
                        response.send({
                            state: 1,
                            log: "LOGIN_SUCCEED",
                            form: form_data,
                        })
                    } else
                    {
                        response.send({
                            state: -4,
                            log: "LOGIN_INCORRECT_PASSWORD",
                        })
                    }
                }
            }
        })
    } else response.send({state: -2, log: "LOGIN_PARAMETERS_PARAMETERS_DOES_NOT_HAVE_MINIMUM_LENGTHS"})
}

const set_token = ({personnel_id, token, response}) =>
{
    if (!isNaN(personnel_id))
    {
        let request = new mssql.Request(Connection.connection)

        request.query(`update Personnel set token = N'${JSON.stringify(token)}' where id = N'${personnel_id}'`, (err0) =>
        {
            if (err0) response.send({state: -3, log: "DATA_BASE_ERROR", form: err0})
            else
            {
                response.send({state: 1, log: "SUCCESSFUL_SET_TOKEN", form: token})
            }
        })
    } else response.send({state: -2, log: "SET_TOKEN_PERSONNEL_ID_IS_NOT_A_NUMBER"})
}

const select = ({response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from Personnel`, (error, records) =>
    {
        if (error) response.send({state: -1, log: "DATA_BASE_ERROR", form: error})
        else
        {
            response.send({state: 1, log: "SUCCESSFUL_GET_ALL_PERSONNEL", form: records.recordset})
        }
    })
}

const select_by_personnel_role = ({personnel_role, response}) =>
{
    let request = new mssql.Request(Connection.connection)
    request.query(`select * from Personnel where role = N'${personnel_role}'`, (error0, records0) =>
    {
        if (error0) response.send({state: -2, log: "DATA_BASE_ERROR", form: error0})
        else
        {
            response.send({state: 1, log: "GET_PERSONNEL_BY_ROLE", form: records0.recordset})
        }
    })
}

module.exports =
    {
        login: login,
        select: select,
        set_token: set_token,
        select_by_personnel_role: select_by_personnel_role,
    }
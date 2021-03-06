let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, select_by_personnel_id, insert} = require("../functions/nurse_patient")

////////////////////////////////////// FUNCTION_CALLS_ENDED

user_router.route("/")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        select({response: res})
    })

    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")

        let data = {...req.body}

        if (data.personnel_id !== undefined && data.reception_id !== undefined)
        {
            insert({
                personnel_id: data.personnel_id,
                reception_id: data.reception_id,
                response: res,
            })
        } else res.send({state: -1, log: "CREATE_NURSE_PATIENT_PARAMETERS_UNDEFINED", form: data})
    })

user_router.route("/personnel_id")
    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")

        let data = {...req.body}

        if (data.personnel_id !== undefined)
        {
            select_by_personnel_id({personnel_id: data.personnel_id, response: res})
        } else res.send({state: -1, log: "GET_NURSE_PATIENT_BY_PERSONNEL_ID_PARAMETER_UNDEFINED", form: data})
    })

module.exports = user_router
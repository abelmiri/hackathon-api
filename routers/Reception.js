let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, insert, select_by_disease_id} = require("../functions/reception")

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

        if (data.patient_id !== undefined)
        {
            insert({
                patient_id: data.patient_id,
                response: res,
                // Optional Data
                disease_id: data.disease_id,
                description: data.description,
                bed_id: data.bed_id,
                state: data.state,
            })
        } else res.send({state: -1, log: "CREATE_RECEPTION_PARAMETERS_UNDEFINED", form: data})
    })

user_router.route("/disease_id")
    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")

        let data = {...req.body}

        /** @namespace data.disease_id */
        if (data.disease_id !== undefined)
        {
            select_by_disease_id({disease_id: data.disease_id, response: res})
        } else res.send({state: -1, log: "GET_RECEPTION_BY_DISEASE_ID_PARAMETER_UNDEFINED", form: data})
    })

module.exports = user_router
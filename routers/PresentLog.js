let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, select_by_id, select_by_type, insert} = require("../functions/present_log")

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

        if (data.personnel_id !== undefined && data.reception_id !== undefined && data.type !== undefined)
        {
            insert({
                personnel_id: data.personnel_id,
                reception_id: data.reception_id,
                type: data.type,
                response: res,
                // Optional Data
                prescription_id: data.prescription_id,
                description: data.description,
            })
        } else res.send({state: -1, log: "CREATE_PRESENT_LOG_PARAMETERS_UNDEFINED", form: data})
    })

user_router.route("/:id")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (!isNaN(req.params.id))
            select_by_id({id: req.params.id, response: res})
        else res.send({state: -1, log: `GET_PRESENT_LOG_${req.params.id}_IS_NOT_NUMBER`})
    })

user_router.route("/type")
    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")

        let data = {...req.body}

        if (data.type !== undefined)
        {
            select_by_type({type: data.type, response: res})
        } else res.send({state: -1, log: "GET_PRESENT_LOG_BY_TYPE_PARAMETER_UNDEFINED", form: data})
    })

module.exports = user_router
let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, select_by_disease_id} = require("../functions/reception")

////////////////////////////////////// FUNCTION_CALLS_ENDED

user_router.route("/")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        select({response: res})
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
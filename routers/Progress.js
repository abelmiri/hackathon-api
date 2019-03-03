let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, select_by_id, insert} = require("../functions/progress")

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

        /** @namespace data.personnel_id */
        /** @namespace data.reception_id */
        if (data.personnel_id !== undefined && data.reception_id !== undefined)
        {
            insert({
                personnel_id: data.personnel_id,
                reception_id: data.reception_id,
                response: res,
                // Optional Data
                description: data.description,
            })
        } else res.send({state: -1, log: "CREATE_PROGRESS_PARAMETERS_UNDEFINED", form: data})
    })

user_router.route("/:id")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (!isNaN(req.params.id))
            select_by_id({id: req.params.id, response: res})
        else res.send({state: -1, log: `GET_PROGRESS_${req.params.id}_IS_NOT_NUMBER`})
    })

module.exports = user_router
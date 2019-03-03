let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, insert, select_by_personnel_id} = require("../functions/prescription")

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
        /** @namespace data.have_notification */
        if (data.personnel_id !== undefined && data.reception_id !== undefined && data.have_notification !== undefined)
        {
            insert({
                personnel_id: data.personnel_id,
                reception_id: data.reception_id,
                have_notification: data.have_notification,
                response: res,
                // Optional Data
                notification: data.notification,
                description: data.description,
                interval: data.interval,
                is_static: data.is_static,
                is_done: data.is_done,
            })
        } else res.send({state: -1, log: "CREATE_PRESCRIPTION_PARAMETERS_UNDEFINED", form: data})
    })

user_router.route("/personnel_id")
    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")

        let data = {...req.body}

        /** @namespace data.disease_id */
        if (data.personnel_id !== undefined)
        {
            select_by_personnel_id({personnel_id: data.personnel_id, response: res})
        } else res.send({state: -1, log: "GET_PRESCRIPTION_BY_PERSONNEL_ID_PARAMETER_UNDEFINED", form: data})
    })

module.exports = user_router
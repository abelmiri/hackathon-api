let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, select_by_personnel_role} = require("../functions/authentication")

////////////////////////////////////// FUNCTION_CALLS_ENDED

user_router.route("/")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        select({response: res})
    })

user_router.route("/personnel_role")
    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")

        let data = {...req.body}

        /** @namespace data.personnel_role */
        if (data.personnel_role !== undefined)
        {
            select_by_personnel_role({personnel_role: data.personnel_role, response: res})
        } else res.send({state: -1, log: "GET_PERSONNEL_BY_PERSONNEL_ROLE_PARAMETER_UNDEFINED", form: data})
    })


module.exports = user_router
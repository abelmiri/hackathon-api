let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, insert} = require("../functions/bed")

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

        if (data.number !== undefined)
        {
            insert({
                number: data.number,
                response: res,
                // Optional Data
                room: data.room,
                section: data.section,
            })
        } else res.send({state: -1, log: "CREATE_BED_PARAMETERS_UNDEFINED", form: data})
    })

module.exports = user_router
let express = require("express")
// let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {select, insert} = require("../functions/patient")

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

        /** @namespace data.national_code */
        /** @namespace data.phone_number */
        if (data.national_code !== undefined && data.phone_number !== undefined)
        {
            insert({
                national_code: data.national_code,
                phone_number: data.phone_number,
                response: res,
                // Optional Data
                backup_phone_number: data.backup_phone_number,
                first_name: data.first_name,
                last_name: data.last_name,
                father_name: data.father_name,
                age: data.age,
                profile: data.profile,
            })
        } else res.send({state: -1, log: "CREATE_PATIENT_PARAMETERS_UNDEFINED", form: data})
    })

module.exports = user_router
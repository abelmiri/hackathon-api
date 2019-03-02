let express = require("express")
let Data = require("../data")

////////////////////////////////////// MODULES_IMPORTS_ENDED

let user_router = express.Router()

////////////////////////////////////// ROUTERS_CONFIG_ENDED

const {login} = require("../functions/authentication")

////////////////////////////////////// FUNCTION_CALLS_ENDED

user_router.route("/login")
    .post((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        let data = {...req.body}

        data.phone && data.password ?
            login({
                phone: data.phone,
                password: data.password,
                response: res
            }) : res.send({state: -1, log: "LOGIN_PARAMETERS_UNDEFINED"})
    })

module.exports = user_router
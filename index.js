let cors = require("cors")
let express = require("express")
let bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

////////////////////////////////////// CONFIG_ENDED

const Root = require("./routers/Root")
const User = require("./routers/User")
const Personnel = require("./routers/Personnel")
const Prescription = require("./routers/Prescription")
const Reception = require("./routers/Reception")

const Data = require("./data")

////////////////////////////////////// ROUTERS_IMPORTS_ENDED

app.use("/user", User)
app.use("/personnel", Personnel)
app.use("/prescription", Prescription)
app.use("/reception", Reception)
app.use("/", Root)

////////////////////////////////////// ROUTERS_CALLS_ENDED

app.listen(process.env.PORT || Data.port, () =>
{
    console.log(`Server is Now Running on Port ${Data.port}, (${Data.sign})HEX - ${Data.restful_url}`)
})

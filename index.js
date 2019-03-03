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
const Bed = require("./routers/Bed")
const Disease = require("./routers/Disease")
const Patient = require("./routers/Patient")
const Progress = require("./routers/Progress")
const NursePatient = require("./routers/NursePatient")
const PresentLog = require("./routers/PresentLog")

const Data = require("./data")

////////////////////////////////////// ROUTERS_IMPORTS_ENDED

app.use("/user", User)
app.use("/personnel", Personnel)
app.use("/prescription", Prescription)
app.use("/reception", Reception)
app.use("/bed", Bed)
app.use("/disease", Disease)
app.use("/patient", Patient)
app.use("/progress", Progress)
app.use("/nurse_patient", NursePatient)
app.use("/present_log", PresentLog)
app.use("/", Root)

////////////////////////////////////// ROUTERS_CALLS_ENDED

app.listen(process.env.PORT || Data.port, () =>
{
    console.log(`Server is Now Running on Port ${Data.port}, (${Data.sign})HEX - ${Data.restful_url}`)
})

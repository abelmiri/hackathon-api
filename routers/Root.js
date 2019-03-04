let express = require("express")
let mssql = require("mssql")
let Connection = require("../connection")
let JDate = require("jalali-date")
let requests = require("request")
// let path = require('path')

////////////////////////////////////// MODULES_IMPORTS_ENDED

let root_router = express.Router()

setInterval(() =>
{
    let request = new mssql.Request(Connection.connection)

    let Jdate = new JDate()
    let dateObj = new Date()

    /** @namespace Jdate.date */
    let time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    let date = `${Jdate.date[0]}/${Jdate.date[1]}/${Jdate.date[2]}`

    request.query(`insert into ShitLog (date, time) values (N'${date}', N'${time}')`, err => err && console.log(err))
    requests('https://restful.taravat.info/', (error, response, body) => console.log(body))
}, 58000)

root_router.route("/")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send("Welcome to 'Hackathon' Restful API, Happy Hacking ;)")
        // res.sendFile(path.join(__dirname.slice(0, -8), `/200/index.html`))
    })

root_router.route("/*")
    .get((req, res) =>
    {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send("The Endpoint you are looking for, It's not Here.")
        // res.sendFile(path.join(__dirname.slice(0, -8), `/404/index.html`))
    })

module.exports = root_router
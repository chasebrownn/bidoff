require('dotenv').config()

const express = require("express")
const { Pool } = require("pg")
const app = express()

const cors = require("cors")
const pool = require("./db")


function sendVerifyText(phone_number){
    console.log(phone_number)
}


module.exports = {
    sendVerifyText
}
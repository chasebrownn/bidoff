require('dotenv').config()

const express = require("express")
const { Pool } = require("pg")
const app = express()

const cors = require("cors")
const pool = require("./db")

const twilioEnabled = process.env.TWILIO_ENABLED
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serverPhoneNumber = process.env.TWILIO_SERVER_NUMBER

const client = require('twilio')(accountSid, authToken);

function sendVerifyText(phone_number){
    // for local development where twilio isn't set up
    if (!twilioEnabled){
        console.log("twilio not enabled")
        return
    }
    const msg = 'Welcome to BidOff!  To verify account enter code: '
    client.messages.create({body: msg, from: serverPhoneNumber, to: phone_number}).then(message => console.log(message.sid));
}


module.exports = {
    sendVerifyText
}
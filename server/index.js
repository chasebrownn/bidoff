// MUST BE RUN FROM INSIDE SERVER
// Run with "node index.js" or "nodemon index.js"

require('dotenv').config()

const express = require("express")
const { Pool } = require("pg")
const app = express()

const cors = require("cors")
const pool = require("./db")


// middleware
app.use(cors())
app.use(express.json())

// ROUTES
// get all auctions
app.get("/auctions", async (req, res) => {
    try {
        //const allTodos = await pool.query("SELECT * FROM Auctions")
        const allTodos = await pool.query("select * FROM auctions, items where auctions.item_id = items.item_id")
        res.json(allTodos.rows)
    } catch (err) {
        res.send("error")
        console.error(err.message)
    }

})

app.listen(5000, () => {
    console.log("Server started on port 5000");
})
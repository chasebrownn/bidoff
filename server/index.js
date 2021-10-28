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
        const allTodos = await pool.query("select * FROM auctions, items, users where auctions.item_id = items.item_id AND auctions.user_id = users.user_id")
        res.json(allTodos.rows)
    } catch (err) {
        res.send("error")
        console.error(err.message)
    }

})

//create an auction -- needs work
app.post("/auctions", async (req, res) => {
    try {
        const { description } = req.body;
        //adds to database
        const new_auction = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(new_auction.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
})
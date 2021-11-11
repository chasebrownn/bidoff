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
app.post("/auction", async (req, res) => {
    try {
        const { title, description, image_link,  user_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price } = req.body;
        console.log(title, description, image_link,  user_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price);
        //adds to database
        const new_item = await pool.query("INSERT INTO Items (title, description, image_link) VALUES ($1, $2, $3) RETURNING item_id", [title, description, image_link]
        );
        const new_item_id = new_item.rows[0].item_id
        console.log(user_id, new_item_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price)
        const new_auction = await pool.query("INSERT INTO Auctions (user_id, item_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING item_id", 
        [user_id, new_item_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price]
        );
        res.send("Success")
        
    }
    catch (err) {
        console.error(err.message);
    }
});
// User Endpoints:
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM Users")
        res.json(allUsers.rows)
    } catch (err) {
        res.send("error")
        console.error(err.message)
    }

})

// require either phone number or email
// reject if either already in db

// add a new user.  For now, passwords are not hashed
app.post("/user", async (req, res) => {
    try {
        const {password, first_name, last_name, email, phone_number, address} = req.body;
        // add validation
        console.log(req.body)
        console.log(password, first_name, last_name, email, phone_number, address);
        pool.query("INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_number, phone_number_verified, address) VALUES ($1, $2, $3, $4, 'False', $5, 'False', $6)", [password, first_name, last_name, email, phone_number, address]);
        res.send("Success")
        console.log("Success")
    } catch (err) {
        console.error(err.message)
    }
})



app.listen(5000, () => {
    console.log("Server started on port 5000");
})
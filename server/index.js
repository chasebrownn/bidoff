// MUST BE RUN FROM INSIDE SERVER
// Run with "node index.js" or "nodemon index.js"

require('dotenv').config()

const express = require("express")
const { Pool } = require("pg")
const app = express()

const cors = require("cors")
const pool = require("./db")

const verify = require("./verify")
const jwt = require('jsonwebtoken')

// this function can be used as middleware for requests that require authentication
function authenticateToken(req, res, next) {
    // console.log(req)
    const token = req.headers['authorization']
    // console.log(authHeader)
    // const token = authHeader && authHeader.split(' ')[1]
    console.log("Middleware recieved token: " + token)
  
    if (token == null) return res.sendStatus(401)
    // MUST HAVE A TOKEN_SECRET!!!
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user_id) => {
    //   console.log(err)
      if (err) return res.sendStatus(403)
      req.user_id = user_id
      console.log("Middleware passed user: " + user_id)
      next()
    })
}


// middleware
app.use(cors())
app.use(express.json())

// ROUTES
// get all auctions
app.get("/auctions", async (req, res) => {
    try {
        const { tag, start_date, end_date } = req.query
        if ( tag === '0'){
            const data = await pool.query("select * FROM auctions, items, users where auctions.item_id = items.item_id AND auctions.user_id = users.user_id AND auctions.end_datetime <= $1", [end_date])
            return res.json(data.rows)
        }else if (tag !== '0') {
            const data = await pool.query("select * FROM auctions, items, users, tageditems where auctions.item_id = items.item_id AND auctions.user_id = users.user_id AND \
                items.item_id = tageditems.item_id and tageditems.tag_id = $1", [parseInt(tag)])
            return res.json(data.rows)
        }

    } catch (err) {
        res.send("error")
        console.error(err.message)
    }
})

//create an auction -- needs work
app.post("/auction", authenticateToken, async (req, res) => {
    // This is an example of how to use authenticateToken as middleware and then get a user_id from it
    console.log(req.user_id)
    try {
        const { title, description, image_link,  bad_user_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price } = req.body;
        const user_id = req.user_id
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

app.put("/buy", async (req, res) => {
    try {
        const { user_id, auction_id, purchase_price } = req.body;
        console.log(user_id, auction_id, purchase_price);
        const date = Date.now()
        // remove the auction from the auction table
        const item_id = await pool.query("DELETE FROM Auctions WHERE auction_id = $1 RETURNING item_id", [auction_id]);
        // add item to purchased table
        const new_purchase = await pool.query("INSERT INTO purchases (user_id, item_id, purchase_datetime, purchase_price) VALUES ($1, $2, now(), $3) RETURNING item_id", [parseInt(user_id), parseInt(item_id.rows[0].item_id), parseFloat(purchase_price)]);
        res.send("Success")
    }
    catch (err) {
        console.error(err.message);
    }
});

app.put("/bid", async (req, res) => {
    try {
        const { user_id, auction_id } = req.body;
        console.log(user_id, auction_id);
        const date = Date.now()
        // remove the auction from the auction table
        const bid_price = await pool.query("SELECT FROM Bids, Auctions WHERE Auctions.auction_id = Bids.auction_id AND auction_id = $1 RETURNING bid_price", [auction_id]);
        let parsed_bid = parseFloat(bid_price.rows[0].bid_price)
        parsed_bid++;
        const new_bid_price = await pool.query("INSERT INTO Bids (auction_id, bid_price) VALUES $1, $2 RETURNING bid_price", [parseInt(auction_id), parsed_bid]);
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
// send confirmation email or phone number or both
// reject if either already in db
app.post("/user", async (req, res) => {
    console.log("POST USER");
    try {
        const {password, first_name, last_name, email, phone_number, address} = req.body;
        
        // validation
        if (email.length > 0){
            // this is a email regex I grabbed from stack overflow
            // just because an email fits it, doesn't mean it is valid
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) == false){
                res.status(400)
                console.log("invalid email");
                res.send("Invalid Email")
                return
            }

            const emailInDB = await pool.query("SELECT * FROM Users WHERE email = $1", [email])

            if (emailInDB.rows.length > 0) {
                res.status(400)
                console.log("eamil already in use");
                res.send("Email already in use")
                return
            }
        }

        if (phone_number.length > 0){
             // up to 15 digits starting with a +
            // first + is an area code
            // +15033359873
            // just because a phone number fits the regex, doesn't mean it is valid
            // in future, can use twilio lookup api to verify number is real
            // if (/^\+[1-9]\d{1,14}$/.test(phone_number) == false){
            //     console.log("Invalid Phone Number")
            //     res.send("Invalid Phone Number")
            //     return
            // }
    
            const phoneNumberInDB = await pool.query("SELECT * FROM Users WHERE phone_number = $1", [phone_number])

            if (phoneNumberInDB.rows.length > 0) {
                res.status(400)
                console.log("Phone number already in use")
                res.send("Phone number already in use")
                return
            }
        }

        if (first_name.length == 0){
            res.status(400)
            res.send("First name must be at least 1 character")
            return
        }

        if (last_name.length == 0){
            res.status(400)
            res.send("Last name must be at least 1 character")
            return
        }

        if (address.length == 0){
            res.status(400)
            res.send("Address must be at least 1 character")
            return
        }

        if (password.length < 6){
            res.status(400)
            res.send("Password must be at least 6 characters")
            return
        }

        // needs an email and/or a phone number
        if (phone_number.length > 0 || email.length > 0){
            pool.query("INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_number, phone_number_verified, address) VALUES ($1, $2, $3, $4, 'False', $5, 'False', $6)", [password, first_name, last_name, email, phone_number, address]);
            verify.sendVerifyText(phone_number)
            res.status(200)
            res.send("Success")
            return
        }
        
    } catch (err) {
        res.send("Internal Error")
        res.status(500)
        console.error(err.message)
        
    }
})

// authenticate user, return valid token if password is valid
app.post("/user_auth", async (req, res) => {
    console.log("POST user_auth");
    try {
        const {email, password} = req.body;

        // NOTE: for now, user passwords are NOT hashed!
        const valid_users = await pool.query("SELECT * FROM Users WHERE email = $1 AND password = $2", [email, password])
        if (valid_users.rows.length > 0) {
            // authenticate user
            const user_id = valid_users.rows[0].user_id
            console.log("Auhenticating user with used_id: " + user_id)
            const token = jwt.sign(user_id, process.env.TOKEN_SECRET)
            res.status(200)
            // console.log("authenticating user");
            res.json(token)
            return
        } else {
            console.log("Invalid login attempt")
            res.status(400)
            res.send("Invalid Email and/or Password!")
            return
        }
    } catch (err) {
        res.send("Internal Error")
        res.status(500)
        console.error(err.message)
    }
})



app.listen(5000, () => {
    console.log("Server started on port 5000");
})
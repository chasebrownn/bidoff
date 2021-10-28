-- this file is for writing out querries


-- get all bids ordered by ending date on auction 1
SELECT Bids.bider_id, Bids.auction_id, Bids.bid_price, Auctions.item_id, Auctions.end_datetime
FROM Bids, Auctions
WHERE Bids.auction_id = Auctions.auction_id AND Auctions.auction_id = 1
ORDER BY end_datetime DESC;


-- get all bids on item 1 ordered by price
SELECT Bids.bider_id, Bids.auction_id, Bids.bid_price, Auctions.item_id
FROM Bids, Auctions
WHERE Bids.auction_id = Auctions.auction_id AND Auctions.item_id = 1
ORDER BY Bids.bid_price DESC;


-- get all auctions for item 1
SELECT Auctions.auction_id
FROM Auctions
WHERE item_id = 1;


-- get a user's password
SELECT password
FROM Users
WHERE user_id = 1;


-- average bid price on item 1
SELECT AVG(Bids.bid_price)
FROM Bids, Auctions
WHERE Bids.auction_id = Auctions.auction_id AND Auctions.item_id = 1;


-- average bid value from user 1 across all auctions
SELECT AVG(Bids.bid_price)
FROM Bids, Users
WHERE Bids.bider_id = Users.user_id AND Users.user_id = 1;


-- get all items purchased by user 1 (Henry)
SELECT * FROM Purchases WHERE user_id = 1;

-- this file is for writing out querries

-- get all bids ordered by ending date by auction 1
SELECT Bids.bider_id, Bids.auction_id, Bids.bid_price, Auctions.item_id, Auctions.end_datetime
FROM Bids, Auctions
WHERE Bids.auction_id = Auctions.auction_id AND Auctions.auction_id = 1
ORDER BY end_datetime;

-- get all bid on item 1 ordered by price
SELECT Bids.bider_id, Bids.auction_id, Bids.bid_price, Auctions.item_id
FROM Bids, Auctions
WHERE Bids.auction_id = Auctions.auction_id AND Auctions.item_id = 1
ORDER BY Bids.bid_price;


-- get a user's password
SELECT password
FROM Users
WHERE user_id = 1;

-- add a bid to an auction


-- add an auction


-- get all items purchased by user 1 (Henry)
SELECT * FROM Purchases WHERE user_id = 1;

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

-- get max bid on item
SELECT MAX(Bids.bid_price) from Bids, Auctions
WHERE Bids.auction_id = Auctions.auction_id and Auctions.auction_id = 1;

-- get the instant buy price for an Auction
SELECT inst_buy_price from auctions where auction_id = 1;

-- select all active auctions with the Dog tag that can be instantly purchased
Select * from auctions, tageditems, tags
WHERE auctions.item_id = tageditems.item_id and tageditems.tag_id = tags.tag_id and tags.name = 'Dog'
  and end_datetime > now() and inst_buy_enabled = true;

-- select all active auctions with at least one bid
select * from auctions, bids
where bids.auction_id = auctions.auction_id and end_datetime > now();

-- select all the auction id of all auctions with the Dog tag, ordered by the min bid
Select auction_id from auctions, tageditems, tags
WHERE auctions.item_id = tageditems.item_id and tageditems.tag_id = tags.tag_id and tags.name = 'Dog'
  and end_datetime > now()
  order by min_bid;

-- select all auctions with the dog tag that have not recieved an bid yet
select * from auctions, tageditems, tags
where auctions.item_id = tageditems.item_id and tageditems.tag_id = tags.tag_id and tags.name = 'Dog'
  and end_datetime > now() and auction_id not in (select auction_id from bids);

-- select price of all items that the user henry purchased with the outdoors tag
select purchase_price from purchases, tageditems, tags
where purchases.item_id = tageditems.item_id and tageditems.tag_id = tags.tag_id and tags.name = 'Outdoors'
  and user_id = 1;

-- Example of updating the min price on an auction
UPDATE auctions
set min_bid =  100
where auction_id = 1;

-- Example of updating the instant buy price on an auction
UPDATE auctions
set inst_buy_price =  100
where auction_id = 1;

-- Example of extending an auction's end date by a week
UPDATE  auctions
set end_datetime = end_datetime + interval '1 week'
where auction_id = 1;






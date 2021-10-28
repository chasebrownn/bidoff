-- this file is for writing out all of the insertions to fill the db with dummy data
-- dummy users
INSERT INTO Users (user_id, password, first_name, last_name, email, email_verified, phone_number, phone_number_verified, address) VALUES 
(1, '1234', 'Henry', 'OM', 'email@gmail.com', TRUE, '', FALSE, 'Tempe, AZ'), -- 1
(2, 'oash5ga4I', 'Doyle', 'Garner', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278'), -- 2
(3, 'lokoo3Nee', 'Jean', 'Allen', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278'), -- 3
(4, 'Oe7wahBae', 'Erick', 'Vera', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278'), -- 4
(5, 'quahPi0eePee', 'Mary', 'Solva', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278'), -- 5
(6, 'fo2Viek7oor', 'Clara', 'Woods', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278'); -- 6

-- dummy items
INSERT INTO Items (item_id, title, description, image_link) VALUES 
(1, 'Cool Dog Costume', 'This is a cool dog costume', 'https://preview.redd.it/67zvv92pw2p21.jpg?width=640&crop=smart&auto=webp&s=f74d5e8f06804fd004e1b8e1b635bf3f8c813e87'), -- 1
(2, 'Trading Card', 'I love this card, but it is really valuable!', 'https://static01.nyt.com/images/2021/02/16/sports/00sports-cards3/merlin_158400765_12549293-2c4f-4205-b4f2-40937bd2a0fa-articleLarge.jpg'), -- 2
(3, 'Cookies', 'Yummy!!!!', 'https://i.redd.it/glh2y8nqfb401.jpg'), -- 3
(4, 'Canada Goose Jacket!', 'Really warm!', 'https://external-preview.redd.it/QcJXry_1sWiEt11IzQS6pFQ0I1ndv3JbCFPjQNIgOJ4.jpg?auto=webp&s=6a551411681e8132554a87caebb1808a5e1af6c0'), -- 4
(5, 'Pitbull Hoddie', 'A hoodie for your pitbull!!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvD0MZMsD2hX8cul4zAsGoxqF93ldNNmxIoehux8fcXZX7AZgeEIP7dTPrR3EgAuMdnrg&usqp=CAU');-- 5

-- more dummy items
INSERT INTO Items (item_id, title, description, image_link) VALUES
(6, 'Poodle Jacket', 'A poodlejacke', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvD0MZMsD2hX8cul4zAsGoxqF93ldNNmxIoehux8fcXZX7AZgeEIP7dTPrR3EgAuMdnrg&usqp=CAU'); -- 6
-- tags
INSERT INTO Tags (tag_id, name) VALUES
(1, 'Arts & Entertainment'),
(2, 'Software'),
(3, 'Vehicles & Parts'),
(4, 'Sporting Goods'),
(5, 'Health & Beauty'),
(6, 'Baby & Toddler'),
(7, 'Home & Garden'),
(8, 'Religious & Ceremonial'),
(9, 'Business & Industrial'),
(10, 'Media'),
(11, 'Mature'),
(12, 'Food, Beverages & Tobacco'),
(13, 'Electronics'),
(14, 'Office Supplies'),
(15, 'Apparel & Accessories'),
(16, 'Luggage & Bags'),
(17, 'Animals & Pet Supplies'),
(18, 'Toys & Games'),
(19, 'Hardware'),
(20, 'Cameras & Optics'),
(21, 'Furniture'),
(22, 'Dog'),
(23, 'Baseball'),
(24, 'Food'),
(25, 'Costume'),
(26, 'Outdoors');

INSERT INTO TagedItems (tag_id, item_id) VALUES
(22, 1),
(22, 5),
(23, 2),
(24, 3),
(25, 1),
(25, 5),
(26, 4);

-- more Tags
INSERT INTO tageditems (tag_id, item_id) VALUES
(22, 6);


-- dummy auctions, uses ids from items!
INSERT INTO Auctions (auction_id, user_id, item_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price) VALUES 
(1, 3, 1, '2021-11-26 17:54:0.0', 10.00, TRUE, 44.99), -- 1
(2, 1, 2, '2021-12-5 5:04:0.0', 1000.00, TRUE, 1500.00), -- 2
(3, 6, 3, '2022-1-1 00:00:0.0', 10.00, FALSE, 0.0); -- 3

-- more dummy auctions
INSERT INTO Auctions(auction_id, user_id, item_id, end_datetime, min_bid, inst_buy_enabled, inst_buy_price) VALUES
(4, 5, 6, '2021-12-25 17:40:0.0', 20, FALSE, 0);

-- dummy bids, auction #2 intentionally has no bids
INSERT INTO Bids (bider_id, auction_id , bid_price) VALUES
(1, 1 , 11.00),
(2, 1 , 12.00),
(3, 1 , 13.00),
(1, 3 , 11.00),
(5, 3 , 21.00),
(6, 3 , 99.00),
(4, 3 , 110.00);

-- dummy purchases
INSERT INTO Purchases (user_id, item_id, purchase_datetime, purchase_price) VALUES
(1, 4, '2018-4-19 10:35:0.0', 550.00),
(6, 5, '2022-5-28 20:13:0.0', 35.00);





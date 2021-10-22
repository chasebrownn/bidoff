DROP SCHEMA Public CASCADE;
CREATE SCHEMA Public;

CREATE TABLE Users (
    user_id SERIAL NOT NULL,
    password VARCHAR(50),

    first_name VARCHAR(50),
    last_name VARCHAR(50),

    -- email
    email VARCHAR(50),
    email_verified BOOLEAN,

    -- phone number
    -- [+][country code][subscriber number] ex. +14155552671 for (415)555-2671
    phone_number VARCHAR(12),
    phone_number_verified BOOLEAN,
    address VARCHAR(1000),
    -- key
    PRIMARY KEY (user_id)
);

CREATE TABLE Items (
    item_id SERIAL NOT NULL,
    -- info
    title VARCHAR(50),
    description VARCHAR(1000),
    image_link VARCHAR(1000),
    
    -- key
    PRIMARY KEY (item_id)
);

CREATE TABLE Auctions (
    auction_id SERIAL NOT NULL,
    user_id SERIAL NOT NULL,
    item_id SERIAL NOT NULL,
    -- auction info
    end_datetime TIMESTAMP,
    min_bid FLOAT, -- float in dollars
    inst_buy_enabled BOOLEAN,
    inst_buy_price FLOAT,
    -- key
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id),
    PRIMARY KEY (auction_id)
);

CREATE TABLE Bids (
    bider_id SERIAL NOT NULL,
    auction_id SERIAL NOT NULL,
    -- bid info
    bid_price FLOAT,
    -- key
    FOREIGN KEY (bider_id) REFERENCES Users(user_id),
    FOREIGN KEY (auction_id) REFERENCES Auctions(auction_id),
    PRIMARY KEY (bider_id, auction_id)
);

CREATE TABLE Purchases (
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    -- auction info
    purchase_datetime TIMESTAMP,
    purchase_price FLOAT, -- float in dollars
    -- key
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id),
    PRIMARY KEY (user_id, item_id)
);


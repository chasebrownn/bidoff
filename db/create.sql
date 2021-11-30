DROP SCHEMA Public CASCADE;
CREATE SCHEMA Public;

CREATE SEQUENCE user_id_seq;

CREATE TABLE Users (
    user_id BIGINT NOT NULL DEFAULT NEXTVAL('user_id_seq'),
    password VARCHAR(50),

    first_name VARCHAR(50),
    last_name VARCHAR(50),

    -- email
    email VARCHAR(50),
    email_verified BOOLEAN,

    -- phone number
    -- + followed by up to 15 digits
    phone_number VARCHAR(16),
    phone_number_verified BOOLEAN,
    address VARCHAR(1000),
    -- key
    PRIMARY KEY (user_id)
);

CREATE SEQUENCE item_id_seq;

CREATE TABLE Items (
    item_id BIGINT NOT NULL DEFAULT NEXTVAL('item_id_seq'),
    -- info
    title VARCHAR(50),
    description VARCHAR(1000),
    image_link VARCHAR(1000),
    
    -- key
    PRIMARY KEY (item_id)
);

CREATE SEQUENCE tag_id_seq;


CREATE TABLE Tags (
    tag_id BIGINT NOT NULL DEFAULT NEXTVAL('tag_id_seq'),
    name VARCHAR(40),
    PRIMARY KEY (tag_id)
);


CREATE TABLE TagedItems (
    tag_id BIGINT,
    item_id BIGINT,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id),
    PRIMARY KEY (tag_id, item_id)
);

CREATE SEQUENCE auction_id_seq;

CREATE TABLE Auctions (
    auction_id BIGINT NOT NULL DEFAULT NEXTVAL('auction_id_seq'),
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    -- auction info
    end_datetime TIMESTAMP,
    min_bid FLOAT, -- float in dollars
    inst_buy_enabled BOOLEAN,
    inst_buy_price FLOAT,
    -- key
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE ,
    PRIMARY KEY (auction_id)
);


CREATE TABLE Bids (
    bider_id BIGINT NOT NULL,
    auction_id BIGINT NOT NULL,
    -- bid info
    bid_price FLOAT,
    -- key
    FOREIGN KEY (bider_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (auction_id) REFERENCES Auctions(auction_id) ON DELETE CASCADE,
    PRIMARY KEY (bider_id, auction_id)
);

CREATE TABLE Purchases (
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    -- auction info
    purchase_datetime TIMESTAMP,
    purchase_price FLOAT, -- float in dollars
    -- key
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE ,
    PRIMARY KEY (user_id, item_id)
);


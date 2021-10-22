-- this file is for writing out all of the insertions to fill the db with dummy data
-- dummy users
INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_numer, phone_number_verified, address)
VALUES ('1234', 'Henry', 'OM', 'hoscannl@asu.edu', TRUE, '', FALSE, 'Tempe, AZ');

INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_numer, phone_number_verified, address)
VALUES('oash5ga4I', 'Doyle', 'Garner', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278');

INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_numer, phone_number_verified, address)
VALUES('lokoo3Nee', 'Jean', 'Allen', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278');

INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_numer, phone_number_verified, address)
VALUES('Oe7wahBae', 'Erick', 'Vera', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278');

INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_numer, phone_number_verified, address)
VALUES('quahPi0eePee', 'Mary', 'Solva', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278');

INSERT INTO Users (password, first_name, last_name, email, email_verified, phone_numer, phone_number_verified, address)
VALUES('fo2Viek7oor', 'Clara', 'Woods', 'pp970u+5xcia77d8i8wk@sharklasers.com', TRUE, '+14155552671', TRUE, '2040 Barfield Lane, Indianapolis, IN, 46278');

-- dummy items
INSERT INTO Items (title, description, image_link)
VALUES('Cool Dog Costume', 'This is a cool dog costume', 'https://preview.redd.it/67zvv92pw2p21.jpg?width=640&crop=smart&auto=webp&s=f74d5e8f06804fd004e1b8e1b635bf3f8c813e87');

INSERT INTO Items (title, description, image_link)
VALUES('Trading Card', 'I love this card, but it is really valuable!', 'https://static01.nyt.com/images/2021/02/16/sports/00sports-cards3/merlin_158400765_12549293-2c4f-4205-b4f2-40937bd2a0fa-articleLarge.jpg?quality=75&auto=webp&disable=upscale');

INSERT INTO Items (title, description, image_link)
VALUES('Cookies', 'Yummy!!!!', 'https://i.redd.it/glh2y8nqfb401.jpg');

INSERT INTO Items (title, description, image_link)
VALUES('Canada Goose Jacket!', 'Really warm!', 'https://external-preview.redd.it/QcJXry_1sWiEt11IzQS6pFQ0I1ndv3JbCFPjQNIgOJ4.jpg?auto=webp&s=6a551411681e8132554a87caebb1808a5e1af6c0');

INSERT INTO Items (title, description, image_link)
VALUES('Pitbull Hoddie', 'A hoodie for your pitbull!!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvD0MZMsD2hX8cul4zAsGoxqF93ldNNmxIoehux8fcXZX7AZgeEIP7dTPrR3EgAuMdnrg&usqp=CAU');
CREATE TABLE csv_import (
  id SERIAL PRIMARY KEY,
  product character varying NOT NULL,
  material character varying,
  color character varying,
  category character varying NOT NULL,
  image character varying,
  description character varying NOT NULL,
  stock integer NOT NULL,
  supplier_name character varying NOT NULL,
  supplier_logo character varying NOT NULL,
  supplier_description character varying NOT NULL,
  supplier_address character varying NOT NULL,
  supplier_postcode character varying NOT NULL,
  supplier_city character varying NOT NULL,
  supplier_country character varying NOT NULL,
  supplier_delay integer NOT NULL,
  employee_phonenumber character varying NOT NULL,
  employee_name character varying NOT NULL,
  employee_email character varying NOT NULL
);

COPY csv_import (
  product,
  material,
  color,
  category,
  image,
  description,
  stock,
  supplier_name,
  supplier_logo,
  supplier_description,
  supplier_address,
  supplier_postcode,
  supplier_city,
  supplier_country,
  supplier_delay,
  employee_phonenumber,
  employee_name,
  employee_email
)
FROM '/data/dataset.csv'
DELIMITER ','
CSV HEADER;

INSERT INTO supplier
(
  name,
  logo,
  description,
  address,
  postcode,
  city,
  country,
  delay
)
SELECT DISTINCT ON (ci.supplier_name)
  ci.supplier_name,
  ci.supplier_logo,
  ci.supplier_description,
  ci.supplier_address,
  ci.supplier_postcode,
  ci.supplier_city,
  ci.supplier_country,
  ci.supplier_delay
FROM csv_import ci;

INSERT INTO employee
(
  phone_number,
  name,
  email,
  "supplierId"
)
SELECT DISTINCT ON (ci.employee_name)
  ci.employee_phonenumber,
  ci.employee_name,
  ci.employee_email,
  supplier.id
FROM csv_import ci
INNER JOIN supplier ON supplier.name = ci.supplier_name;

INSERT INTO product
(
  product,
  material,
  color,
  category,
  image,
  description,
  stock,
  "supplierId",
  "employeeId"
)
SELECT DISTINCT
  ci.product, 
  ci.material, 
  ci.color, 
  ci.category, 
  ci.image, 
  ci.description,
  ci.stock,
  supplier.id,
  employee.id
FROM csv_import ci
INNER JOIN supplier ON supplier.name = ci.supplier_name
INNER JOIN employee ON employee.name = ci.employee_name
;

DROP TABLE csv_import;

INSERT INTO "message_status" ("status") VALUES
('En attente'),
('Lu'),
('Archivé');

INSERT INTO "order_status" ("status") VALUES
('En attente'),
('Validée'),
('En livraison'),
('Retard fournisseur'),
('Retard transporteur'),
('Reliquat'),
('Complète'),
('Annulée');

INSERT INTO "role" ("role") VALUES
('approvisionnement'),
('achat'),
('atelier'),
('admin');

INSERT INTO "user" ("name", "email", "password", "activationDate", "isActive", "roleId") VALUES
('Giles Casseldine',	'gcasseldine2@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$5M2xuu0OQxzBupBljA50uQ$De01ptsHxigmyJubO/3xLt86v8/GlxLWQgzHhAblZug',	'2024-04-02',	't',	3),
('Jamesy Duffit',	'jduffit1@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$y1Xyg8NPA1Fl3kqdm+AZoQ$1nk2Q9W3v7TFuGqjhjZERzxNsFGN9Ugvcvy7QByyeQ8',	'2024-04-03',	't',	1),
('Stearne Braben',	'sbraben3@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$Emvg4X5WVoqlo6tT9g54nQ$uY5LJBrQ2R4a5ihW1jAFECJpW8ilExbxg1+MYsJJQt0',	'2024-06-19',	't',	3),
('Burgess Illing',	'billing0@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$3JLmDkj6QX6BCarGbTSYPw$sH3/K9dtJbr9Xdbi5isLHFHIfT49+dDaf2T8080B1rI',	'2024-06-14',	't',	3),
('Jacki Enderlein',	'jenderlein6@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$JWya8+vDFvNRQ6MdSGKPGg$zz7+EfthieBf/kyZMMzdOvJsbp1IcexvE3xLCb148ag',	'2024-10-15',	't',	4),
('Lynnett Curtois',	'lcurtois5@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$BH1uMQCtJespUq7t0/RA0Q$Pqle3nIJ4ef+iro1/TUPoLKiiwifutGDQmHnbWYflQ0',	'2024-07-02',	't',	3),
('Joellyn Bencher',	'jbencher4@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$1yIB/mZZVvdo/8M2is2waA$g9TbiZLLER3FRjfHuu8zgJWpTyz9FoKgU4Ok71tuwMk',	'2024-09-24',	't',	1),
('Norene Diggell',	'ndiggell7@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$+qMlrxMBjFHatAIgO4wSdg$nxN0QAqh/IcvvEkoeWw2N9noAblt9kzkaSg2kmKCCYk',	'2024-04-03',	't',	2),
('Leo Stansfield',	'lstansfield8@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$NsBZdsL2VW1KIMjhvrOfNw$jFIhqqLEDt+6dFOy06lCsshQPhxU+DNWkfFSKrqtnN8',	'2024-05-04',	't',	2),
('Mervin Menego',	'mmenego9@example.com',	'$argon2id$v=19$m=19456,t=2,p=1$nmwLI8w9ABarLzEZ2MLa6Q$gW/MUA4zHiTBXM07Y4v2hLTPrst9YVE93NkCapNxur0',	'2024-06-02',	't',	4);

INSERT INTO "message" ("title", "message", "created_at", "statusId", "userId") VALUES
('vitae nisl aenean',	'eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper',	'2024-02-29',	2,	2),
('justo nec',	'vestibulum velit id pretium iaculis diam erat fermentum justo nec',	'2024-03-15',	1,	1),
('ligula suspendisse ornare',	'luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci',	'2024-04-01',	1,	3),
('sed',	'quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam',	'2024-09-03',	3,	4),
('ridiculus mus vivamus',	'dictumst maecenas ut massa quis augue luctus tincidunt',	'2024-07-25',	3,	5),
('integer aliquet massa',	'ac neque duis bibendum morbi non',	'2024-01-12',	1,	6),
('fermentum justo nec condimentum neque',	'nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum',	'2024-01-11',	3,	7),
('sagittis dui vel nisl',	'ornare consequat lectus in est risus auctor sed tristique in',	'2024-01-23',	1,	7),
('aenean lectus',	'blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id',	'2024-03-26',	2,	8),
('erat quisque erat',	'consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi',	'2023-12-29',	2,	8);

INSERT INTO "order" ("created_at", "statusId", "supplierId") VALUES
('2024-04-02',	7,	5),
('2024-09-24',	6,	4),
('2024-07-02',	5,	3),
('2024-06-14',	4,	2),
('2024-06-19',	3,	1),
('2024-02-19',	2,	1),
('2024-10-15',	1,	1),
('2024-09-30',	8,	6),
('2024-04-03',	7,	7),
('2024-04-04',	1,	8),
('2024-05-04',	2,	9),
('2024-06-02',	3,	10);

INSERT INTO "order_product" ("quantity", "orderId", "productId") VALUES
(66,	8,	2),
(65,	4,	3),
(36,	8,	4),
(45,	8,	1),
(32,	7,	5),
(29,	2,	6),
(27,	3,	7),
(77,	2,	8),
(12,	6,	9),
(85,	9,	10);
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
FROM '/app/data/dataset.csv'
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
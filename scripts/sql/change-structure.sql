
-- Edit structure database Dashboard
DROP TABLE IF EXISTS  customer_dashboard."master_template";
DROP TABLE IF EXISTS  customer_dashboard."map_template_api";

ALTER TABLE customer_dashboard."user" 
DROP COLUMN IF EXISTS favorite;

-- New table map_menu
CREATE TABLE map_menu(
   map_menu_id serial PRIMARY KEY ,
   menu_id int2 NOT NULL,
   sub_menu_id int2 NOT null,
   create_date timestamp,
   update_date timestamp,
   create_by varchar(10),
   update_by varchar(10)
);


-- Init data map_menu
INSERT INTO customer_dashboard.map_menu
(menu_id,sub_menu_id,create_date,update_date,create_by,update_by)
VALUES(1,1,current_timestamp,current_timestamp,'script','script'),
(3,2,current_timestamp,current_timestamp,'script','script'),
(3,3,current_timestamp,current_timestamp,'script','script'),
(3,4,current_timestamp,current_timestamp,'script','script'),
(4,5,current_timestamp,current_timestamp,'script','script'),
(4,6,current_timestamp,current_timestamp,'script','script'),
(4,7,current_timestamp,current_timestamp,'script','script'),
(5,9,current_timestamp,current_timestamp,'script','script'),
(5,10,current_timestamp,current_timestamp,'script','script'),
(6,11,current_timestamp,current_timestamp,'script','script'),
(6,12,current_timestamp,current_timestamp,'script','script'),
(6,15,current_timestamp,current_timestamp,'script','script'),
(7,16,current_timestamp,current_timestamp,'script','script'),
(8,18,current_timestamp,current_timestamp,'script','script'),
(9,20,current_timestamp,current_timestamp,'script','script'),
(10,21,current_timestamp,current_timestamp,'script','script'),
(11,22,current_timestamp,current_timestamp,'script','script'),
(11,23,current_timestamp,current_timestamp,'script','script'),
(11,24,current_timestamp,current_timestamp,'script','script'),
(12,25,current_timestamp,current_timestamp,'script','script'),
(12,26,current_timestamp,current_timestamp,'script','script'),
(13,27,current_timestamp,current_timestamp,'script','script'),
(26,28,current_timestamp,current_timestamp,'script','script'),
(26,29,current_timestamp,current_timestamp,'script','script'),
(26,30,current_timestamp,current_timestamp,'script','script'),
(26,31,current_timestamp,current_timestamp,'script','script'),
(26,32,current_timestamp,current_timestamp,'script','script'),
(26,33,current_timestamp,current_timestamp,'script','script'),
(26,34,current_timestamp,current_timestamp,'script','script'),
(26,35,current_timestamp,current_timestamp,'script','script');

-- Edit table map_role_menu
ALTER TABLE customer_dashboard."map_role_menu" 
ADD COLUMN map_menu_id int2;

UPDATE customer_dashboard.map_role_menu SET map_menu_id=1 WHERE map_role_id=1;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=2 WHERE map_role_id=2;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=3 WHERE map_role_id=3;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=4 WHERE map_role_id=4;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=5 WHERE map_role_id=5;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=6 WHERE map_role_id=6;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=7 WHERE map_role_id=7;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=8 WHERE map_role_id=9;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=9 WHERE map_role_id=10;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=10 WHERE map_role_id=11;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=11 WHERE map_role_id=12;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=12 WHERE map_role_id=15;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=13 WHERE map_role_id=16;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=14 WHERE map_role_id=18;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=15 WHERE map_role_id=20;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=16 WHERE map_role_id=21;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=17 WHERE map_role_id=22;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=18 WHERE map_role_id=23;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=19 WHERE map_role_id=24;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=20 WHERE map_role_id=25;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=21 WHERE map_role_id=26;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=22 WHERE map_role_id=29;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=23 WHERE map_role_id=40;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=24 WHERE map_role_id=41;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=25 WHERE map_role_id=42;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=26 WHERE map_role_id=43;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=27 WHERE map_role_id=44;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=28 WHERE map_role_id=45;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=29 WHERE map_role_id=46;
UPDATE customer_dashboard.map_role_menu SET map_menu_id=30 WHERE map_role_id=47;


--UPDATE customer_dashboard.map_role_menu SET map_menu_id=1 WHERE map_role_id=32;
--UPDATE customer_dashboard.map_role_menu SET map_menu_id=3 WHERE map_role_id=33;
--UPDATE customer_dashboard.map_role_menu SET map_menu_id=4 WHERE map_role_id=34;
--UPDATE customer_dashboard.map_role_menu SET map_menu_id=10 WHERE map_role_id=36;
--UPDATE customer_dashboard.map_role_menu SET map_menu_id=11 WHERE map_role_id=35;
--UPDATE customer_dashboard.map_role_menu SET map_menu_id=12 WHERE map_role_id=38;
--UPDATE customer_dashboard.map_role_menu SET map_menu_id=22 WHERE map_role_id=39;














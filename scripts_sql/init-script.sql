CREATE TABLE template(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   TEMPLATE_TYPE    TEXT    NOT NULL
);

CREATE TABLE menu(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   NAME_TH          TEXT    	NOT NULL,
   NAME_EN          TEXT    	NOT NULL,
   TEMPLATE_ID      INT     	NOT NULL,
   TABLE_NAME       CHAR(50)	NOT NULL
);

CREATE TABLE customer(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   TITLE_CODE       INT    		NOT NULL,
   NAME_TH          TEXT    	NOT NULL,
   NAME_EN          TEXT    	NOT NULL,
   SURNAME_TH       TEXT    	NOT NULL,
   SURNAME_EN       TEXT    	NOT NULL,
   GENDER      		CHAR(1) 	NOT NULL,
   TEL       		CHAR(50)	NOT NULL,
   EMAIL       		CHAR(50)	NOT NULL,
   BIRTHDATE       	CHAR(8)	NOT NULL
);

CREATE TABLE title(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   TITTLE_TH          TEXT    	NOT NULL,
   TITTLE_EN          TEXT    	NOT NULL
);

CREATE TABLE gender(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   GENDER_TH        TEXT    	NOT NULL,
   GENDER_EN        TEXT    	NOT NULL
);

CREATE TABLE province(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   PROVINCE_TH      CHAR(50)	NOT NULL,
   PROVINCE_EN      CHAR(50)    NOT NULL
);

CREATE TABLE district(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   DISTRICT_TH      CHAR(50)	NOT NULL,
   DISTRICT_EN      CHAR(50)    NOT NULL
);

CREATE TABLE sub_district(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   SUB_DISTRICT_TH      CHAR(50)	NOT NULL,
   SUB_DISTRICT_EN      CHAR(50)    NOT NULL
);

CREATE TABLE address(
   CUSTOMER_ID		INT 		NOT NULL,
   HOUSE_NO        	TEXT    	,
   ROAD        		TEXT    	,
   MOO        		TEXT    	,
   SOI        		TEXT    	,
   SUB_DISTRICT     INT    		,
   DISTRICT        	INT    		,
   PROVINCE        	INT    ,
   POST_CODE        CHAR(50)    
);

CREATE TABLE map_type(
   ID				SERIAL PRIMARY KEY     NOT NULL,
   MAP_TYPE      	CHAR(50)	NOT NULL
);

CREATE TABLE map_template(
   ID				SERIAL 	PRIMARY KEY     NOT NULL,
   MENU_ID        	INT    	NOT NULL,
   TABLE_NAME       TEXT    NOT NULL,
   COLUMN_MAP       TEXT    NOT NULL,
   MAP_TYPE        	INT    NOT NULL,
   DETAIL        	TEXT    NOT NULL 
);

INSERT INTO template (TEMPLATE_TYPE) 
VALUES ('text'), ('table'), ('form');

INSERT INTO menu (NAME_TH,NAME_EN,TEMPLATE_ID,TABLE_NAME) 
VALUES ('ที่อยู่','Address', 3, 'address');

INSERT INTO menu (NAME_TH,NAME_EN,TEMPLATE_ID,TABLE_NAME) 
VALUES ('ที่อยู่','Address', 3, 'address'), 
('การเงิน','Account', 3, 'account');

INSERT INTO customer (TITLE_CODE,NAME_TH,NAME_EN,SURNAME_TH,SURNAME_EN,GENDER,TEL,EMAIL,BIRTHDATE) 
VALUES (1,'แฮร์รี่ ','Hrrpy','พอตเตอร์','Potter','1','0801911150','Harry.pot@thailife.com','19800731'), 
(2,'เฮอร์ไมโอนี่ ','Hermione ','เกรนเจอร์','Granger','2','0801150191','Hermione.gra@thailife.com','19790919');

INSERT INTO title (TITTLE_TH,TITTLE_EN) 
VALUES ('นาย','Mr.'), 
('นาง','Ms.');

INSERT INTO gender (GENDER_TH,GENDER_EN) 
VALUES ('ชาย','Male'), 
('หญิง','Female'),
('ไม่ระบุ','None');

INSERT INTO district (DISTRICT_TH,DISTRICT_EN) 
VALUES ('ดินแดง','Dindang');

INSERT INTO sub_district (SUB_DISTRICT_TH,SUB_DISTRICT_EN) 
VALUES ('ดินแดง','Dindang');

INSERT INTO province (PROVINCE_TH,PROVINCE_EN) 
VALUES ('กรุงเทพมหานคร','Bangkok');

INSERT INTO address (CUSTOMER_ID,HOUSE_NO,ROAD,MOO,SOI,SUB_DISTRICT,DISTRICT,PROVINCE,POST_CODE) 
VALUES (1,'123','รัชดาภิเษก','-','-',1,1,1,'10400'), 
(2,'123','รัชดาภิเษก','-','-',1,1,1,'10400');

INSERT INTO map_type (MAP_TYPE) 
VALUES ('value'),('label');

INSERT INTO map_template (MENU_ID,TABLE_NAME,COLUMN_MAP,MAP_TYPE,DETAIL) 
VALUES (1,'address', 'HOUSE_NO', 1 , 'บ้านเลขที่'),
(1,'address', 'ROAD', 1 , 'ถนน'),
(1,'address', 'MOO', 1 , 'หมู่'),
(1,'address', 'SOI', 1 , 'ซอย'),
(1,'address', 'SUB_DISTRICT', 1 , 'ตำบล/แขวง'),
(1,'address', 'DISTRICT', 1 , 'อำเภอ/เขต'),
(1,'address', 'PROVINCE', 1 , 'จังหวัด'),
(1,'address', 'POST_CODE', 1 , 'รหัสไปรษณีย์');




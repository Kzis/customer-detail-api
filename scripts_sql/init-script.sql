
create table system_config( 
	id serial 	primary key not null,
	"type" 		text not null,
	"key" 		text not null,
	"value" 	text not null,
	active 		int not null
);

create table map_template_api(
	id serial 		primary key not null,
	menu_id 		int not null,
	sub_menu_id 	int not null,
	template_id 	int not null,
	api_key 		text not null,
	mapping			text not null
);

create table master_template(
	id serial 	primary key not null,
	"name" 		text not null
);

create table master_role( 
	id serial 	primary key not null,
	"name" 		text not null
);

create table master_menu( 
	id serial 	primary key not null,
	"name" 		text not null
);

create table master_sub_menu( 
	id serial 	primary key not null,
	"name" 		text not null
);

create table map_role_menu( 
	id serial 	primary key not null,
	role_id 	int not null,
	menu_id 	int not null,
	sub_menu_id 	int not null
);


create table "user"( 
	id 			serial 	primary key not null,
	pid 		text not null,
	"role" 		int not null,
	active 		int not null
);


INSERT INTO system_config
("type","key","value",active)
VALUES('WS','SearchByCitizenId', 'http://10.102.60.43:8080/EnquiryPartyServices/SearchByCitizenId',1) ,
('WS','SearchByCustomerName', 'http://10.102.60.43:8080/EnquiryPartyServices/SearchByCustomerName',1) ,
('WS','fake', 'https://jsonplaceholder.typicode.com/posts',1) ,
('WS','fakeUnactive', 'https://jsonplaceholder.typicode.com/posts',0) ,
('DB','host', 'localhost',0) ,
('DB','database', 'dashboard',0) ,
('DB','user', 'postgres',0) ,
('DB','password', 'admin',0) ,
('DB','port', '5432',0);

INSERT INTO map_template_api
(menu_id,sub_menu_id,template_id,api_key,mapping)
VALUES (1,1,1,'SearchByCitizenId','{
  templateId : 1,
  apiKey : "SearchByCitizenId",
  label : ["Education","Occupation","Marital"],
  mapping : {
      label : ["education","occupation","marital"]
  }
}') ,
(1,2,2,'SearchByCustomerName','{
  templateId : 1,
  apiKey : "SearchByCitizenId",
  label : ["Blood Group","Weight","Height"],
  mapping : {
      label : ["bloodGroup","weight","height"]
  }
}') ;

INSERT INTO master_template
("name")
VALUES('Template 1') , ('Template 2');

INSERT INTO master_role
("name")
VALUES('Admin') , ('ACC'), ('CC');

INSERT INTO master_menu
("name")
VALUES('Customers') , ('Policy');

INSERT INTO master_sub_menu
("name")
VALUES('Sub Customers 1') , ('Sub Customers 2') , ('Sub Policy 1') , ('Sub Policy 2');

INSERT INTO map_role_menu
(role_id,menu_id,sub_menu_id)
VALUES(1,1,1) , (1,1,2) , (1,2,1) , (1,2,2), (2,1,1) , (2,1,2) , (3,2,1) , (3,2,2);

INSERT INTO "user"
(pid,"role",active)
VALUES ('900-6468',1,1) ,
('290-0582',2,1);


-- FOR DEMO API
create table customers(
id serial primary key not null,
"name" text not null,
"surname" text not null,
"email" text not null
);

INSERT INTO customers
(name,surname,email)
VALUES('สมชาย', 'จัทน์โอชา', 'email@email.com'),('สมศรี', 'จัทน์โอชา', 'email@email.com');

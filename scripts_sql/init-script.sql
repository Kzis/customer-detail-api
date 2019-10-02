
create table system_config( 
	id serial 	primary key not null,
	"type" 		text not null,
	"key" 		text not null,
	"value" 	text not null
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

create table master_title(
	id 			serial 	primary key not null,
	"name" 		text not null
);

create table "user"( 
	id 			serial 	primary key not null,
	title 		int null,
	"name" 		text not null,
	surname 	text not null,
	tel 		text ,
	email 		text ,
	"role" 		int not null 
);

INSERT INTO public.system_config
("type","key","value")
VALUES('WS','findAllCustomers', 'http://127.0.0.1/customers') ,
('WS','findByIdCustomers', 'http://127.0.0.1/customers/:id') ,
('DB','host', 'localhost') ,
('DB','database', 'dashboard') ,
('DB','user', 'postgres') ,
('DB','password', 'admin') ,
('DB','port', '5432');

INSERT INTO public.master_role
("name")
VALUES('Admin') , ('ACC'), ('CC');

INSERT INTO public.master_menu
("name")
VALUES('Customers') , ('Policy');

INSERT INTO public.master_sub_menu
("name")
VALUES('Sub Customers 1') , ('Sub Customers 2') , ('Sub Policy 1') , ('Sub Policy 2');

INSERT INTO public.map_role_menu
(role_id,menu_id,sub_menu_id)
VALUES(1,1,1) , (1,1,2) , (1,2,1) , (1,2,2), (2,1,1) , (2,1,2) , (3,2,1) , (3,2,2);

INSERT INTO public.master_title
("name")
VALUES('นาย') , ('นาง'), ('นางสาว');

INSERT INTO public.user
(title,"name",surname,tel,email,"role")
VALUES (1,'สมชาย','นามสกุล','0801911150','somchai@thailife.com',1) ,
(2,'สมศรี','นามสกุล','0801911150','somsree@thailife.com',2);



-- FOR DEMO API

create table customers(
id serial primary key not null,
"name" text not null,
"surname" text not null,
"email" text not null
);

INSERT INTO public.customers
(name,surname,email)
VALUES('สมชาย', 'จัทน์โอชา', 'email@email.com'),('สมศรี', 'จัทน์โอชา', 'email@email.com');


create table system_config( 
	id serial 	primary key not null,
	"type" 		text not null,
	"key" 		text not null,
	"value" 	text not null,
	active 		int not null
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


INSERT INTO public.system_config
("type","key","value",active)
VALUES('WS','findAllCustomers', 'http://127.0.0.1/customers',1) ,
('WS','fake', 'https://jsonplaceholder.typicode.com/posts',1) ,
('WS','fakeUnactive', 'https://jsonplaceholder.typicode.com/posts',0) ,
('DB','host', 'localhost',0) ,
('DB','database', 'dashboard',0) ,
('DB','user', 'postgres',0) ,
('DB','password', 'admin',0) ,
('DB','port', '5432',0);

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

--INSERT INTO public.master_title
--("name")
--VALUES('นาย') , ('นาง'), ('นางสาว');

INSERT INTO public.user
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

INSERT INTO public.customers
(name,surname,email)
VALUES('สมชาย', 'จัทน์โอชา', 'email@email.com'),('สมศรี', 'จัทน์โอชา', 'email@email.com');

create table config_api( 
	id serial 	primary key not null,
	"module" 	text not null,
	url 		text not null,
	"system" 	text not null 
);

create table main_menu(
	id 			serial primary key not null,
	"name" 		char(50) not null
);


create table sub_menu(
	id 			serial primary key not null,
	"name" 		char(50) not null,
	parent 		int not null 
);

create table "user"( 
	id 			serial 	primary key not null,
	title 		int null,
	"name" 		char(50) not null,
	surname 	char(50) not null,
	tel 		char(10) not null,
	email 		char(250) not null,
	department	int not null,
	"role" 		int not null 
);

create table title(
	id 			serial 	primary key not null,
	"name" 		char(200) not null
);

create table department( 
	id 			serial primary key not null,
	"name" 		char(200) not null
);

create table role( 
	id 			serial primary key not null,
	"name" 		char(200) not null
);

create table menu_mapping( 
	id 					serial primary key not null,
	department 			int not null,
	role 				int not null,
	main_menu_access	char(200) not null,
	sub_menu_access		char(200) not null
);
	
INSERT INTO public.config_api
("module", url, "system")
VALUES('test-local', 'http://127.0.0.1/customers/:id', 'dev');


INSERT INTO public.config_api
("module", url, "system")
VALUES('test-local', 'http://127.0.0.1/customers/:id', 'dev');

INSERT INTO public.main_menu
("name")
VALUES('ที่อยู่') , ('กรมธรรม์');

INSERT INTO public.sub_menu
("name" , parent)
VALUES('ที่อยู่ปัจจุบัน', 1) ,('ที่อยู่ตามทะเบียนบ้าน',1) , ('ข้อมูลกรมธรรม์' ,2) , ('ข้อมูลการชำระเงิน' ,2);

INSERT INTO public.user
(title,"name",surname,tel,email,department,"role")
VALUES (1,'สมชาย','จันทร์โอชา','0801911150','somchai@thailife.com',1,1) ,
(2,'สมศรี','จันทร์โอชา','0801911150','somsree@thailife.com',2,2);

INSERT INTO public.title
("name")
VALUES('นาย') , ('นาง'), ('นางสาว'), ('ไม่ระบุ');

INSERT INTO public.department
("name")
VALUES('IT') , ('Claim');

INSERT INTO public.role
("name")
VALUES('Manager') , ('Deputy Manager');

INSERT INTO public.menu_mapping
(department,role,main_menu_access,sub_menu_access)
VALUES(1,1,'1','1,2') , (1,1,'2','3,4');
		

	
	
	
	
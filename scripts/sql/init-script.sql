
SET search_path=customer_dashboard;

create table "template"( 
	template_id 	serial 	primary key not null,
	employee_id	 	varchar(50) not null,
	layout_json 	text not null,
	menu_json 		text not null,
	active 			smallint not null,
	create_date 	timestamp not null,
	update_date 	timestamp not null,
	create_by 		varchar(7) not null,
	update_by 		varchar(7) not null
);

comment on column customer_dashboard."template".layout_json is 'Template card layout';
comment on column customer_dashboard."template".menu_json is 'Template menu layout';
comment on column customer_dashboard."template".employee_id is 'รหัสพนักงาน';
comment on column customer_dashboard."template".create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard."template".update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard."template".create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard."template".update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';

create table system_config( 
	system_id serial 	primary key not null,
	"type" 		varchar(20) not null,
	"key" 		varchar(50) not null,
	"value" 	varchar(200) not null,
	active 		smallint not null,
	create_date timestamp not null,
	update_date timestamp not null,
	create_by 	varchar(7) not null,
	update_by 	varchar(7) not null
);

comment on column customer_dashboard.system_config.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.system_config.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.system_config.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.system_config.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';

create table map_template_api(
	map_template_id serial 		primary key not null,
	menu_id 		smallint not null,
	sub_menu_id 	smallint not null,
	template_id 	smallint not null,
	api_key 		varchar(20) not null,
	mapping			text not null,
	create_date 	timestamp not null,
	update_date 	timestamp not null,
	create_by 		varchar(7) not null,
	update_by 		varchar(7) not null
);

comment on column customer_dashboard.map_template_api.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.map_template_api.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.map_template_api.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.map_template_api.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';

create table master_template(
	template_id serial 	primary key not null,
	"name" 		varchar(50) not null,
	create_date timestamp not null,
	update_date timestamp not null,
	create_by 	varchar(7) not null,
	update_by 	varchar(7) not null
);

comment on column customer_dashboard.master_template.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.master_template.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.master_template.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.master_template.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';


create table master_role( 
	role_id serial 	primary key not null,
	"name" 		varchar(50) not null,
	create_date timestamp not null,
	update_date timestamp not null,
	create_by 	varchar(7) not null,
	update_by 	varchar(7) not null
);

comment on column customer_dashboard.master_role.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.master_role.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.master_role.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.master_role.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';

create table master_menu( 
	menu_id serial 	primary key not null,
	"key" 		varchar(50) not null,
	"name" 		varchar(50) not null,
	create_date timestamp not null,
	update_date timestamp not null,
	create_by 	varchar(7) not null,
	update_by 	varchar(7) not null
);

comment on column customer_dashboard.master_menu.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.master_menu.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.master_menu.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.master_menu.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';

create table master_sub_menu( 
	sub_menu_id serial 	primary key not null,
	"key" 		varchar(50) not null,
	"name" 		varchar(50) not null,
	create_date timestamp not null,
	update_date timestamp not null,
	create_by 	varchar(7) not null,
	update_by 	varchar(7) not null
);

comment on column customer_dashboard.master_sub_menu.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.master_sub_menu.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.master_sub_menu.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.master_sub_menu.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';

create table map_role_menu( 
	map_role_id serial 		primary key not null,
	role_id 		smallint not null,
	menu_id 		smallint not null,
	sub_menu_id 	smallint not null,
	api_id 			smallint not null,
	create_date 	timestamp not null,
	update_date 	timestamp not null,
	create_by 		varchar(50) not null,
	update_by 		varchar(50) not null
);

comment on column customer_dashboard.map_role_menu.create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard.map_role_menu.update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard.map_role_menu.create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard.map_role_menu.update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';



create table "user"( 
	user_id 	serial 	primary key not null,
	employee_id varchar(50) not null,
	role_id 	smallint not null,
	favorite	text ,
	active 		smallint not null,
	create_date timestamp not null,
	update_date timestamp not null,
	create_by 	varchar(7) not null,
	update_by 	varchar(7) not null
);

comment on column customer_dashboard."user".create_date is 'วันที่สร้าง Record';
comment on column customer_dashboard."user".update_date is 'เวลาที่ปรับปรุงข้อมูล';
comment on column customer_dashboard."user".create_by is 'รหัสพนักงาน/ระบบงานที่เพิ่มข้อมูล';
comment on column customer_dashboard."user".update_by is 'รหัสพนักงานที่ปรับปรุงข้อมูล (ล่าสุด)';


INSERT INTO system_config
("type","key","value",active,create_date,update_date,create_by,update_by)
VALUES('WS','getAccessToken', 'http://10.102.60.112:8280/token',1,current_timestamp,current_timestamp,'name','name') ,
('WS','SearchByCitizenId', 'http://10.102.60.112:8280/interfaceCsv/rest/searchCustomerByCitizenId/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','SearchByCustomerName', 'http://10.102.60.112:8280/interfaceCsv/rest/searchCustomerByCustomerName/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','SearchByPolicyNo', 'http://10.102.60.112:8280/interfaceCsv/rest/searchCustomerByPolicyNo/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','SearchByCustomerRef', 'http://10.102.60.112:8280/interfaceCsv/rest/searchCustomerByPartyId/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupSubDistrictCode', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupSubDistrictCode/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupEducationLevel', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupEducationLevel/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupIncomeRange', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupIncomeRange/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupOccupation', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupOccupation/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupMaritalStatus', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupMaritalStatus/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupParticipantRole', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupParticipantRole/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupBloodGroup', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupBloodGroup/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupReligion', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupReligion/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupCountryCode', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupCountryCode/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','LookupAll', 'http://10.102.60.112:8280/interfaceCsv/rest/LookupAll/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','SearchPolicyByCustomerId', 'http://10.102.60.60:8080/PolicyDataService/SearchPolicyByCustomerId',1,current_timestamp,current_timestamp,'name','name') ,
('WS','PolicyPremium', 'http://10.102.60.20:8080/interfaceCsv/rest/policy/policyPremium',1,current_timestamp,current_timestamp,'name','name') ,
('WS','PolicyLoan', 'http://10.102.60.20:8080/interfaceCsv/rest/policy/policyLoan',1,current_timestamp,current_timestamp,'name','name') ,
('WS','PolicyList', 'http://10.102.60.20:8080/PolicyDataService/rest/searchPolicy/SearchPolicyByCustomerId',1,current_timestamp,current_timestamp,'name','name') ,
('WS','PolicyDisplay', 'http://10.102.60.20:8080//PolicyDataService/rest/policy/PolicyDetails',1,current_timestamp,current_timestamp,'name','name') ,
('WS','CalculateLoan', 'http://10.102.60.112:8280/interfaceCsv/rest/calculate/calculateLoan/1.0',1,current_timestamp,current_timestamp,'name','name') ,

('API','Login', 'http://206.1.2.155:3000/login',1,current_timestamp,current_timestamp,'name','name') ,
('API','StaticCard', 'http://206.1.2.155:3000/customers/getStaticCard',1,current_timestamp,current_timestamp,'name','name') ,
('API','SearchByCitizenId', 'http://206.1.2.155:3000/customers/searchByCitizenId',1,current_timestamp,current_timestamp,'name','name') ,
('API','SearchByCustomerName', 'http://206.1.2.155:3000/customers/searchByCustomerName',1,current_timestamp,current_timestamp,'name','name') ,
('API','SearchByPolicyNo', 'http://206.1.2.155:3000/customers/searchByPolicyNo',1,current_timestamp,current_timestamp,'name','name') ,
('API','BasicInfo', 'http:/206.1.2.155:3000/basic-info/getBasicInfo',1,current_timestamp,current_timestamp,'name','name') ,
('API','DemographicInfo', 'http://206.1.2.155:3000/demographic-info/getDemographicInfo',1,current_timestamp,current_timestamp,'name','name') ,

('DB','host', 'localhost',0,current_timestamp,current_timestamp,'name','name') ,
('DB','database', 'dashboard',0,current_timestamp,current_timestamp,'name','name') ,
('DB','user', 'postgres',0,current_timestamp,current_timestamp,'name','name') ,
('DB','password', 'admin',0,current_timestamp,current_timestamp,'name','name') ,
('DB','port', '5432',0,current_timestamp,current_timestamp,'name','name'),
('WS','CalculateBenefit', 'http://10.102.60.112:8280/interfaceCsv/rest/calculate/calculateBenefit/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','CalculateCancel', 'http://10.102.60.112:8280/interfaceCsv/rest/calculate/calculateCancel/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','GetLoanPremium', 'http://10.102.60.60:8080/PolicyDataService/GetLoanPremium',1,current_timestamp,current_timestamp,'name','name') ;
('WS','CalculatePolicyPremium', 'http://10.102.60.112:8280/interfaceCsv/rest/calculate/policyPremium/1.0',1,current_timestamp,current_timestamp,'name','name') ,
('WS','DisplayPolicyList', 'http://10.102.60.60:8080/PolicyDataService/DisplayPolicyList',1,current_timestamp,current_timestamp,'name','name') ,
('WS','GetClaimInquiry', 'http://10.102.60.112:8280/interfaceCsv/rest/claim/claimInquiry/1.0',1,current_timestamp,current_timestamp,'name','name'),
('WS','GetClaimDetail', 'http://10.102.60.112:8280/interfaceCsv/rest/claim/claimDetail/1.0',1,current_timestamp,current_timestamp,'name','name');


INSERT INTO system_config
(system_id,"type","key","value",active,create_date,update_date,create_by,update_by)
VALUES(999,'API','NoData', 'Nodata Mapping',1,current_timestamp,current_timestamp,'name','name');

INSERT INTO map_template_api
(menu_id,sub_menu_id,template_id,api_key,mapping,create_date,update_date,create_by,update_by)
VALUES (1,1,1,'SearchByCitizenId','{
  templateId : 1,
  apiKey : "SearchByCitizenId",
  object : {
     label : [{
				"Education" : "xxxx",
				"Occupation" : "xxxxx",
				"Marital" : "xxxxx"
			],
  }
}',current_timestamp,current_timestamp,'name','name') ,
(1,2,2,'SearchByCustomerName','{
  templateId : 1,
  apiKey : "SearchByCitizenId",
  label : ["Blood Group","Weight","Height"],
  mapping : {
      label : ["bloodGroup","weight","height"]
  }
}',current_timestamp,current_timestamp,'name','name') ;

INSERT INTO master_template
("name",create_date,update_date,create_by,update_by)
VALUES('Template 1',current_timestamp,current_timestamp,'name','name') , ('Template 2',current_timestamp,current_timestamp,'name','name');

INSERT INTO master_role
("name",create_date,update_date,create_by,update_by)
VALUES('Admin',current_timestamp,current_timestamp,'name','name') , 
('ACC',current_timestamp,current_timestamp,'name','name'), 
('CC',current_timestamp,current_timestamp,'name','name');

INSERT INTO master_menu
("key","name",create_date,update_date,create_by,update_by)
VALUES
('Customer','Customer Profile',current_timestamp,current_timestamp,'name','name') , 
('PreferedContact','Prefered Contact',current_timestamp,current_timestamp,'name','name'),
('PolicyInfo','Policy Info',current_timestamp,current_timestamp,'name','name'),
('POSInfo','POS Info',current_timestamp,current_timestamp,'name','name'),
('ClaimInfo','Claim Info',current_timestamp,current_timestamp,'name','name'),
('MemberProfile','Member Profile',current_timestamp,current_timestamp,'name','name'),
('ServiceRequest','Service Request',current_timestamp,current_timestamp,'name','name'),
('Complain','Complaint',current_timestamp,current_timestamp,'name','name'),
('MarketingInfo','Marketing Info',current_timestamp,current_timestamp,'name','name'),
('NBUWInfo','NB/UNW Info',current_timestamp,current_timestamp,'name','name'),
('CMS','CMS(Admin)',current_timestamp,current_timestamp,'name','name'),
('KnowledgeBase','KnowledgeBase',current_timestamp,current_timestamp,'name','name');

INSERT INTO master_sub_menu
("key","name",create_date,update_date,create_by,update_by)
VALUES
('PersonalInformation','Personal Information',current_timestamp,current_timestamp,'name','name'),
('PolicySummary','PolicySummary',current_timestamp,current_timestamp,'name','name'),
('PolicyList','PolicyList',current_timestamp,current_timestamp,'name','name'),
('NextPremiumSummary','NextPremiumSummary',current_timestamp,current_timestamp,'name','name'),
('ChangeListPOS','รายการเปลี่ยนแปลง(POS)',current_timestamp,current_timestamp,'name','name') , 
('PolicyBenefits','ผลประโยชน์ตามกรมธรรม์ ',current_timestamp,current_timestamp,'name','name') , 
('TotalLoan','เงินกู้รวม',current_timestamp,current_timestamp,'name','name') , 
-- ('ClaimList6Lastest','รายการเคลมย้อนหลัง 6 รายการล่าสุด',current_timestamp,current_timestamp,'name','name') , 
('ClaimList','ค้นหารายการเคลม ',current_timestamp,current_timestamp,'name','name') , 
('CoverageDetail','ข้อมูลความคุ้มครอง',current_timestamp,current_timestamp,'name','name') , 
('MemberInfo','Member Info.',current_timestamp,current_timestamp,'name','name') , 
('InfiniteClub','Infinite Club',current_timestamp,current_timestamp,'name','name') , 
('SumPremiumList ',' ลิสต์ใบเสร็จที่คิดคะแนน',current_timestamp,current_timestamp,'name','name') , 
('SumPremiumDetail ','รายละเอียดใบเสร็จที่คิดคะแนน',current_timestamp,current_timestamp,'name','name') , 
('HistoryTierList ','ลิสต์ประวัติการปรับขึ้นลง Tier',current_timestamp,current_timestamp,'name','name') , 
('ServiceRequestList ','Service Request List',current_timestamp,current_timestamp,'name','name') , 
('ServiceRequestDetails ','Service Request Details',current_timestamp,current_timestamp,'name','name') , 
('ComplaintList ','Complaint List',current_timestamp,current_timestamp,'name','name') , 
('ComplaintDetails ','Complaint Details',current_timestamp,current_timestamp,'name','name') ,
('MarketingInfo ','Marketing Info.',current_timestamp,current_timestamp,'name','name') ,  
('NewCaseApprovalStatus','New Case Approval Status',current_timestamp,current_timestamp,'name','name'),
('UserManagement','User Management',current_timestamp,current_timestamp,'name','name'),
('RoleManagement','Role Management',current_timestamp,current_timestamp,'name','name'),
('CardManagement','Card Management',current_timestamp,current_timestamp,'name','name'),
('KMBranch','ข้อมูลสาขา',current_timestamp,current_timestamp,'name','name'),
('KMHospitalBranch','รพ.เครือข่าย',current_timestamp,current_timestamp,'name','name');




INSERT INTO map_role_menu
(role_id,menu_id,sub_menu_id,api_id,create_date,update_date,create_by,update_by)
VALUES
(1,1,1,999,current_timestamp,current_timestamp,'name','name') , 
(1,3,2,999,current_timestamp,current_timestamp,'name','name') ,
(1,3,3,999,current_timestamp,current_timestamp,'name','name') ,
(1,3,4,999,current_timestamp,current_timestamp,'name','name') ,
(1,4,5,999,current_timestamp,current_timestamp,'name','name') ,
(1,4,6,999,current_timestamp,current_timestamp,'name','name') ,
(1,4,7,999,current_timestamp,current_timestamp,'name','name') ,
-- (1,5,8,999,current_timestamp,current_timestamp,'name','name') ,
(1,5,9,999,current_timestamp,current_timestamp,'name','name') ,
(1,5,10,999,current_timestamp,current_timestamp,'name','name') ,
(1,6,11,999,current_timestamp,current_timestamp,'name','name') ,
(1,6,12,999,current_timestamp,current_timestamp,'name','name') ,
-- (1,6,13,999,current_timestamp,current_timestamp,'name','name') ,
-- (1,6,14,999,current_timestamp,current_timestamp,'name','name') ,
(1,6,15,999,current_timestamp,current_timestamp,'name','name') ,
(1,7,16,999,current_timestamp,current_timestamp,'name','name') ,
-- (1,7,17,999,current_timestamp,current_timestamp,'name','name') ,
(1,8,18,999,current_timestamp,current_timestamp,'name','name') ,
-- (1,8,19,999,current_timestamp,current_timestamp,'name','name') ,
(1,9,20,999,current_timestamp,current_timestamp,'name','name') ,
(1,10,21,999,current_timestamp,current_timestamp,'name','name') ,
(1,11,22,999,current_timestamp,current_timestamp,'name','name') ,
(1,11,23,999,current_timestamp,current_timestamp,'name','name') ,
(1,11,24,999,current_timestamp,current_timestamp,'name','name') ,
(1,12,25,999,current_timestamp,current_timestamp,'name','name') ,
(1,12,26,999,current_timestamp,current_timestamp,'name','name') ,

(2,1,1,999,current_timestamp,current_timestamp,'name','name') , 
(2,1,2,999,current_timestamp,current_timestamp,'name','name');

INSERT INTO "user"
(employee_id,role_id,favorite,active,create_date,update_date,create_by,update_by)
VALUES 
('900-6468',1,'json',1,current_timestamp,current_timestamp,'name','name') ,
('290-0582',2,'json',1,current_timestamp,current_timestamp,'name','name'),
('900-4439',1,'json',1,current_timestamp,current_timestamp,'name','name'),
('900-5496',1,'json',1,current_timestamp,current_timestamp,'name','name');


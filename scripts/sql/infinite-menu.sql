-- insert master menu
INSERT INTO customer_dashboard.master_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('Infinite Admin', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'ai', 'ai', 'InfiniteAdmin');

-- insert sub menu
INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('เพิ่มข้อมูลอนุโลม', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'insertComplyReceipt');

INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('ข้้อมูลการอนุโลม', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'getComplyReceipt');


INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('เพิ่มข้อมููลการจัดส่งของนัล', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'insertPrivilegeTracking');


INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('ข้อมูลการส่งของงกำนัล', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'getPrivilegeTracking');


INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('getYeraPrivileage', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'getYeraPrivileage');

INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('ข้อมูลเตรียมส่งของกำนัล', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'getPreparePrivileage');

INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('Update ข้อมูลการส่งของกำนัล', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'updateTrackingEMS ');

INSERT INTO customer_dashboard.master_sub_menu
("name", create_date, update_date, create_by, update_by, "key")
VALUES('Update  ข้อมูลการส่งของกำนัล สถานะ', '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 'updateTrackingStatus ');

-- map admin with menu
INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 28, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 29, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 30, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 31, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 32, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 33, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 34, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);

INSERT INTO customer_dashboard.map_role_menu
(role_id, menu_id, sub_menu_id, create_date, update_date, create_by, update_by, is_admin)
VALUES(1, 26, 35, '2019-11-25 17:09:51.292', '2019-11-25 17:09:51.292', 'name', 'name', 1);


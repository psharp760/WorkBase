use workbase;
select * from users;
create table timesheet(start_time time, end_time time, user_id int);
create table calendar(calendar_name char(10), title char(10), info char(20), user_id int, event_id int);
create table reminder(reminder_id int, schedule_time time);
create table tbl_event(event_id int, event_name char(10), start_time time, end_time time);
drop table timesheet;
create table timesheet(employee_name char(20), start_time time, end_time time, user_id int);
create table tbl_event(event_id int, event_name char(10), start_time time, end_time time);
drop table users;
create table users(user_id int, first_name char(10), last_name char(10), email char(20), pass_word char(10));
alter table timesheet add constraint user_id foreign key (user_id) references users(user_id);
create table reminds(reminder_id int, event_id int);
alter table calendar add constraint calendar_user_id foreign key (user_id) references users(user_id);
select * from calendar;
alter table calendar add constraint calendar_event_id foreign key (event_id) references tbl_event(event_id);
alter table reminds add constraint reminds_remider_id foreign key (reminder_id) references reminder(reminder_id);

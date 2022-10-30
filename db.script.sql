
---------------------- Database Creation ---------------------------------

drop database marketing;

create database marketing;

use marketing;

create table users
(
 id int primary key not null auto_increment,
 name nvarchar(200) not null,
 password nvarchar(50) not null
);

create table company
(
  id int primary key not null auto_increment,
  name nvarchar(500) not null
);

create table file
(
	id int primary key not null auto_increment,
    name nvarchar(200) not null,
    file_data longblob not null,
    file_date int not null,
    deal int not null,
    company_id int not null,
    foreign key (company_id) references company(id) 
);

----------------------------------------------------------------------------
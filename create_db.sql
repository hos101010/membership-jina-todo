drop table if exists todo_order;
drop table if exists todo;
drop table if exists category;
drop table if exists admitted_user;
drop table if exists user_log;
drop table if exists user;
create table user (
    user_id varchar(45) not null,
    user_pw varchar(45) not null,
    is_admin boolean,
    primary key(user_id)
);

insert into user values
('master', 'aaaa', true),
('user1', 'aaaa', false),
('user2', 'aaaa', false),
('user3', 'aaaa', false);

create table category (
    category_id int not null,
    category_name varchar(45),
    category_owner varchar(45) not null,
    primary key(category_id),
    foreign key(category_owner) references user(user_id)
    on delete cascade on update cascade
);

insert into category values
(1, 'todo', 'user1'),
(2, 'doing', 'user1'),
(3, 'done', 'user1'),
(4, 'todo', 'user2'),
(5, 'doing', 'user2'),
(6, 'done', 'user2');

create table todo (
    todo_id int not null,
    content text,
    attached varchar(45),
    category int not null,
    primary key(todo_id),
    foreign key(category) references category(category_id)
    on delete cascade on update cascade
);

insert into todo values
(1, 'set DB', null, 3),
(2, 'front-end', null, 2),
(3, 'back-end', null, 2),
(4, 'upload on cloud', null, 1);

create table admitted_user (
    user varchar(45) not null,
    admitted varchar(45) not null,
    primary key(user, admitted),
    foreign key(user)
    references user(user_id)
    on delete cascade on update cascade,
    foreign key(admitted)
    references user(user_id)
    on delete cascade on update cascade
);

insert into admitted_user values
('user1', 'user2'),
('user1', 'user3');

create table user_log (
    user varchar(45) not null,
    logno int not null,
    content text,
    primary key(user, logno),
    foreign key(user)
    references user(user_id)
    on delete cascade on update cascade
);

insert into user_log values
('user1', 1, 'create category 1'),
('user1', 2, 'create todo 1');

create table todo_order (
    todo_id int not null,
    previous_id int,
    next_id int,
    primary key(todo_id),
    foreign key(todo_id)
    references todo(todo_id)
    on delete cascade on update cascade
);

insert into todo_order values
(1, null, null),
(2, null, 3),
(3, 2, null),
(4, null, null);
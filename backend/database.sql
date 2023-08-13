drop table products;
drop table coupons;
drop table orders;
drop table order_items;
drop table zipcodes;
drop table users;

create table products (
    id integer,
    description text,
    price numeric,
    width integer,
    height integer,
    length integer,
    weight numeric
);

create table coupons (
    code text,
    percentage numeric,
    expire_date timestamp
);

create table orders (
    id text,
    code text,
    cpf text,
    total numeric,
    freight numeric
);

create table order_items (
    id_order text,
    id_product integer,
    price numeric,
    quantity integer
);

create table zipcodes(
    code text,
    lat numeric,
    long numeric
);

create table users(
    email text,
    password text,
    password_type text,
    salt text
);

insert into products(id, description, price, width, height, length, weight) values (1, 'product - 1', 100, 10, 10, 10, 10);
insert into products(id, description, price, width, height, length, weight) values (2, 'product - 2', 100, 10, 10, 10, 10);
insert into products(id, description, price, width, height, length, weight) values (3, 'product - 3', 100, 10, 10, 10, 10);
insert into products(id, description, price, width, height, length, weight) values (4, 'product - 4', 9, 10, 10, 10, 10);
insert into products(id, description, price, width, height, length, weight) values (5, 'product - 5', 9, 10, 10, 10, 10);
insert into products(id, description, price, width, height, length, weight) values (6, 'product - 5', 9, 10, 10, 10, 10);

insert into coupons(code, percentage, expire_date) values ('VALE20', 20, '2023-10-01T10:00:00');
insert into coupons(code, percentage, expire_date) values ('VALE10', 10, '2022-10-01T10:00:00');

insert into zipcodes(code, lat, long) values ('22060030', -27.5945, -48.5477);
insert into zipcodes(code, lat, long) values ('88015600', -22.9129, -43.2003);
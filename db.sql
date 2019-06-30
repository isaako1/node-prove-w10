CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(250),
    owner_name VARCHAR(250)
);
INSERT INTO restaurants (
    name,
    owner_name)
 VALUES (
     'TACOS EL PAISA',
     'EL Señor de los Tacos'
 );

 INSERT INTO restaurants (
    name,
    owner_name)
 VALUES (
     'EL AMIGO',
     'Daniel Vargas'
 );

 INSERT INTO restaurants (
    name,
    owner_name)
 VALUES (
     'LAS ARRACHERAS',
     'Gerardo Sanchez'
 );

 INSERT INTO restaurants (
    name,
    owner_name)
 VALUES (
     'EL PEJCADO',
     'Antonio Villanueva'
 );
 INSERT INTO restaurants (
    name,
    owner_name)
 VALUES (
     'lA PAPA GUAPA',
     'Paulina Cortes'
 );
 INSERT INTO restaurants (
    name,
    owner_name)
 VALUES (
     'LOS BISQUETS DE OBREGON',
     'Fransisco Barrientos'
 );






 psql -Upostgres
 CREATE DATABASE prove10
 \c restaurants
 GRANT SELECT, INSERT, UPDATE ON restaurants TO isaac;
 GRANT USAGE, SELECT ON SEQUENCE restaurants_id_seq TO isaac;
 git push master master
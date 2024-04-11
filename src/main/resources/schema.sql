CREATE TABLE User (
    userid INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid)
);

CREATE TABLE Ranking (
    /* UserID skal være foreign key, MÅ OGSÅ HA HJELPE TABELL MELLOM RANKING OG USER */

);
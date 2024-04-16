CREATE TABLE User (
    userid INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid)
);

/* Når en manga er lagt til i en read liste så blir den lagt til i data basen?? */
CREATE TABLE Manga(
    mangaid INT AUTO_INCREMENT NOT NULL,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (mangaid)
);

/* Helping table between User and Manga */
CREATE TABLE Read(
    userid INT NOT NULL,
    mangaid INT NOT NULL,
    rating FLOAT NOT NULL,
    FOREIGN KEY (userid) REFERENCES User(userid),
    FOREIGN KEY (mangaid) REFERENCES Manga(mangaid),
    PRIMARY KEY (userid, mangaid)
);
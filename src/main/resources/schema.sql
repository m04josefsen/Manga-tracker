CREATE TABLE User (
    userid INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (userid)
);

/* Når en manga er lagt til i en read liste så blir den lagt til i data basen?? */
CREATE TABLE Manga(
    mangaid INT AUTO_INCREMENT NOT NULL
);

/* Helping table between User and Manga */
CREATE TABLE Read(
    userid INT NOT NULL,
    mangaid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES User(userid),
    FOREIGN KEY (mangaid) REFERENCES Manga(mangaid)
);
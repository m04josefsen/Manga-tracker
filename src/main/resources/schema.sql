CREATE TABLE User (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE
);

CREATE TABLE Manga(
                      mangaid INT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      releaseYear INT NOT NULL
);

/* Helping table between User and Manga */
CREATE TABLE Read(
                     userid INT NOT NULL,
                     mangaid INT NOT NULL,
                     rating DECIMAL(3,2) NOT NULL,
                     FOREIGN KEY (userid) REFERENCES User(userid),
                     FOREIGN KEY (mangaid) REFERENCES Manga(mangaid),
                     PRIMARY KEY (userid, mangaid)
);
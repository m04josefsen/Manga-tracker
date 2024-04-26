# Manga Tracker

Manga Tracker is a web application built with Spring Boot that allows users to track and manage their manga collections. Users can log in, add mangas to their list, and categorize them as read or unread. Additionally, users can rate the mangas they've read.
Features

    User Authentication: Users can sign up for an account and log in to access the application's features.
    Add Mangas: Users can search for mangas and add them to their collection.
    Categorize Mangas: Added mangas are categorized as read or unread based on whether they have a rating.
    Rate Mangas: Users can rate the mangas they've read.
    View Collection: Users can view their collection of mangas, categorized as read and unread.

Technologies Used

    Spring Boot: Backend framework for building the application.
    Spring JDBC: For database operations.
    MySQL: Database management system for storing user and manga data.
    HTML/CSS/JavaScript: Frontend technologies for building the user interface.
    Bootstrap: CSS framework for styling the application.

Endpoints
Account Endpoints

    POST /addAccount: Add a new account.
    GET /getAccount: Retrieve account information.

Manga Endpoints

    POST /addManga: Add a new manga to the collection.
    GET /getMangas: Retrieve a list of all mangas.
    GET /getMangaWithID: Retrieve a manga by its ID.

Read Endpoints

    POST /addRead: Add a manga to the read list.
    GET /getReadMangas: Retrieve a list of mangas marked as read.
    GET /getUnreadMangas: Retrieve a list of mangas marked as unread.
    POST /addRating: Add or update the rating for a manga.

Getting Started

To run the application locally:

    Clone this repository.
    Set up a MySQL database and update the application.properties file with your database configuration.
    Run the application using Maven: mvn spring-boot:run.
    Access the application at http://localhost:8080.

The main page
![The main page](/src/main/resources/screenshots/z-mainPage.png?raw=true)

The search page
![The search page](/src/main/resources/screenshots/z-searchPage.png?raw=true)

The read mangas
![The read mangas](/src/main/resources/screenshots/z-readMangas.png?raw=true)

The unread mangas
![The unread mangas](/src/main/resources/screenshots/z-unreadMangas.png?raw=true)

The signup page
![The signup page](/src/main/resources/screenshots/z-signUpPage.png?raw=true)
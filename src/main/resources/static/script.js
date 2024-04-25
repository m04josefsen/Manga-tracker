let inputCounter = 0;

/* Fills the preview on index.html with mangas */
$( document ).ready(function() {
    userInHeader();
    getMangaForSlideshow();
    previewList();
    listRead();
});

function search() {
    $("#preview").empty();
    $("#manySearch").empty();

    const title = $("#searchInput").val();

    const baseURL = "https://api.mangadex.org";

    const searchURL = `${baseURL}/manga?title=${encodeURIComponent(title)}&includes[]=cover_art`;

    $.get(searchURL, function (response) {
        //Response is what comes up when searching for "title", multiple different additions can come up
        //console.log(response);

        if (response.total === 0) {
            console.log("Search is empty");
        } else {
            console.log("Response is OK");
            const mangaData = response.data;

            //Makes it so previous searches are removed
            $("#results").html("");

            //Lists the different mangas separately when searching for "title"
            mangaData.forEach(manga => {
                //console.log(manga);

                //Gets the url for the image, this method also calls formatData() which formats data and puts in on screen
                getImage(manga);
            });
        }
    });
}

function getImage(manga) {
    const coverRelationships = manga.relationships.find((relationship) => relationship.type = "cover_art" && relationship.attributes && relationship.attributes.fileName);
    const coverFilename = coverRelationships.attributes.fileName;
    const coverID = coverRelationships.id;
    const mangaId = manga.id;

    $.get(`https://api.mangadex.org/cover/${coverID}`, function(coverResponse) {
        if(coverResponse.result === "ok") {
            //console.log("Cover filename: " + coverFilename);

            const coverURL = `https://uploads.mangadex.org/covers/${mangaId}/${coverFilename}`;
            //console.log("Cover URL: " + coverURL);

            formatData(manga, coverURL);
        }
        else {
            console.error("Error fetching cover details:" + coverResponse.errors);
        }
    });
}

function formatData(manga, coverURL) {
    const inManga = {
        title : manga.attributes.title.en,
        releaseYear : Number(manga.attributes.year),
        imageURL : coverURL,
        description : manga.attributes.description.en
    };

    let print = "<div class='manga-entry'>";
    print += "<div class='image-container'><img src='" + coverURL + "'></div>";
    print += "<h2 class='manga-title'>" + manga.attributes.title.en +  "</h2>";
    print += "<button class='add-to-read-btn' onclick='addRead("+JSON.stringify(inManga)+")'>Add to read</button>";
    print += "<p class='manga-description'>" + manga.attributes.description.en + "</p>";
    print += "</div>";

    $("#results").append(print);
}


function registerAccount() {
    const account = {
        firstname : $("#firstnameInput").val(),
        lastname : $("#lastnameInput").val(),
        email : $("#emailInput").val()
    };

    inputCounter = 0;

    stringValidation(account.firstname, "firstname");
    stringValidation(account.lastname, "lastname");
    emailValidation(account.email);

    if(inputCounter === 3) {
        $.post("addAccount", account, function() {
            console.log("Account added successfully");


            document.getElementById("firstnameInput").value = "";
            document.getElementById("lastnameInput").value = "";
            document.getElementById("emailInput").value = "";

            document.getElementById("emailError").innerHTML = "";
            document.getElementById("firstnameError").innerHTML = "";
            document.getElementById("lastnameError").innerHTML = "";



            inputCounter = 0;
        }).fail(function(xhr, status, error) {
            console.error("Error adding account:", error);
        });
    }
}

function stringValidation(string, type) {
    let namePattern = /^[a-zA-ZæøåÆØÅ]+$/;

    if(!namePattern.test(string)) {
        let out = "You have to write a valid name";
        out = out.fontcolor("RED");
        document.getElementById(type + "Error").innerHTML = out;
    }
    else {
        inputCounter++;
    }
}

function emailValidation(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)) {
        let out = "You have to write a valid email";
        out = out.fontcolor("RED");
        document.getElementById("emailError").innerHTML = out;
    }
    else {
        inputCounter++;
    }
}

function addRead(inManga) {
    $.post("addManga", inManga, async function () {
        console.log("Manga added successfully");

        //Gets the account object and the manga list from get request
        const account = await getAccount();
        const mangas = await getMangas();

        for(m of mangas) {
            if(m.title === inManga.title && m.year === inManga.year) {
                const read = {
                    userid : account.userid,
                    mangaid : m.mangaid,
                    rating : 0.1
                };

                $.post("addRead", read, function () {
                    console.log("Manga added to read successfully");
                    //listRead();

                }).fail(function(xhr, status, error) {
                    console.log("Error adding manga to read:", error);
                })
            }
        }

    }).fail(function (xhr, status, error) {
        console.error("Error adding Manga:", error);
    });
}

function listRead() {
    getRead().then(function (readList) {
        for(read of readList) {
            console.log(read.mangaid)
            getMangaWithID(read.mangaid).then(function (manga) {
                if(read.rating != null) {
                    console.log(manga)
                    let print = "<div class='manga-entry'>";
                    print += "<div class='image-container'><img src='" + manga.imageURL + "'></div>";
                    print += "<h2 class='manga-title'>" + manga.title + " " + manga.releaseYear + "</h2>";
                    print += "<div class='manga-rating'>Rating: " + read.rating + "</div>";
                    print += "<p class='manga-description'>" + manga.description + "</p>";
                    print += "</div>";

                    $("#readMangas").append(print);
                }
                else {
                    let print = "<div class='manga-entry'>";
                    print += "<div class='image-container'><img src='" + manga.imageURL + "'></div>";
                    print += "<h2 class='manga-title'>" + manga.title + " " + manga.releaseYear + "</h2>";
                    print += "<div class='manga-rating'>Rating: 0" + "</div>";
                    print += "<p class='manga-description'>" + manga.description + "</p>";
                    print += "</div>";

                    $("#unreadMangas").append(print);
                }
            });
        }
    })
}

async function getAccount() {
    const account = await $.get("getAccount");
    return account;
}

async function getMangas() {
    const mangas = await $.get("getMangas");
    return mangas;
}

async function getRead() {
    const readList = await $.get("getRead");
    return readList;
}

async function getMangaWithID(id) {
    const url = "getMangaWithID?id=" + id;

    const manga = await $.get(url);
    return manga;
}

async function userInHeader() {
    const account = await getAccount();

    let ut = account.firstname + " " + account.lastname + "<br>";
    ut += account.email;

    $(".user-info").html(ut);
}

function showSlideshow(manga1, coverURL1) {
    /*
    const inManga = {
        title : manga.attributes.title.en,
        imageURL : coverURL
    }
       print += "<div class='image-container'><img src='" + coverURL + "'></div>";
     */

    let print = "<div class='container'>";
    print += "<div class='row justify-content-center'>";
    print += "<div class='col-md-6'>";
    print += "<div id='carouselIndicators' class='carousel slide' data-bs-ride='carousel'>";
    print += "<ol class='carousel-indicators'>";
    print += "<li data-bs-target='#carouselIndicators' data-bs-slide-to='0' class='active'></li>";
    print += "<li data-bs-target='#carouselIndicators' data-bs-slide-to='1'></li>";
    print += "</ol>";
    print += "<div class='carousel-inner'>";
    //TODO: Data-bs-interval funker ikke, det er BS
    print += "<div class='carousel-item active' data-bs-interval='1000'>";
    print += "<img class='d-block w-100' src='" + coverURL1 + "' alt='test'>";
    print += "</div>";
    print += "<div class='carousel-item' data-bs-interval='1000'>";
    print += "<img class='d-block w-100' src='manga2.jpg' alt='test'>";
    print += "</div>";
    print += "</div>";
    print += "</div>";
    print += "</div>";
    print += "</div>";
    print += "</div>";

    $("#preview").html(print);


    // Trigger the carousel to start sliding
    //$('.carousel').carousel();
}

function getMangaForSlideshow() {
    const title1 = "Frieren";
    const title2 = "Solo Leveling";

    const baseURL = "https://api.mangadex.org";

    const searchURL1 = `${baseURL}/manga?title=${encodeURIComponent(title1)}&includes[]=cover_art`;
    const searchURL2 = `${baseURL}/manga?title=${encodeURIComponent(title2)}&includes[]=cover_art`;

    $.get(searchURL1, function (response) {
        const manga = response.data[0];

        const coverRelationships = manga.relationships.find((relationship) => relationship.type = "cover_art" && relationship.attributes && relationship.attributes.fileName);
        const coverFilename = coverRelationships.attributes.fileName;
        const coverID = coverRelationships.id;
        const mangaId = manga.id;

        $.get(`https://api.mangadex.org/cover/${coverID}`, function(coverResponse) {
            if(coverResponse.result === "ok") {
                const coverURL = `https://uploads.mangadex.org/covers/${mangaId}/${coverFilename}`;

                showSlideshow(manga, coverURL);
            }
            else {
                console.error("Error fetching cover details:" + coverResponse.errors);
            }
        });
    });
}

function previewList() {
    const title = "";

    const baseURL = "https://api.mangadex.org";

    const searchURL = `${baseURL}/manga?title=${encodeURIComponent(title)}&includes[]=cover_art`;

    $.get(searchURL, function (response) {
        const mangaData = response.data;

            //Lists the different mangas separately when searching for "title"
            mangaData.forEach(manga => {
                formatPreviewData(manga);
            });
    });
}

function formatPreviewData(manga) {
    const coverRelationships = manga.relationships.find((relationship) => relationship.type = "cover_art" && relationship.attributes && relationship.attributes.fileName);
    const coverFilename = coverRelationships.attributes.fileName;
    const coverID = coverRelationships.id;
    const mangaId = manga.id;

    $.get(`https://api.mangadex.org/cover/${coverID}`, function(coverResponse) {
        const coverURL = `https://uploads.mangadex.org/covers/${mangaId}/${coverFilename}`;

        let print = "<div class='manga-entry'>";
        print += "<div class='image-container'><img src='" + coverURL + "'></div>";
        print += "<h2 class='manga-title'>" + manga.attributes.title.en +  "</h2>";
        print += "<p class='manga-description'>" + manga.attributes.description.en + "</p>";
        print += "</div>";

        $("#manySearch").append(print);
    });
}
let inputCounter = 0;

function search() {

    const title = $("#searchInput").val();

    const baseURL = "https://api.mangadex.org";

    const searchURL = `${baseURL}/manga?title=${encodeURIComponent(title)}&includes[]=cover_art`;

    $.get(searchURL, function (response) {
        //Response is what comes up when searching for "title", multiple different additions can come up
        console.log(response);

        if (response.total === 0) {
            console.log("Search is empty");
        } else {
            console.log("Response is OK");
            const mangaData = response.data;

            //Makes it so previous searches are removed
            $("#results").html("");

            //Lists the different mangas separately when searching for "title"
            mangaData.forEach(manga => {
                console.log(manga);

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
            console.log("Cover filename: " + coverFilename);

            const coverURL = `https://uploads.mangadex.org/covers/${mangaId}/${coverFilename}`;
            console.log("Cover URL: " + coverURL);

            formatData(manga, coverURL);
        }
        else {
            console.error("Error fetching cover details:" + coverResponse.errors);
        }
    });
}

function formatData(manga, coverURL) {
    let print = "<div class='manga-entry'>";
    print += "<div class='image-container'><img src='" + coverURL + "'></div>";
    print += "<h2>" + manga.attributes.title.en +  "</h2>";
    print += "<button>Add to read</button>";
    print += "<p>" + manga.attributes.description.en + "</p>";
    print += "</div>";
    $("#results").append(print);
}

function registerUser() {
    const user = {
        firstname : $("#firstnameInput").val(),
        lastname : $("#lastnameInput").val(),
        email : $("#emailInput").val()
    };

    inputCounter = 0;

    stringValidation(user.firstname, "firstname");
    stringValidation(user.lastname, "lastname");
    emailValidation(user.email);

    if(inputCounter === 3) {
        $.post("addUser", user, function() {

        });

        document.getElementById("firstnameInput").value = "";
        document.getElementById("lastnameInput").value = "";
        document.getElementById("emailInput").value = "";

        document.getElementById("emailError").innerHTML = "";
        document.getElementById("firstnameError").innerHTML = "";
        document.getElementById("lastnameError").innerHTML = "";
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
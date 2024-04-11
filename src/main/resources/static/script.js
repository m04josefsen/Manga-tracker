function search() {
    const title = $("#searchInput").val();
    const baseURL = "https://api.mangadex.org";

    const searchURL = `${baseURL}/manga?title=${encodeURIComponent(title)}`;


    $.get(searchURL, function (response) {
        //Response is what comes up when searching for "title", multiple different additions can come up
        console.log(response);
        console.log(title);

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
                // Goes into the manga, attributes, descripton and selects the English version from the object
                console.log(manga.attributes.description.en);
                console.log(manga.attributes.title.en);
                //$("#results").append(manga.attributes.description.en + "<br><br>");
                formatData(manga)
            });
        }
    });
}

function formatData(manga) {
    //img først egentlig
    let print = "<h2>" + manga.attributes.title.en +  "</h2>";
    print += "<button>Add to read</button>";
    print += "<p>" + manga.attributes.description.en + "</p>";
    $("#results").append(print);
}
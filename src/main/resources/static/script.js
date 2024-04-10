const title = "Solo Leveling"; //Skal være get element by id
const baseURL = "https://api.mangadex.org";

const searchURL = `${baseURL}/manga?title=${encodeURIComponent(title)}`;


$.get(searchURL, function(response) {
    console.log(response);

    if(!response.result) {
        console.log("Response is not OK");
    }
    else {
        console.log("Response is OK");
        const mangaData = response.data;
        mangaData.forEach(manga => {
            console.log(manga);
        });
    }

});
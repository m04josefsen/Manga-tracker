package org.bookmangatracker;

public class Manga {
    private int mangaid;
    private String title;
    private int releaseYear;
    private String imageURL;
    private String description;

    public Manga() {
    }

    public Manga(int mangaid, String title, int releaseYear, String imageURL, String description) {
        this.mangaid = mangaid;
        this.title = title;
        this.releaseYear = releaseYear;
        this.imageURL = imageURL;
        this.description = description;
    }

    public int getMangaid() {
        return mangaid;
    }

    public void setMangaid(int mangaid) {
        this.mangaid = mangaid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}


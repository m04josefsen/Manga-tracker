package org.bookmangatracker;

public class Manga {
    private int mangaid;
    private String title;
    private int releaseYear;

    public Manga(){}

    public Manga(int mangaid, String title, int releaseYear) {
        this.mangaid = mangaid;
        this.title = title;
        this.releaseYear = releaseYear;
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
}

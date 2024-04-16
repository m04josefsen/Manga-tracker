package org.bookmangatracker;

public class Read {
    private int userid;
    private int mangaid;
    private double rating;

    public Read(){}

    public Read(int userid, int mangaid, double rating) {
        this.userid = userid;
        this.mangaid = mangaid;
        this.rating = rating;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getMangaid() {
        return mangaid;
    }

    public void setMangaid(int mangaid) {
        this.mangaid = mangaid;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}

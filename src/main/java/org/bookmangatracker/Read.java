package org.bookmangatracker;

public class Read {
    private int userid;
    private int mangaid;

    public Read(){}

    public Read(int userid, int mangaid) {
        this.userid = userid;
        this.mangaid = mangaid;
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
}

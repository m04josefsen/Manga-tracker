package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    AccountRepository accountRep;

    @Autowired
    MangaRepository mangaRep;

    @Autowired
    ReadRepository readRep;

    //Account
    @PostMapping("/addAccount")
    public void addAccount(Account account) {
        accountRep.addAccount(account);
    }

    @GetMapping("/getAccount")
    public Account getAccount() {
        return accountRep.getAccount();
    }

    /*
    @GetMapping("/getAccount")
    public List<Account> getAccount() {
        return accountRep.getAccount();
    }
     */

    //Manga
    @PostMapping("/addManga")
    public void addManga(Manga manga) {
        mangaRep.addManga(manga);
    }

    @GetMapping("/getMangas")
    public List<Manga> getMangas() {
        return mangaRep.getMangas();
    }

    @GetMapping("/getMangaWithID")
    public Manga getMangaID(Integer id) {
        return mangaRep.getMangaWithID(id);
    }

    //Read
    @PostMapping("/addRead")
    public void addRead(Read read) {
        readRep.addRead(read);
    }

    /*
    @GetMapping("/getRead")
    public List<Read> getRead() {
        return readRep.getRead();
    }
     */

    @GetMapping("/getReadMangas")
    public List<Read> getReadMangas() {
        return readRep.getReadMangas();
    }

    @GetMapping("/getUnreadMangas")
    public List<Read> getUnreadMangas() {
        return readRep.getUnreadMangas();
    }

    @PostMapping("/addRating")
    public void addRating(int mangaid, double rating) {
        readRep.addRating(mangaid, rating);
    }

}

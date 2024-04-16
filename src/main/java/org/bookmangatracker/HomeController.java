package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    UserRepository userRep;

    @Autowired
    MangaRepository mangaRep;

    @Autowired
    ReadRepository readRep;

    //User
    @PostMapping("/addUser")
    public void addUser(User user) {
        userRep.addUser(user);
    }

    @GetMapping("getUser")
    public List<User> getUser() {
        return userRep.getUser();
    }

    //Manga
    @PostMapping("/addManga")
    public void addManga(Manga manga) {
        mangaRep.addManga(manga);
    }

    @GetMapping("/getManga")
    public List<Manga> getMangas() {
        return mangaRep.getMangas();
    }

    //Read
    @PostMapping("/addRead")
    public void addRead(Read read) {
        readRep.addRead(read);
    }

}

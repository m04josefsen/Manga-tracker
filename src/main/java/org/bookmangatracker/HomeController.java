package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    UserRepository repository;

    @PostMapping("/addUser")
    public void addUser(User user) {
        repository.addUser(user);
    }

    @PostMapping("/addRead")
    public void addRead(Read read) {

    }

}

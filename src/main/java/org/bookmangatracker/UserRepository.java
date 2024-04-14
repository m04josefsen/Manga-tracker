package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate db;

    public void addUser(User user) {
        String sql = "INSERT INTO User (firstname, lastname, email) VALUES (?, ?, ?)";
        db.update(sql, user.getFirstName(), user.getLastName(), user.getEmail());
    }

}

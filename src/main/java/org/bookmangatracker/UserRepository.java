package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate db;

    public void addUser(User user) {
        String sql = "INSERT INTO User (firstname, lastname, email) VALUES (?, ?, ?)";
        db.update(sql, user.getFirstName(), user.getLastName(), user.getEmail());
    }

    public List<User> getUser() {
        String sql = "SELECT * FROM User LIMIT 1";
        List<User> userList = db.query(sql, new BeanPropertyRowMapper(User.class));
        return userList;
    }

}

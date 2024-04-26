package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AccountRepository {

    @Autowired
    private JdbcTemplate db;

    public void addAccount(Account account) {
        String sql = "INSERT INTO Account (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
        db.update(sql, account.getFirstname(), account.getLastname(), account.getEmail(), account.getPassword());
    }

    public Account getAccount() {
        String sql = "SELECT * FROM Account LIMIT 1";
        Account account = db.queryForObject(sql, new BeanPropertyRowMapper<>(Account.class));
        return account;
    }
}

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
        String sql = "INSERT INTO Account (firstname, lastname, email) VALUES (?, ?, ?)";
        db.update(sql, account.getFirstname(), account.getLastname(), account.getEmail());
    }

    public List<Account> getAccount() {
        String sql = "SELECT * FROM Account LIMIT 1";
        List<Account> accountList = db.query(sql, new BeanPropertyRowMapper(Account.class));
        return accountList;
    }

}

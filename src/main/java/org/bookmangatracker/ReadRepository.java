package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Repository
public class ReadRepository {

    @Autowired
    JdbcTemplate db;

    public void addRead(Read read) {
        String sql = "INSERT INTO Read (userid, mangaid, rating) VALUES (?, ?, ?)";
        db.update(sql, read.getUserid(), read.getMangaid(), read.getRating());
    }

    public List<Read> getRead() {
        String sql = "SELECT * FROM Read";
        List<Read> list = db.query(sql, new BeanPropertyRowMapper(Read.class));
        return list;
    }
}

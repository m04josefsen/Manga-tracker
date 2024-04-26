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
        db.update(sql, read.getUserid(), read.getMangaid(), 0);
    }

    public List<Read> getReadMangas() {
        String sql = "SELECT * FROM Read WHERE rating > 0 ORDER BY rating DESC";
        List<Read> list = db.query(sql, new BeanPropertyRowMapper<>(Read.class));
        return list;
    }

    public List<Read> getUnreadMangas() {
        String sql = "SELECT * FROM Read WHERE rating = 0";
        List<Read> list = db.query(sql, new BeanPropertyRowMapper<>(Read.class));
        return list;
    }

    public void addRating(int mangaid, double rating) {
        String sql = "UPDATE Read SET rating = ? WHERE mangaid = ?";
        db.update(sql, rating, mangaid);
    }
}

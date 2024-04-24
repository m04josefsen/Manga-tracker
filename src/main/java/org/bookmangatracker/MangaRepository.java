package org.bookmangatracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MangaRepository {

    @Autowired
    JdbcTemplate db;

    public void addManga(Manga manga) {
        String sql = "INSERT INTO Manga (title, releaseYear) VALUES (?, ?)";
        db.update(sql, manga.getTitle(), manga.getReleaseYear());
    }

    public List<Manga> getMangas() {
        String sql = "SELECT * FROM Manga";
        List<Manga> mangaList = db.query(sql, new BeanPropertyRowMapper(Manga.class));
        return mangaList;
    }

    public Manga getMangaWithID(int id) {
        String sql = "SELECT * FROM Manga WHERE id = ?";
        return db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Manga.class), id);
    }
}

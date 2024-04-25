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
        String sql = "INSERT INTO Manga (title, releaseYear, imageURL, description) VALUES (?, ?, ?, ?)";
        db.update(sql, manga.getTitle(), manga.getReleaseYear(), manga.getImageURL(), manga.getDescription());
    }

    public List<Manga> getMangas() {
        String sql = "SELECT * FROM Manga";
        List<Manga> mangaList = db.query(sql, new BeanPropertyRowMapper(Manga.class));
        return mangaList;
    }

    public Manga getMangaWithID(Integer id) {
        String sql = "SELECT * FROM Manga WHERE mangaid = ?";
        return db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Manga.class), id);
    }
}

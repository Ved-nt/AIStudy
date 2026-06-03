package com.vedant.aisuite.repository;

import java.util.*;
import com.vedant.aisuite.entity.Note;
import com.vedant.aisuite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUser(User user);

    List<Note> findTop5ByUserOrderByCreatedAtDesc(User user);
}
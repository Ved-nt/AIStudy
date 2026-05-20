package com.vedant.aisuite.repository;

import java.util.*;
import com.vedant.aisuite.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findTop5ByOrderByCreatedAtDesc();
}
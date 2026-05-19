package com.vedant.aisuite.repository;

import com.vedant.aisuite.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
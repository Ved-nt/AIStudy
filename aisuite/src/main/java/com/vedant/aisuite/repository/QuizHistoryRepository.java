package com.vedant.aisuite.repository;

import com.vedant.aisuite.entity.QuizHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface QuizHistoryRepository extends JpaRepository<QuizHistory, Long> {

    List<QuizHistory> findTop5ByOrderByCreatedAtDesc();
}
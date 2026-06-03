package com.vedant.aisuite.repository;

import com.vedant.aisuite.entity.QuizHistory;
import com.vedant.aisuite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizHistoryRepository extends JpaRepository<QuizHistory, Long> {

    List<QuizHistory> findByUser(User user);

    List<QuizHistory> findTop5ByUserOrderByCreatedAtDesc(User user);
}
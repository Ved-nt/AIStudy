package com.vedant.aisuite.repository;

import com.vedant.aisuite.entity.Quiz;
import com.vedant.aisuite.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository
        extends JpaRepository<Quiz, String> {

    List<Quiz> findByUser(User user);
}
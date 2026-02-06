package com.moneymanager.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moneymanager.model.Home;

@Repository
public interface HomeRepository extends MongoRepository<Home, String> {

    List<Home> findTop5ByOrderByDateDesc();

    List<Home> findByType(String type);
}

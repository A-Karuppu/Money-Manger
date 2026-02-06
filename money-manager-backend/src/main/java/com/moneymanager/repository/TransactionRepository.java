package com.moneymanager.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moneymanager.model.Transaction;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {

    List<Transaction> findByType(String type);

    List<Transaction> findAllByOrderByDateTimeDesc();
}

package com.moneymanager.repository;

import com.moneymanager.model.TransactionView;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionViewRepository
        extends MongoRepository<TransactionView, String> {

    List<TransactionView> findByUserId(String userId);

    List<TransactionView> findByUserIdAndDateBetween(
            String userId,
            LocalDate from,
            LocalDate to
    );
}

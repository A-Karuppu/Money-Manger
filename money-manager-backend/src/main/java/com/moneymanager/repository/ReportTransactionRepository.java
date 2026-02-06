package com.moneymanager.repository;

import com.moneymanager.model.ReportTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportTransactionRepository
        extends MongoRepository<ReportTransaction, String> {
}

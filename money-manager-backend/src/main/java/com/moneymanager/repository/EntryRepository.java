package com.moneymanager.repository;

import com.moneymanager.model.FinancialEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EntryRepository extends MongoRepository<FinancialEntry, String> {

    List<FinancialEntry> findByUserIdOrderByCreatedAtDesc(String userId);
}


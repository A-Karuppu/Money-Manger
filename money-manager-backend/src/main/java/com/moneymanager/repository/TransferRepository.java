package com.moneymanager.repository;

import com.moneymanager.model.Transfer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransferRepository extends MongoRepository<Transfer, String> {
}

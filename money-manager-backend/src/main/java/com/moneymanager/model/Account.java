package com.moneymanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "accounts")
public class Account {

    @Id
    private String id;

    private String accountName;     // Main Checking, Savings, Credit Card
    private String accountType;     // CHECKING, SAVINGS, CREDIT
    private BigDecimal balance;

    private LocalDateTime createdAt = LocalDateTime.now();
}

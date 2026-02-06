package com.moneymanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "financial_entries")
public class FinancialEntry {

    @Id
    private String id;

    private String userId;

    private String type; // INCOME or EXPENSE

    private Double amount;

    private String description;

    private String category;

    private String division;

    private String accountId;

    private LocalDate date;

    private String time;

    private LocalDateTime createdAt = LocalDateTime.now();
}

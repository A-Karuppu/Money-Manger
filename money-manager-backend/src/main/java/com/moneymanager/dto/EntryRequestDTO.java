package com.moneymanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EntryRequestDTO {

    private String userId;
    private String type;      // INCOME / EXPENSE
    private Double amount;
    private LocalDate date;
    private String time;
    private String description;
    private String category;
    private String division;
    private String accountId;
}


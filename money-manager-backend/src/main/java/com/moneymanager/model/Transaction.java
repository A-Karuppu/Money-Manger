package com.moneymanager.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    private LocalDateTime dateTime;
    private String description;
    private String category;
    private String division;     // Personal / Office
    private String account;      // Bank / Credit Card
    private double amount;       // + income / - expense
    private String type;         // INCOME / EXPENSE

    public Transaction() {}

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDivision() { return division; }
    public void setDivision(String division) { this.division = division; }

    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}

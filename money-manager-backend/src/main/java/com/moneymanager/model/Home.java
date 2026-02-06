package com.moneymanager.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transactions")
public class Home {

    @Id
    private String id;
    private String title;
    private String category;
    private double amount;
    private String type; // INCOME / EXPENSE
    private LocalDateTime date;

    public Home() {}

    public Home(String title, String category, double amount, String type, LocalDateTime date) {
        this.title = title;
        this.category = category;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
}

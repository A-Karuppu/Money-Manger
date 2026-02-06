package com.moneymanager.dto;

import java.time.LocalDate;

public class ReportTransactionDTO {

    private String type;
    private double amount;
    private String category;
    private LocalDate date;

    // ---- getters (IMPORTANT) ----
    public String getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public LocalDate getDate() {
        return date;
    }

    // ---- setters ----
    public void setType(String type) {
        this.type = type;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

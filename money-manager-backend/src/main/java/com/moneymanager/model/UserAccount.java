package com.moneymanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "accounts")
public class UserAccount {

    @Id
    private String id;

    private String name;            // HDFC, Cash Wallet, Credit Card
    private String type;            // BANK, CASH, WALLET, CARD
    private double openingBalance;
    private boolean enabled = true;

    // getters & setters
}

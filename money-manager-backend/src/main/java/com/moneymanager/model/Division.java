package com.moneymanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "divisions")
public class Division {

    @Id
    private String id;
    private String name;

    // getters & setters
}

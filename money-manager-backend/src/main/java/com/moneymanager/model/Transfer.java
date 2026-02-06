package com.moneymanager.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Document(collection = "transfers")
public class Transfer {

    @Id
    private String id;

    private String fromAccountId;
    private String toAccountId;

    private BigDecimal amount;
    private LocalDate transferDate;
    private String note;
}

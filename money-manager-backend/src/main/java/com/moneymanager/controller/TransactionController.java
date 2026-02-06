package com.moneymanager.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.moneymanager.model.Transaction;
import com.moneymanager.service.TransactionService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // ➕ Add Transaction
    @PostMapping("/add")
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    // 📄 Get Transactions Page Data
    @GetMapping("/overview")
    public Map<String, Object> getTransactionsOverview() {

        Map<String, Object> response = new HashMap<>();

        response.put("totalIncome", transactionService.getTotalIncome());
        response.put("totalExpense", transactionService.getTotalExpense());
        response.put("netBalance", transactionService.getNetBalance());
        response.put("transactions", transactionService.getAllTransactions());

        return response;
    }
}

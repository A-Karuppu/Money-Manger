package com.moneymanager.service;

import java.util.List;
import java.util.Map;

import com.moneymanager.model.Transaction;

public interface TransactionService {

    Transaction addTransaction(Transaction transaction);

    List<Transaction> getAllTransactions();

    double getTotalIncome();

    double getTotalExpense();

    double getNetBalance();
}

package com.moneymanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneymanager.model.Transaction;
import com.moneymanager.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByDateTimeDesc();
    }

    @Override
    public double getTotalIncome() {
        return transactionRepository.findByType("INCOME")
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    @Override
    public double getTotalExpense() {
        return transactionRepository.findByType("EXPENSE")
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    @Override
    public double getNetBalance() {
        return getTotalIncome() + getTotalExpense(); // expense is negative
    }
}

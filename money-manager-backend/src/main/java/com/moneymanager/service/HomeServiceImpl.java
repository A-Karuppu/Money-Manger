package com.moneymanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneymanager.model.Home;
import com.moneymanager.repository.HomeRepository;

@Service
public class HomeServiceImpl implements HomeService {

    @Autowired
    private HomeRepository transactionRepository;

    @Override
    public double getTotalBalance() {
        return transactionRepository.findAll()
                .stream()
                .mapToDouble(Home::getAmount)
                .sum();
    }

    @Override
    public double getMonthlyIncome() {
        return transactionRepository.findByType("INCOME")
                .stream()
                .mapToDouble(Home::getAmount)
                .sum();
    }

    @Override
    public double getMonthlyExpense() {
        return transactionRepository.findByType("EXPENSE")
                .stream()
                .mapToDouble(Home::getAmount)
                .sum();
    }

    @Override
    public List<Home> getRecentTransactions() {
        return transactionRepository.findTop5ByOrderByDateDesc();
    }
}

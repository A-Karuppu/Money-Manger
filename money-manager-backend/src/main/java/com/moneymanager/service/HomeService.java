package com.moneymanager.service;

import java.util.List;

import com.moneymanager.model.Home;

public interface HomeService {

    double getTotalBalance();

    double getMonthlyIncome();

    double getMonthlyExpense();

    List<Home> getRecentTransactions();
}

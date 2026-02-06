package com.moneymanager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moneymanager.service.HomeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/home")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {

        Map<String, Object> response = new HashMap<>();

        response.put("totalBalance", homeService.getTotalBalance());
        response.put("monthlyIncome", homeService.getMonthlyIncome());
        response.put("monthlyExpense", homeService.getMonthlyExpense());
        response.put("recentTransactions", homeService.getRecentTransactions());

        return response;
    }
}

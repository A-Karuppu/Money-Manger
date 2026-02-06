package com.moneymanager.controller;

import com.moneymanager.dto.ReportTransactionDTO;
import com.moneymanager.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Summary cards
    @GetMapping("/summary")
    public Map<String, Double> getSummary(
            @RequestParam String userId,
            @RequestParam String from,
            @RequestParam String to) {

        return dashboardService.getSummary(
                userId,
                LocalDate.parse(from),
                LocalDate.parse(to)
        );
    }

    // Recent transactions
    @GetMapping("/transactions")
    public List<ReportTransactionDTO> getTransactions(
            @RequestParam String userId,
            @RequestParam String from,
            @RequestParam String to) {

        return dashboardService.getTransactions(
                userId,
                LocalDate.parse(from),
                LocalDate.parse(to)
        );
    }
}

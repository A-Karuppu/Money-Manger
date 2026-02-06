package com.moneymanager.service;

import com.moneymanager.dto.ReportTransactionDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DashboardService {

    Map<String, Double> getSummary(
            String userId,
            LocalDate from,
            LocalDate to
    );

    List<ReportTransactionDTO> getTransactions(
            String userId,
            LocalDate from,
            LocalDate to
    );
}

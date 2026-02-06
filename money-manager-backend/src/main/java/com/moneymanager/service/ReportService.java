package com.moneymanager.service;

import com.moneymanager.dto.ReportTransactionDTO;

import java.util.List;
import java.util.Map;

public interface ReportService {

    List<ReportTransactionDTO> getAllTransactions();

    Map<String, Double> getSummary();
}

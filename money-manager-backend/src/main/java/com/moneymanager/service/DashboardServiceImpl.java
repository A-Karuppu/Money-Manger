package com.moneymanager.service;

import com.moneymanager.dto.ReportTransactionDTO;
import com.moneymanager.model.TransactionView;
import com.moneymanager.repository.TransactionViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private TransactionViewRepository repository;

    @Override
    public Map<String, Double> getSummary(
            String userId,
            LocalDate from,
            LocalDate to) {

        List<TransactionView> list =
                repository.findByUserIdAndDateBetween(userId, from, to);

        double income = list.stream()
                .filter(t -> "INCOME".equalsIgnoreCase(t.getType()))
                .mapToDouble(TransactionView::getAmount)
                .sum();

        double expense = list.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .mapToDouble(TransactionView::getAmount)
                .sum();

        Map<String, Double> result = new HashMap<>();
        result.put("income", income);
        result.put("expense", expense);
        result.put("balance", income - expense);

        return result;
    }

    @Override
    public List<ReportTransactionDTO> getTransactions(
            String userId,
            LocalDate from,
            LocalDate to) {

        return repository
                .findByUserIdAndDateBetween(userId, from, to)
                .stream()
                .map(t -> {
                    ReportTransactionDTO dto = new ReportTransactionDTO();
                    dto.setDate(t.getDate());
                    dto.setCategory(t.getCategory());
                    dto.setType(t.getType());
                    dto.setAmount(t.getAmount());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

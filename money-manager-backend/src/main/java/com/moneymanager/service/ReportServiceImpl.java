package com.moneymanager.service;

import com.moneymanager.dto.ReportTransactionDTO;
import com.moneymanager.model.ReportTransaction;
import com.moneymanager.repository.ReportTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportTransactionRepository repository;

    @Override
    public List<ReportTransactionDTO> getAllTransactions() {
        List<ReportTransaction> list = repository.findAll();
        List<ReportTransactionDTO> dtoList = new ArrayList<>();

        for (ReportTransaction t : list) {
            ReportTransactionDTO dto = new ReportTransactionDTO();
            dto.setType(t.getType());
            dto.setAmount(t.getAmount());
            dto.setCategory(t.getCategory());
            dto.setDate(t.getDate());
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public Map<String, Double> getSummary() {
        double income = 0;
        double expense = 0;

        for (ReportTransactionDTO dto : getAllTransactions()) {
            if ("INCOME".equalsIgnoreCase(dto.getType())) {
                income += dto.getAmount();
            } else if ("EXPENSE".equalsIgnoreCase(dto.getType())) {
                expense += dto.getAmount();
            }
        }

        Map<String, Double> map = new HashMap<>();
        map.put("income", income);
        map.put("expense", expense);
        map.put("balance", income - expense);
        return map;
    }
}

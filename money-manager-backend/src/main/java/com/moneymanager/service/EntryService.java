package com.moneymanager.service;

import com.moneymanager.dto.EntryRequestDTO;
import com.moneymanager.model.FinancialEntry;
import com.moneymanager.repository.EntryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntryService {

    private final EntryRepository entryRepository;

    public EntryService(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    // Save new transaction
    public FinancialEntry addEntry(EntryRequestDTO dto) {

        FinancialEntry entry = new FinancialEntry();

        entry.setUserId(dto.getUserId());
        entry.setType(dto.getType());
        entry.setAmount(dto.getAmount());
        entry.setDate(dto.getDate());
        entry.setTime(dto.getTime());
        entry.setDescription(dto.getDescription());
        entry.setCategory(dto.getCategory());
        entry.setDivision(dto.getDivision());
        entry.setAccountId(dto.getAccountId());

        return entryRepository.save(entry);
    }

    // Get all transactions (Transactions page)
    public List<FinancialEntry> getEntriesByUser(String userId) {
        return entryRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}

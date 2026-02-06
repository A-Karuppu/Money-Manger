package com.moneymanager.controller;

import com.moneymanager.dto.EntryRequestDTO;
import com.moneymanager.model.FinancialEntry;
import com.moneymanager.service.EntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "*")
public class EntryController {

    private final EntryService entryService;

    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }

    // ADD TRANSACTION
    @PostMapping
    public ResponseEntity<FinancialEntry> addEntry(
            @RequestBody EntryRequestDTO dto) {

        return ResponseEntity.ok(entryService.addEntry(dto));
    }

    // GET TRANSACTIONS PAGE
    @GetMapping
    public ResponseEntity<List<FinancialEntry>> getEntries(
            @RequestParam String userId) {

        return ResponseEntity.ok(entryService.getEntriesByUser(userId));
    }
}

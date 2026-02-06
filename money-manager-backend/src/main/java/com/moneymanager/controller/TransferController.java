package com.moneymanager.controller;

import com.moneymanager.model.Transfer;
import com.moneymanager.service.TransferService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/transfers")

public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping
    public Transfer transferFunds(@RequestBody Transfer transfer) {
        return transferService.transferFunds(transfer);
    }
}

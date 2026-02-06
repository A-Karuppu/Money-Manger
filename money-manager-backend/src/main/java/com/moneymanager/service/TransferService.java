package com.moneymanager.service;

import com.moneymanager.model.Account;
import com.moneymanager.model.Transfer;
import com.moneymanager.repository.AccountRepository;
import com.moneymanager.repository.TransferRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class TransferService {

    private final AccountRepository accountRepository;
    private final TransferRepository transferRepository;

    public TransferService(AccountRepository accountRepository,
                           TransferRepository transferRepository) {
        this.accountRepository = accountRepository;
        this.transferRepository = transferRepository;
    }

    public Transfer transferFunds(Transfer transfer) {

        Account fromAccount = accountRepository.findById(transfer.getFromAccountId())
                .orElseThrow(() -> new RuntimeException("From account not found"));

        Account toAccount = accountRepository.findById(transfer.getToAccountId())
                .orElseThrow(() -> new RuntimeException("To account not found"));

        BigDecimal amount = transfer.getAmount();

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        // Debit & Credit
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        return transferRepository.save(transfer);
    }
}

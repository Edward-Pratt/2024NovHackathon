package org.novhackathon.smartbudget.controller;

import model.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // CORS for the React frontend
public class TransactionController {

    // In-memory storage for simplicity
    private final List<Transaction> transactions = new ArrayList<>();

    @PostMapping("/addTransaction")
    public String addTransaction(@RequestBody Transaction transaction) {
        transactions.add(transaction);
        return "Transaction added successfully!";
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return transactions;
    }
    @GetMapping("/transactionsTotal")
    public double totalTransactions() {
        double total = 0;
        for (Transaction transaction : transactions) {
            total += transaction.getAmount();
        }
        return total;

    }



}

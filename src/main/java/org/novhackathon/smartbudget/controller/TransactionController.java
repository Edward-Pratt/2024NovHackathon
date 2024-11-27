package org.novhackathon.smartbudget.controller;

import model.Transaction;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
}

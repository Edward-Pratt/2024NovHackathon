package org.novhackathon.smartbudget.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.Savings;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // CORS for the React frontend
public class SavingsController {

    // In-memory storage for simplicity
    private final List<Savings> savings = new ArrayList<>();

    @PostMapping("/addSavings")
    public String addSavings(@RequestBody Savings saving) {
        savings.add(saving);
        return "Savings added successfully!";
    }

    @GetMapping("/savings")
    public List<Savings> getSavings() {
        return savings;
    }
}

package org.novhackathon.smartbudget.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class BudgetController {
    @GetMapping("/greeting")
    public String greeting() {
        return "Welcome to Smart Budget!";
    }
}

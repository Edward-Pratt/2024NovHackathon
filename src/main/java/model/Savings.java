package model;

public class Savings {
    private String name;
    private double amount;
    private String comment;

    //Constructor
    public Savings(String name, double amount, String comment) {
        this.name = name;
        this.amount = amount;
        this.comment = comment;
    }

    // Getters and Setters
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
    
    public String getComment() {
        return this.comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}

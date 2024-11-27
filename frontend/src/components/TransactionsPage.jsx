import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import "../App.css"

function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = () => {
        console.log("Fetching transactions...");
        fetch("http://localhost:8080/api/transactions")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched transactions:", data);
                setTransactions(data); // Set the state to trigger re-render
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
            });
    };

    useEffect(() => {
        console.log("Component mounted, calling fetchTransactions");
        fetchTransactions();
    }, []);

    const addTransaction = (newTransaction) => {
        console.log("Adding transaction:", newTransaction);
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

        fetch("http://localhost:8080/api/addTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
            .then((response) => response.text())
            .then(() => {
                fetchTransactions(); // Re-fetch transactions after adding
            })
            .catch((error) => {
                console.error("Error adding transaction:", error);
                setTransactions((prevTransactions) =>
                    prevTransactions.filter((t) => t !== newTransaction)
                );
            });
    };

    return (
        <div>
            <h1>Smart Budget</h1>
            <div className="image-container">
                <img src="/images/Smart Budget Image.jpeg" width="250" height="200" alt="Logo" className="centered-image"/>
                <style>

                </style>
            </div>
            <TransactionForm onAddTransaction={addTransaction}/>
            <h2>Transactions</h2>
            {/* Force re-render by updating the key */}
            <TransactionTable key={transactions.length} transactions={transactions}/>
        </div>
    );
}

export default TransactionsPage;
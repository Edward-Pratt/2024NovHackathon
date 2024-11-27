import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

function App() {
    const [transactions, setTransactions] = useState([]);

    // Function to fetch transactions from the backend
    const fetchTransactions = () => {
        fetch("http://localhost:8080/api/transactions")
            .then((response) => response.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error("Error fetching transactions:", error));
    };

    // Call fetchTransactions initially to load the table
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Function to handle adding a new transaction
    const addTransaction = (newTransaction) => {
        fetch("http://localhost:8080/api/addTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                // After adding a transaction, re-fetch the updated list of transactions
                fetchTransactions();
            })
            .catch((error) => console.error("Error adding transaction:", error));
    };

    return (
        <div>
            <h1>Smart Budget</h1>
            <TransactionForm onAddTransaction={addTransaction} />
            <h2>Transactions</h2>
            <TransactionTable transactions={transactions} />
        </div>
    );
}

export default App;

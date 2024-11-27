import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import "../App.css";

function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);

    // Calculate total whenever transactions change
    useEffect(() => {
        const calculateTotal = () => {
            const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
            setTotal(totalAmount);
        };

        calculateTotal();  // Recalculate total every time transactions change
    }, [transactions]);

    // Fetch all transactions from backend
    const fetchTransactions = () => {
        fetch("http://localhost:8080/api/transactions")
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data);  // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
            });
    };

    useEffect(() => {
        fetchTransactions();  // Call once when the component mounts
    }, []);

    // Add a new transaction and update both the backend and local state
    const addTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

        // Send the new transaction to the backend
        fetch("http://localhost:8080/api/addTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
            .then((response) => response.text())
            .then(() => {
                // Optionally, re-fetch transactions, or rely on local state updates
                // fetchTransactions();
            })
            .catch((error) => {
                console.error("Error adding transaction:", error);
                setTransactions((prevTransactions) =>
                    prevTransactions.filter((t) => t !== newTransaction)  // Rollback if error occurs
                );
            });
    };

    return (
        <div>
            <h1>Transactions</h1>

            <TransactionForm onAddTransaction={addTransaction} />
            <h2>Transactions</h2>
            {/* Force re-render by updating the key */}
            <TransactionTable key={transactions.length} transactions={transactions} />
            <div className="total">
                <h3>Total: £{total.toFixed(2)}</h3>
            </div>
        </div>
    );
}

export default TransactionsPage;

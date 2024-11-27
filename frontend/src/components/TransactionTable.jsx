import React, { useState, useEffect } from "react";

function TransactionTable() {
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from the backend API
    useEffect(() => {
        fetch("http://localhost:8080/api/transactions")
            .then((response) => response.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error("Error fetching transactions:", error));
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction, index) => (
                <tr key={index}>
                    <td>{transaction.name}</td>
                    <td>{transaction.amount}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TransactionTable;

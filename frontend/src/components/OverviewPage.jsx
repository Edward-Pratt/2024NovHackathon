// OverviewPage.js
import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable'; // Import the shared TransactionTable component

function OverviewPage() {
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

    return (
        <div>
            <h1>Overview of Your Budget</h1>
            <h2>Transaction Overview</h2>

            <TransactionTable transactions={transactions} />  {/* Render the shared table here */}

            <h3>Total: £{total.toFixed(2)}</h3>  {/* Show total at the bottom */}
        </div>
    );
}

export default OverviewPage;

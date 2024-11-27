import React from "react";

function TransactionTable({ transactions }) {
    console.log("Transactions in table:", transactions); // Log to confirm data passed correctly

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {transactions.length === 0 ? (
                <tr>
                    <td colSpan="2">No transactions available</td>
                </tr>
            ) : (
                transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{transaction.name}</td>
                        <td>£{transaction.amount.toFixed(2)}</td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
}

export default TransactionTable;

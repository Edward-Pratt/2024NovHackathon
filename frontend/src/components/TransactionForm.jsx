import React, { useState } from "react";

function TransactionForm({ onAddTransaction }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !amount) {
            alert("Please fill out all fields");
            return;
        }

        const transaction = {
            name,
            amount: parseFloat(amount),
        };

        // Call the parent callback function to add the transaction
        onAddTransaction(transaction);

        // Clear the form fields
        setName("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Amount: </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Transaction</button>
        </form>
    );
}

export default TransactionForm;

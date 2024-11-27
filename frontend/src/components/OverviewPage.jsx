import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable'; // Import the shared TransactionTable component
import SavingsTable from './SavingsTable'; // Import SavingsTable component to show savings

function OverviewPage() {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [savingsList, setSavingsList] = useState([]); // State for savings data
    const [savingsTotal, setSavingsTotal] = useState(0); // State for total savings amount
    const [monthsToSave, setMonthsToSave] = useState([]); // State for months required to save for each goal
    const [totalMonths, setTotalMonths] = useState(0); // State for the total months for all goals

    // Calculate total income whenever transactions change
    useEffect(() => {
        const calculateTotalIncome = () => {
            const income = transactions
                .filter((transaction) => transaction.amount) // Filter only positive transactions
                .reduce((acc, transaction) => acc + transaction.amount, 0);
            setTotalIncome(income);
        };

        calculateTotalIncome(); // Recalculate total income whenever transactions change
    }, [transactions]);

    // Calculate total savings whenever the savings list changes
    useEffect(() => {
        const calculateSavingsTotal = () => {
            const totalSavings = savingsList.reduce((acc, saving) => acc + saving.amount, 0);
            setSavingsTotal(totalSavings);
        };

        calculateSavingsTotal(); // Recalculate savings total whenever savingsList changes
    }, [savingsList]);

    // Calculate months required for each saving goal
    useEffect(() => {
        if (totalIncome > 0) {
            const months = savingsList.map((saving) =>
                (saving.amount / totalIncome).toFixed(2)
            );
            setMonthsToSave(months);

            // Calculate total months for all goals
            const total = months.reduce((acc, month) => acc + parseFloat(month), 0);
            setTotalMonths(total.toFixed(2));
        } else {
            setMonthsToSave([]); // Reset if no income
            setTotalMonths(0);
        }
    }, [savingsList, totalIncome]);

    // Fetch all transactions from backend
    const fetchTransactions = () => {
        fetch("http://localhost:8080/api/transactions")
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
            });
    };

    // Fetch all savings from backend
    const fetchSavings = () => {
        fetch("http://localhost:8080/api/savings")
            .then((response) => response.json())
            .then((data) => {
                setSavingsList(data); // Update state with fetched savings
            })
            .catch((error) => {
                console.error("Error fetching savings:", error);
            });
    };

    useEffect(() => {
        fetchTransactions(); // Fetch transactions when the component mounts
        fetchSavings(); // Fetch savings when the component mounts
    }, []);

    return (
        <div>
            <h1>Overview of Your Budget</h1>
            <h2>Transaction Overview</h2>

            {/* Render the shared table for transactions */}
            <TransactionTable transactions={transactions} />

            <h3>Total Income: £{totalIncome.toFixed(2)}</h3> {/* Show total income at the bottom */}

            <h2>Savings Overview</h2>

            {/* Render the savings table */}
            <SavingsTable savingsList={savingsList} />

            <h3>Total Savings: £{savingsTotal.toFixed(2)}</h3> {/* Show total savings at the bottom */}

            <h2>Months to Save for Each Goal</h2>
            <table>
                <thead>
                <tr>
                    <th>Savings Goal</th>
                    <th>Amount</th>
                    <th>Months to Save</th>
                </tr>
                </thead>
                <tbody>
                {savingsList.map((saving, index) => (
                    <tr key={index}>
                        <td>{saving.name}</td>
                        <td>£{saving.amount.toFixed(2)}</td>
                        <td>
                            {totalIncome > 0
                                ? monthsToSave[index]
                                : "N/A (No Income)"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Total Months Display */}
            <h3>
                Total Months to Save for All Goals:{" "}
                {totalIncome > 0 ? totalMonths : "N/A (No Income)"}
            </h3>
        </div>
    );
}

export default OverviewPage;

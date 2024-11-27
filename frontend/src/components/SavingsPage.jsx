import React, { useState, useEffect } from "react";
import SavingsTable from "./SavingsTable";
import "../App.css";

function SavingsPage() {
    const [savingsList, setSavingsList] = useState([]); // Stores the list of savings
    const [savingsName, setSavingsName] = useState(""); // For the savings name input
    const [monthlySavings, setMonthlySavings] = useState(""); // For the monthly savings input
    const [comments, setComments] = useState(""); // For the comments input

    // Fetch savings from backend when the component mounts
    const fetchSavings = () => {
        fetch("http://localhost:8080/api/savings")
            .then((response) => response.json())
            .then((data) => {
                setSavingsList(data); // Update the state with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching savings:", error);
                alert("Could not fetch savings from the server.");
            });
    };

    // useEffect to load savings from the backend
    useEffect(() => {
        fetchSavings();
    }, []);

    // Handle adding a new savings entry
    const addSavings = () => {
        if (!savingsName || !monthlySavings) {
            alert("Please provide a name and an amount for the savings.");
            return;
        }

        // Create a new savings object
        const newSavings = {
            name: savingsName,
            amount: parseFloat(monthlySavings).toFixed(2), // Ensure two decimal places
            comment: comments || "No comments", // Default to "No comments" if left blank
        };

        // Optimistically add to local state
        setSavingsList((prevSavings) => [...prevSavings, newSavings]);

        // Send the savings data to the backend
        fetch("http://localhost:8080/api/addSavings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSavings),
        })
            .then((response) => response.text())
            .then((message) => {
                console.log(message); // Optional: Log the response from the server
            })
            .catch((error) => {
                console.error("Error adding savings:", error);
                // Roll back the change locally if there is an error
                setSavingsList((prevSavings) =>
                    prevSavings.filter((savings) => savings !== newSavings)
                );
            });

        // Clear the input fields
        setSavingsName("");
        setMonthlySavings("");
        setComments("");
    };

    return (
        <div>
            <h1>Savings Tracker</h1>

            {/* Form to add savings */}
            <div>
                <label htmlFor="savings-name">Savings Name:</label>
                <input
                    id="savings-name"
                    type="text"
                    value={savingsName}
                    onChange={(e) => setSavingsName(e.target.value)}
                    placeholder="e.g. Emergency Fund"
                />
            </div>
            <div>
                <label htmlFor="monthly-savings">Monthly Savings:</label>
                <input
                    id="monthly-savings"
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(e.target.value)}
                    placeholder="e.g. 500"
                />
            </div>
            <div>
                <label htmlFor="comments">Comments:</label>
                <textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="What is this savings for?"
                />
            </div>
            <button onClick={addSavings}>Add Savings</button>

            {/* Render the savings table */}
            <SavingsTable savingsList={savingsList} />
        </div>
    );
}

export default SavingsPage;

import React, { useState } from 'react';

function SavingsPage() {
    // State to store the amount the user wants to save per month
    const [monthlySavings, setMonthlySavings] = useState('');
    // State to store the name of the savings
    const [savingsName, setSavingsName] = useState('');
    // State to store the user's comments about the savings
    const [comments, setComments] = useState('');

    // Handle changes in the monthly savings input field
    const handleSavingsChange = (event) => {
        setMonthlySavings(event.target.value);
    };

    // Handle changes in the savings name input field
    const handleSavingsNameChange = (event) => {
        setSavingsName(event.target.value);
    };

    // Handle changes in the comments input field
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    return (
        <div className="savings-container">
            <h1>Savings Calculator</h1>

            {/* Input box for the name of the savings */}
            <div>
                <label htmlFor="savings-name">Savings Name:</label>
                <input
                    id="savings-name"
                    type="text"
                    value={savingsName}
                    onChange={handleSavingsNameChange}
                    placeholder="e.g. Emergency Fund"
                />
            </div>

            {/* Input box for the user to enter the amount to save per month */}
            <div>
                <label htmlFor="monthly-savings">Enter amount to save per month:</label>
                <input
                    id="monthly-savings"
                    type="number"
                    value={monthlySavings}
                    onChange={handleSavingsChange}
                    placeholder="e.g. 500"
                />
            </div>

            {/* Input box for user to add comments about the savings */}
            <div>
                <label htmlFor="comments">What is this savings for?</label>
                <textarea
                    id="comments"
                    value={comments}
                    onChange={handleCommentsChange}
                    placeholder="e.g. For an upcoming vacation"
                />
            </div>

            {/* Display the entered savings details */}
            <div>
                <h2>Savings Summary:</h2>
                <p><strong>Name:</strong> {savingsName || 'Not provided'}</p>
                <p><strong>Amount to Save:</strong> ${monthlySavings || '0'}</p>
                <p><strong>Comment:</strong> {comments || 'No comments added'}</p>
            </div>
        </div>
    );
}

export default SavingsPage;


// return (
    //     <div>
    //         <h2>Savings</h2>
    //         <p>Plan your savings here</p>
    //     </div>
    // );

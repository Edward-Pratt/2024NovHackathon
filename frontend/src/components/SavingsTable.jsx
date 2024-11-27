import React from "react";

function SavingsTable({ savingsList }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {savingsList.length === 0 ? (
                    <tr>
                        <td colSpan="3">No savings available</td>
                    </tr>
                ) : (
                    savingsList.map((savings, index) => (
                        <tr key={index}>
                            <td>{savings.name}</td>
                            <td>£{savings.amount}</td>
                            <td>{savings.comment}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default SavingsTable;

import React from 'react';

function HomePage() {
    return (
        <div>
            <h1>Welcome to Smart Budget!</h1>
            <div className="image-container">
                <img src="/images/Logo-No-Background.png" width="250" height="200" alt="Logo"
                     className="centered-image"/>
            </div>
            <p>Track and manage your budget efficiently.</p>
        </div>
    );
}

export default HomePage;

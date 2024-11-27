import React, { useState, useEffect } from "react";

function Greeting() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/greeting")
            .then((response) => response.text())
            .then((data) => setMessage(data))
            .catch((error) => console.error("Error fetching greeting:", error));
    }, []);

    return <p>{message}</p>;
}

export default Greeting;

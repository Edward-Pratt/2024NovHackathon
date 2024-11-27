import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import TransactionsPage from './components/TransactionsPage.jsx';
import SettingsPage from './components/SavingsPage.jsx';
import {useState} from "react";
import SavingsPage from "./components/SavingsPage.jsx";
import OverviewPage from "./components/OverviewPage.jsx";

function App() {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    return (
        <Router>
            <div className="navbar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                        <li>
                            <Link to="/savings">Savings</Link>
                        </li>
                        <li>
                            <Link to="/overview">Overview</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/transactions" element={<TransactionsPage transactions={transactions} addTransaction={addTransaction} />} />
                <Route path="/savings" element={<SavingsPage />} />
                <Route path="/overview" element={<OverviewPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;

import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([]);

    let total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return (
        <div className="box">
            <h2>Expense Tracker</h2>

            <h3>Total: ₹{total}</h3>

            <input placeholder="Expense Name" onChange={e => setName(e.target.value)} />
            <input type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} />

            <button onClick={() => {
                if (name && amount && Number(amount) > 0) {
                    setExpenses([...expenses, { name, amount }]);
                    setName("");
                    setAmount("");
                }
            }}>Add Expense</button>

            {expenses.map((e, i) => (
                <p key={i}>
                    {e.name} - ₹{e.amount}
                    <button onClick={() => setExpenses(expenses.filter((_, j) => j !== i))}>X</button>
                </p>
            ))}
        </div>
    );
}

export default App;
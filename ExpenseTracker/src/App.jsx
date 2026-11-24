import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("expenses")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  function addExpense(e) {
    e.preventDefault();
    if (!name.trim() || Number(amount) <= 0) return;
    setExpenses([...expenses, { id: Date.now(), name: name.trim(), amount: Number(amount) }]);
    setName("");
    setAmount("");
  }

  return (
    <main className="card">
      <h1>Expense Tracker</h1>

      <div className="total">
        <span>Total spent</span>
        <strong>₹{total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong>
      </div>

      <form onSubmit={addExpense}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Expense name" />
        <div className="row">
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="1" step="any" placeholder="Amount" />
          <button type="submit">Add</button>
        </div>
      </form>

      <section className="list">
        <h2>Expenses <span>{expenses.length}</span></h2>
        {expenses.length === 0 ? (
          <p className="empty">No expenses yet.</p>
        ) : (
          <ul>
            {expenses.map((e) => (
              <li key={e.id}>
                <span>{e.name}</span>
                <strong>₹{e.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong>
                <button className="delete" aria-label={`Delete ${e.name}`} onClick={() => setExpenses(expenses.filter((item) => item.id !== e.id))}>×</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;

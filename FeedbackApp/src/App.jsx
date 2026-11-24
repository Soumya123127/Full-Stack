import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [list, setList] = useState([]);

  const setField = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const remove = (id) => setList(list.filter((item) => item.id !== id));

  function submit(event) {
    event.preventDefault();
    const entry = { id: Date.now(), name: form.name.trim(), feedback: form.feedback.trim() };
    setList([entry, ...list]);
    setForm({ name: "", feedback: "" });
  }

  return (
    <main className="page">
      <section className="card">
        <header className="header">
          <span className="eyebrow">Your voice matters</span>
          <h1>Feedback Form</h1>
          <p>Tell us what you think. Every suggestion helps us improve.</p>
        </header>

        <form className="form" onSubmit={submit}>
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={setField("name")} placeholder="Enter your name" maxLength={40} required />

          <div className="label-row">
            <label htmlFor="feedback">Feedback</label>
            <span className="counter">{form.feedback.length}/300</span>
          </div>
          <textarea id="feedback" value={form.feedback} onChange={setField("feedback")} placeholder="Share your thoughts..." rows={4} maxLength={300} required />

          <button disabled={!form.name.trim() || !form.feedback.trim()}>Submit feedback</button>
        </form>
      </section>

      <section className="card">
        <div className="responses-header">
          <h2>Recent feedback <span className="badge">{list.length}</span></h2>
          {list.length > 0 && <button type="button" className="clear" onClick={() => setList([])}>Clear all</button>}
        </div>

        {list.length ? (
          <ul className="list">
            {list.map(({ id, name, feedback }) => (
              <li className="item" key={id}>
                <div className="item-top">
                  <strong>{name}</strong>
                  <button type="button" className="remove" aria-label={`Remove feedback from ${name}`} onClick={() => remove(id)}>×</button>
                </div>
                <p>{feedback}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No feedback yet. Be the first to share!</p>
        )}
      </section>
    </main>
  );
}

export default App;

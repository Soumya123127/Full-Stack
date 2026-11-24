import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [list, setList] = useState([]);

    return (
        <div className="box">
            <h2>Feedback Form</h2>

            <input placeholder="Enter Name"
                onChange={e => setName(e.target.value)} />

            <textarea placeholder="Enter Feedback"
                onChange={e => setFeedback(e.target.value)} />

            <button onClick={() => {
                if (name.trim() && feedback.trim()) {
                    setList([...list, { name, feedback }]);
                    setName("");
                    setFeedback("");
                }
            }}>Submit</button>

            {list.map((f, i) => (
                <p key={i}><b>{f.name}:</b> {f.feedback}</p>
            ))}
        </div>
    );
}

export default App;
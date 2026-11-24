import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [course, setCourse] = useState("");
    const [students, setStudents] = useState([]);

    function addStudent() {
        if (name && roll && course) {
            setStudents([...students, { name, roll, course }]);
            setName("");
            setRoll("");
            setCourse("");
        }
    }

    return (
        <div className="box">
            <h2>Student Profile Management</h2>

            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Roll Number" value={roll} onChange={e => setRoll(e.target.value)} />
            <input placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} />

            <button onClick={addStudent}>Add Student</button>

            {students.map((s, i) => (
                <div className="student" key={i}>
                    <h3>{s.name}</h3>
                    <p>Roll No: {s.roll}</p>
                    <p>Course: {s.course}</p>
                    <button onClick={() => setStudents(students.filter((_, j) => j !== i))}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;
import { useState } from "react";
import "./App.css";

const fields = [
  ["name", "Name"],
  ["roll", "Roll Number"],
  ["course", "Course"],
];
const blank = { name: "", roll: "", course: "" };

function App() {
  const [student, setStudent] = useState(blank);
  const [students, setStudents] = useState([]);

  function addStudent(e) {
    e.preventDefault();
    const entry = Object.fromEntries(
      Object.entries(student).map(([key, value]) => [key, value.trim()])
    );
    if (Object.values(entry).some((value) => !value)) return;
    setStudents([...students, { ...entry, id: `${Date.now()}-${Math.random()}` }]);
    setStudent(blank);
  }

  function removeStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  return (
    <main className="app">
      <section className="card">
        <h1>Student Profiles</h1>
        <p>Add and manage student records.</p>
        <form onSubmit={addStudent}>
          {fields.map(([field, label]) => (
            <label key={field}>
              {label}
              <input
                name={field}
                value={student[field]}
                onChange={(e) => setStudent({ ...student, [field]: e.target.value })}
                placeholder={label}
              />
            </label>
          ))}
          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="list">
        <h2>
          Students <span>{students.length}</span>
        </h2>
        {students.length === 0 ? (
          <p className="empty">No students yet. Add one above.</p>
        ) : (
          <div className="grid">
            {students.map(({ id, name, roll, course }) => (
              <article className="student" key={id}>
                <div className="avatar">{name[0].toUpperCase()}</div>
                <div>
                  <h3>{name}</h3>
                  <p>Roll No: {roll}</p>
                  <p>Course: {course}</p>
                </div>
                <button className="delete" onClick={() => removeStudent(id)} aria-label={`Delete ${name}`}>
                  &times;
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;

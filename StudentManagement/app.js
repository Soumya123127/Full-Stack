
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let students = [];

app.get("/", (req, res) => {
    res.send(`
        <h2>Student Management</h2>
        <form action="/add" method="POST">
            <input name="roll" placeholder="Roll Number" required>
            <input name="name" placeholder="Student Name" required>
            <button>Add Student</button>
        </form>
        <h3>Student List</h3>
        ${students.map((s, i) => `
            <p>${s.roll} - ${s.name}
            <a href="/delete/${i}">Delete</a></p>
        `).join("")}
    `);
});

app.post("/add", (req, res) => {
    students.push(req.body);
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    students.splice(req.params.id, 1);
    res.redirect("/");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
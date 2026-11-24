const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

let students = [];

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const css = `
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,sans-serif}
body{min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#eef2ff,#e0e7ff);color:#1e293b}
.card{width:min(92%,420px);background:#fff;padding:24px;border-radius:14px;box-shadow:0 10px 30px #1e293b1a}
h1{font-size:1.4rem;margin-bottom:4px}
p.sub{color:#64748b;font-size:.85rem;margin-bottom:18px}
form{display:flex;gap:8px;margin-bottom:18px}
input{flex:1;min-width:0;padding:10px;border:1px solid #cbd5e1;border-radius:8px;outline:none}
input:focus{border-color:#6366f1}
button{padding:10px 14px;border:0;border-radius:8px;background:#6366f1;color:#fff;cursor:pointer;font-weight:600}
button:hover{background:#4f46e5}
h2{font-size:1rem;margin-bottom:10px}
ul{list-style:none;display:grid;gap:8px}
li{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;background:#f8fafc;border-radius:8px}
li b{color:#4f46e5;margin-right:8px}
.empty{color:#94a3b8;justify-content:center}
.del{color:#ef4444;text-decoration:none;font-size:.85rem}
.del:hover{text-decoration:underline}
`;

app.get("/", (req, res) => {
    const rows = students.length
        ? students.map(s => `<li><span><b>${esc(s.roll)}</b>${esc(s.name)}</span><a class="del" href="/delete/${encodeURIComponent(s.roll)}">Delete</a></li>`).join("")
        : `<li class="empty">No students yet</li>`;
    res.send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Student Management</title><style>${css}</style></head><body><div class="card"><h1>Student Management</h1><p class="sub">${students.length} student${students.length === 1 ? "" : "s"} enrolled</p><form action="/add" method="POST"><input name="roll" placeholder="Roll Number" required><input name="name" placeholder="Student Name" required><button>Add</button></form><h2>Student List</h2><ul>${rows}</ul></div></body></html>`);
});

app.post("/add", (req, res) => {
    const roll = (req.body.roll || "").trim();
    const name = (req.body.name || "").trim();
    if (roll && name && !students.some(s => s.roll === roll)) students.push({ roll, name });
    res.redirect("/");
});

app.get("/delete/:roll", (req, res) => {
    students = students.filter(s => s.roll !== req.params.roll);
    res.redirect("/");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));

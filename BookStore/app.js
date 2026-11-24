
const express = require("express");
const app = express();

let books = [
    { name: "Wings of Fire", price: 200 },
    { name: "The Alchemist", price: 250 },
    { name: "Atomic Habits", price: 300 }
];

let cart = [];

app.get("/", (req, res) => {
    res.send(`
        <h2>Online Book Store</h2>
        ${books.map((b, i) => `
            <p>${b.name} - ₹${b.price}
            <a href="/add/${i}">Add to Cart</a></p>
        `).join("")}
        <a href="/cart">View Cart</a>
    `);
});

app.get("/add/:id", (req, res) => {
    cart.push(books[req.params.id]);
    res.redirect("/");
});

app.get("/cart", (req, res) => {
    res.send(`
        <h2>Shopping Cart</h2>
        ${cart.map(b => `<p>${b.name} - ₹${b.price}</p>`).join("")}
        <h3>Total: ₹${cart.reduce((sum, b) => sum + b.price, 0)}</h3>
        <a href="/">Back to Store</a>
    `);
});

app.listen(3000, () => console.log("http://localhost:3000"));
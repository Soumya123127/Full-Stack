
const express = require("express");
const app = express();

const books = [
  { name: "Wings of Fire", price: 200 },
  { name: "The Alchemist", price: 250 },
  { name: "Atomic Habits", price: 300 }
];
let cart = [];

const css = `<style>
*{box-sizing:border-box}body{margin:0;font:16px system-ui,sans-serif;background:#f6f3ee;color:#222}
main{max-width:760px;margin:48px auto;padding:0 16px}h1{margin:0 0 24px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px}
.card,.cart{background:#fff;padding:18px;border-radius:12px;box-shadow:0 2px 10px #0001}
.card b{display:block;margin-bottom:4px}.card span{color:#666}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}
.total{text-align:right;margin:16px 0 0}a{color:#b45309}
.btn{display:inline-block;margin-top:14px;padding:8px 14px;background:#b45309;color:#fff;border-radius:8px;text-decoration:none;font-size:14px}
.btn:hover{background:#92400e}main>a{display:inline-block;margin-top:20px}
</style>`;
const page = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>${css}</head><body><main><h1>${title}</h1>${body}</main></body></html>`;

app.get("/", (req, res) => res.send(page("Online Book Store", `
  <div class="grid">${books.map((b, i) => `
    <div class="card"><b>${b.name}</b><span>₹${b.price}</span>
      <a class="btn" href="/add/${i}">Add to cart</a></div>`).join("")}</div>
  <a href="/cart">View cart (${cart.length})</a>
`)));

app.get("/add/:id", (req, res) => {
  const book = books[req.params.id];
  if (book) cart.push(book);
  res.redirect("/");
});

app.get("/cart", (req, res) => res.send(page("Shopping Cart", `
  <div class="cart">
    ${cart.length ? cart.map(b => `<div class="row"><span>${b.name}</span><span>₹${b.price}</span></div>`).join("") : "<p>Your cart is empty.</p>"}
    ${cart.length ? `<p class="total"><b>Total: ₹${cart.reduce((sum, b) => sum + b.price, 0)}</b></p>` : ""}
  </div>
  <a href="/">Back to store</a>${cart.length ? ' · <a href="/clear">Clear cart</a>' : ""}
`)));

app.get("/clear", (req, res) => { cart = []; res.redirect("/cart"); });

app.listen(3000, () => console.log("http://localhost:3000"));
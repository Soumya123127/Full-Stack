const $ = id => document.getElementById(id);
const form = $("form"), tabs = $("tabs"), fields = $("fields"), error = $("error");
const grade = p => p >= 90 ? "A" : p >= 75 ? "B" : p >= 60 ? "C" : p >= 40 ? "D" : "F";
let count = 3;

function draw() {
    tabs.innerHTML = [3, 4, 5].map(n => `<button type="button" data-n="${n}" class="${n === count ? "on" : ""}">${n} subjects</button>`).join("");
    fields.innerHTML = Array.from({ length: count }, (_, i) => `<label>Subject ${i + 1}<input type="number" min="0" max="100" placeholder="0–100"></label>`).join("");
    tabs.querySelectorAll("button").forEach(b => b.onclick = () => {
        count = +b.dataset.n;
        error.hidden = true;
        $("result").hidden = true;
        draw();
    });
}
draw();

fields.oninput = e => { e.target.classList.remove("invalid"); error.hidden = true; };

form.onsubmit = e => {
    e.preventDefault();
    const inputs = [...fields.querySelectorAll("input")];
    const marks = inputs.map(i => i.value.trim());
    const valid = marks.every(v => v !== "" && +v >= 0 && +v <= 100);
    inputs.forEach(i => i.classList.toggle("invalid", i.value.trim() === "" || +i.value < 0 || +i.value > 100));
    if (!valid) {
        error.textContent = "Enter marks between 0 and 100.";
        error.hidden = false;
        $("result").hidden = true;
        return;
    }
    error.hidden = true;
    const nums = marks.map(Number);
    const total = nums.reduce((a, b) => a + b, 0);
    const per = total / nums.length;
    const pass = nums.every(m => m >= 35);
    const tone = pass ? "good" : "fail";
    $("total").textContent = `${total} / ${nums.length * 100}`;
    $("percent").textContent = `${per.toFixed(1)}%`;
    $("grade").textContent = grade(per);
    $("grade").className = `pill ${tone}`;
    $("bar").style.width = `${per}%`;
    $("status").textContent = pass ? "Passed" : "Failed";
    $("status").className = tone;
    $("result").hidden = false;
};

form.onreset = () => {
    error.hidden = true;
    $("result").hidden = true;
    setTimeout(() => fields.querySelector("input")?.focus());
};

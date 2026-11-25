const display = document.getElementById("display");
const keys = document.getElementById("keys");
let expression = "0";

const buttons = [
    ["C", "clear"], ["÷", "op"], ["×", "op"], ["−", "op"],
    ["7"], ["8"], ["9"], ["+", "op"],
    ["4"], ["5"], ["6"], ["=", "equals"],
    ["1"], ["2"], ["3"], ["0", "zero"],
    [".", "dot"], ["⌫", "back"]
];

function render() {
    display.value = expression
        .replace(/\*/g, "×")
        .replace(/\//g, "÷")
        .replace(/-/g, "−");
}

function press(key) {
    const operators = "+-*/";
    const last = expression.slice(-1);

    if (key === "C") expression = "0";
    else if (key === "⌫") expression = expression.slice(0, -1) || "0";
    else if (key === "=") {
        if (!/^[\d+\-*/.\s]+$/.test(expression)) expression = "Error";
        else {
            try {
                const result = Function(`return ${expression}`)();
                expression = Number.isFinite(result) ? String(+result.toFixed(10)) : "Error";
            } catch {
                expression = "Error";
            }
        }
    } else if (key === ".") {
        if (expression === "Error") expression = "0";
        const number = expression.split(/[+\-*/]/).pop();
        if (!number.includes(".")) expression += key;
    } else if (operators.includes(key)) {
        if (expression === "Error") expression = "0";
        expression = (operators.includes(last) ? expression.slice(0, -1) : expression) + key;
    } else {
        if (expression === "0" || expression === "Error") expression = "";
        expression += key;
    }
    render();
}

buttons.forEach(([label, type = ""]) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = type;
    button.onclick = () => press({ "÷": "/", "×": "*", "−": "-" }[label] || label);
    keys.appendChild(button);
});

document.addEventListener("keydown", event => {
    const key = { Enter: "=", Escape: "C", Backspace: "⌫", ",": "." }[event.key] || event.key;
    if (/^[\d+\-*/ .=]$/.test(key) || ["=", "C", "⌫"].includes(key)) {
        event.preventDefault();
        press(key);
    }
});

render();

const input = document.getElementById("task");
const list = document.getElementById("list");

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.onclick = () => li.classList.toggle("done");

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete task");
    del.onclick = () => li.remove();

    li.append(span, del);
    list.appendChild(li);

    input.value = "";
    input.focus();
});

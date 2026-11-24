function addTask() {
    let task = document.getElementById("task").value;

    if (task == "") return;

    let li = document.createElement("li");
    li.innerHTML = task + ' <button onclick="this.parentElement.remove()">X</button>';

    li.onclick = function() {
        this.classList.toggle("done");
    };

    document.getElementById("list").appendChild(li);
    document.getElementById("task").value = "";
}
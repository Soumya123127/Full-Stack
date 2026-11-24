let questions = [
    ["What is HTML?", ["Programming Language", "Markup Language", "Database", "Browser"], 1],
    ["Which language styles a webpage?", ["HTML", "Python", "CSS", "Java"], 2],
    ["Which language makes webpages interactive?", ["CSS", "HTML", "JavaScript", "SQL"], 2]
];

let i = 0, score = 0;

function show() {
    document.getElementById("question").innerHTML = questions[i][0];
    document.getElementById("options").innerHTML =
        questions[i][1].map((o, j) =>
            `<label><input type="radio" name="ans" value="${j}"> ${o}</label>`
        ).join("");
}

function next() {
    let ans = document.querySelector('input[name="ans"]:checked');

    if (!ans) return alert("Select an answer!");

    if (ans.value == questions[i][2]) score++;

    i++;

    if (i < questions.length) show();
    else {
        document.getElementById("question").innerHTML = "Quiz Completed!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("result").innerHTML =
            "Your Score: " + score + "/" + questions.length;
    }
}

show();
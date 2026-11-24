function calculate() {
    let a = Number(m1.value);
    let b = Number(m2.value);
    let c = Number(m3.value);

    let total = a + b + c;
    let per = total / 3;

    let grade = per >= 90 ? "A" : per >= 75 ? "B" :
                per >= 60 ? "C" : per >= 40 ? "D" : "F";

    document.getElementById("result").innerHTML =
        "Total: " + total + "<br>Percentage: " + per.toFixed(2) +
        "%<br>Grade: " + grade + "<br>" +
        (a >= 35 && b >= 35 && c >= 35 ? "Pass" : "Fail");
}
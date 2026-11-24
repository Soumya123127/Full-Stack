const fs = require("fs");

fs.writeFileSync("sample.txt", "Hello! This is a sample file.");

console.log("File created!");

console.log("File Content:", fs.readFileSync("sample.txt", "utf8"));

fs.unlinkSync("sample.txt");

console.log("File deleted!");
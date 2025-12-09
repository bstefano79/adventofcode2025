const fs = require("fs");

const data = fs.readFileSync("day7.txt", "utf8");

const rows = data.split("\r\n");

function replaceAt(str, index, char) {
  return str.substring(0, index) + char + str.substring(index + 1);
}

rows[1] = replaceAt(rows[1], rows[0].indexOf("S"), "|");
let d = 0;

for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    if (rows[i][j] == "|") {
      if (rows[i + 1][j] == "^") {
        d++;
        rows[i + 1] = replaceAt(rows[i + 1], j - 1, "|");
        rows[i + 1] = replaceAt(rows[i + 1], j + 1, "|");
      } else if (rows[i + 1][j] == ".") {
        rows[i + 1] = replaceAt(rows[i + 1], j, "|");
      }
    }
  }
}

console.log(d);

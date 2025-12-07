const fs = require("fs");

const data = fs.readFileSync("day6.txt", "utf8");

const rows = data.split("\r\n");

rows[rows.length - 1] = rows[rows.length - 1].split(" ").filter((x) => {
  if (x != "") return x;
});

let indexOp = 0;
let isAdd = rows[rows.length - 1][0] == "+";
let res;
if (isAdd) res = 0;
else res = 1;
let tot = 0;
for (let j = 0; j < rows[0].length; j++) {
  let num = "";
  for (let i = 0; i < rows.length - 1; i++) {
    if (rows[i][j] != " ") {
      num += rows[i][j];
    }
  }
  if (num == "") {
    tot += res;
    indexOp++;
    isAdd = rows[rows.length - 1][indexOp] == "+";
    if (isAdd) res = 0;
    else res = 1;
  } else {
    if (isAdd) {
      res += Number(num);
    } else {
      res *= Number(num);
    }
  }
}

console.log(tot + res);

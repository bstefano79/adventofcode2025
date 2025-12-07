const fs = require("fs");

const data = fs.readFileSync("day6.txt", "utf8");

const rows = data.split("\r\n");

row = [];

rows.forEach((r, i) => {
  row[i] = r.split(" ");
  row[i] = row[i].filter((x) => {
    if (x != "") return x;
  });
});
let tot = 0;
for (let i = 0; i < row[0].length; i++) {
  let res;
  let isAdd = row[rows.length - 1][i] == "+";
  if (isAdd) {
    res = 0;
  } else {
    res = 1;
  }
  for (let j = 0; j < rows.length - 1; j++) {
    if (isAdd) {
      res += Number(row[j][i]);
    } else {
      res *= Number(row[j][i]);
    }
  }
  tot += res;
}

console.log(tot);

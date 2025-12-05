const fs = require("fs");

function compare(str1, str2) {
  const l1 = str1.length;
  const l2 = str2.length;
  if (l1 > l2) return 1;
  if (l2 > l1) return -1;
  for (let i = 0; i < l1; i++) {
    if (str1[i] > str2[i]) return 1;
    if (str2[i] > str1[i]) return -1;
  }
  return 0;
}

function controlRange(row, to) {
  for (let i = 0; i < to; i++) {
    let range = rows[i].split("-");
    if (compare(row, range[0]) >= 0 && compare(row, range[1]) <= 0) {
      return 1;
    }
  }
  return 0;
}

const data = fs.readFileSync("day5.txt", "utf8");

const rows = data.split("\r\n");
let div = 0;
const rl = rows.length;
for (; div < rl; div++) {
  if (rows[div].length == 0) break;
}
let val = 0;
for (let i = div + 1; i < rl; i++) {
  val += controlRange(rows[i], div - 1);
}
console.log(val);

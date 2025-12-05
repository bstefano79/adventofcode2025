const fs = require("fs");

const data = fs.readFileSync("day5.txt", "utf8");

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

function max(str1, str2) {
  if (compare(str1, str2) >= 0) {
    return str1;
  }
  return str2;
}

function min(str1, str2) {
  if (compare(str1, str2) >= 0) {
    return str2;
  }
  return str1;
}

function subtractStrings(a, b) {
  while (a.length < b.length) a = "0" + a;
  while (b.length < a.length) b = "0" + b;

  let carry = 0;
  let result = [];

  for (let i = a.length - 1; i >= 0; i--) {
    let digitA = Number(a[i]);
    let digitB = Number(b[i]) + carry;

    if (digitA < digitB) {
      digitA += 10;
      carry = 1;
    } else {
      carry = 0;
    }

    let diff = digitA - digitB;
    result.push(diff);
  }

  result = result.reverse().join("");

  return result.replace(/^0+/, "") || "0";
}

function addStrings(a, b) {
  a = a.padStart(Math.max(a.length, b.length), "0");
  b = b.padStart(Math.max(a.length, b.length), "0");
  let carry = 0;
  let result = "";
  for (let i = a.length - 1; i >= 0; i--) {
    const sum = Number(a[i]) + Number(b[i]) + carry;
    const digit = sum % 10;
    carry = Math.floor(sum / 10);
    result = digit + result;
  }

  if (carry > 0) result = carry + result;
  return result;
}

const rows = data.split(/\r?\n/);
let div = 0;
const rl = rows.length;
for (; div < rl; div++) {
  if (rows[div].trim().length == 0) break;
}

let map = [];
for (let i = 0; i < div; i++) {
  let int = "";
  let index = [];
  let p = rows[i].trim().split("-");
  map.forEach((row, i) => {
    const pm = row.split("-");
    const maxS = max(p[0], pm[0]);
    const minE = min(p[1], pm[1]);

    if (compare(maxS, minE) <= 0) {
      const minS = min(p[0], pm[0]);
      const maxE = max(p[1], pm[1]);
      //p = minS + "-" + maxE;
      p[0] = minS;
      p[1] = maxE;
      int = p;
      index.push(i);
    }
  });
  if (index.length == 0) {
    map.push(rows[i]);
  } else {
    /*console.log(index);
    console.log(p);
    console.log(map[index[0]]);*/

    const indiciDaEliminare = new Set(index);
    map = map.filter((_, j) => !indiciDaEliminare.has(j));
    map.push(p[0] + "-" + p[1]);
    /*console.log(map[index[0]]);
    console.log();*/
  }
}

let num = "0";
map.forEach((m) => {
  n = m.split("-");
  const diff = subtractStrings(n[1], n[0]);
  const len = addStrings(diff, "1");
  num = addStrings(num, len);
});

console.log(num);

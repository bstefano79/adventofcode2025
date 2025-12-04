const fs = require("fs");

const data = fs.readFileSync("day2.txt", "utf8");

const s = data.split(",");

function compareNumericStrings(a, b) {
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;

  if (a > b) return 1;
  if (a < b) return -1;

  return 0;
}

function toNextPower(s) {
  const app = "1" + "0".repeat(s.length);
  const half = Math.floor(app.length / 2);
  const sub = app.substring(0, half);
  return sub + sub;
}

const divNumber = (num) => {
  const half = Math.floor(num.length / 2);
  return { f: num.substring(0, half), s: num.substring(half) };
};

function addOne(str) {
  let arr = str.split("");
  let i = arr.length - 1;

  while (i >= 0) {
    if (arr[i] === "9") {
      arr[i] = "0";
      i--;
    } else {
      arr[i] = String(Number(arr[i]) + 1);
      return arr.join("");
    }
  }

  return "1" + arr.join("");
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

let num = [];

s.forEach((x) => {
  const c = x.split("-");
  if (c[0].length % 2) {
    c[0] = toNextPower(c[0]);
  }
  while (compareNumericStrings(c[1], c[0]) >= 0) {
    const app = divNumber(c[0]);
    const comp = compareNumericStrings(app.f, app.s);
    if (comp === 0) {
      num.push({ val: c[0], interva: x });
      const m = addOne(app.f);
      c[0] = m + m;
    } else if (comp == 1) {
      //console.log(app.f + " - " + app.s);
      c[0] = app.f + app.f;
    } else {
      //  console.log("-1 -> " + app.f + " - " + app.s);
      const a = addOne(app.f);
      c[0] = a + a;
    }
  }
});

let sum = "0";

num.forEach((x) => {
  sum = addStrings(x.val, sum);
});

console.log(sum);

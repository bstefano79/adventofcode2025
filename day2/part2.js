const fs = require("fs");

const data = fs.readFileSync("day2.txt", "utf8");

const s = data.split(",");

function possibleSplits(str) {
  const L = str.length;
  const res = [];

  for (let size = 1; size <= L; size++) {
    if (L % size === 0) {
      if (size <= str.length / 2)
        res.push({
          length: str.length,
          chunkSize: size,
          chunks: L / size,
        });
    }
  }

  return res;
}

function compareNumericStrings(a, b) {
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;

  if (a > b) return 1;
  if (a < b) return -1;

  return 0;
}

function splitEvery(str, size) {
  const res = [];
  for (let i = 0; i < str.length; i += size) {
    res.push(str.slice(i, i + size));
  }
  return res;
}

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

function allCharsEqual(str) {
  if (str.length <= 1) return true;

  const first = str[0];
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== first) return false;
  }
  return true;
}

function addIfNOtIn(num, v) {
  if (!num.some((el) => el.val === v.val)) {
    if (v.val.length > 1) num.push(v);
  }
}

let num = [];

function addNumberFromInterval(x) {
  const c = x.split("-");
  let start = c[0];
  const l = c[0].length;

  const ps = possibleSplits(c[0]);

  let enter = false;
  ps.forEach((i) => {
    const s = splitEvery(c[0], i.chunkSize);

    c[0] = s[0].repeat(s.length);
    if (compareNumericStrings(start, c[0]) > 0) {
      s[0] = addOne(s[0]);
      c[0] = s[0].repeat(s.length);
    }
    while (compareNumericStrings(c[1], c[0]) >= 0 && c[0].length == l) {
      if (enter) {
        if (allCharsEqual(s[0])) {
          s[0] = addOne(s[0]);
          c[0] = s[0].repeat(s.length);
          continue;
        }
      }
      //num.push({ val: c[0], interval: x, fact: i });
      addIfNOtIn(num, { val: c[0], interval: x, fact: i.chunkSize });
      s[0] = addOne(s[0]);
      c[0] = s[0].repeat(s.length);
    }
    c[0] = start;
    enter = true;
  });
  c[0] = start;
  c[0] = "1" + "0".repeat(c[0].length);
  if (compareNumericStrings(c[1], c[0]) >= 0) {
    addNumberFromInterval(c[0] + "-" + c[1]);
  }
}

s.forEach((x) => {
  addNumberFromInterval(x);
});

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

let str = "";
num.forEach(
  (i) =>
    //console.log(i.val + " -> interval " + i.interval + " <- " + i.fact)
    (str += i.val + " -> interval " + i.interval + " <- " + i.fact + "\n")
);

fs.writeFile("output.txt", str, (err) => {
  if (err) console.error(err);
});

let sum = "0";

num.forEach((x) => {
  sum = addStrings(sum, x.val);
});

console.log(sum);

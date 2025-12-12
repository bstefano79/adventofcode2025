const fs = require("fs");

const data = fs.readFileSync("day10.txt", "utf8");

const rows = data.split("\r\n");

function togle(d, n) {
  let r = d;
  const index = n.slice(1, -1).split(",").map(Number);
  const inv = { "#": ".", ".": "#" };
  index.forEach((i) => {
    r = replaceAt(r, i, inv[r[i]]);
  });
  return r;
}

function replaceAt(str, i, ch) {
  return str.slice(0, i) + ch + str.slice(i + 1);
}

let tot = 0;

rows.forEach((row) => {
  const data = row.split(" ");
  const e = data[0].slice(1, -1);
  const s = ".".repeat(e.length);
  if (e != s) {
    let find = false;
    const map = {};
    map[s] = true;
    let sta = [s];
    let lev = 1;
    do {
      let togleSta = [];
      for (let j = 0; j < sta.length && !find; j++) {
        for (let i = 1; i < data.length - 1 && !find; i++) {
          togleSta.push(togle(sta[j], data[i]));
        }
      }
      sta = [];
      for (let i = 0; i < togleSta.length && !find; i++) {
        if (!map[togleSta[i]]) {
          map[togleSta[i]] = true;
          sta.push(togleSta[i]);
          if (togleSta[i] == e) {
            find = true;
            tot += lev;
          }
        }
      }
      lev++;
    } while (!find && sta.length > 0);
  }
});
console.log(tot);

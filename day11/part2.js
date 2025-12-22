const fs = require("fs");

const data = fs.readFileSync("day11.txt", "utf8");

const rows = data.split("\r\n");

const tree = {};

rows.forEach((row) => {
  const s = row.split(":");
  tree[s[0].trim()] = s[1].trim().split(" ");
});

function contaPercorsi(start, end, proibiti = []) {
  let memo = {};

  function search(current, target, visited) {
    if (current === target) return 1;

    if (memo[current] !== undefined) return memo[current];

    let paths = 0;
    visited.add(current);

    for (const next of tree[current] || []) {
      if (!visited.has(next) && !proibiti.includes(next)) {
        paths += search(next, target, visited);
      }
    }

    visited.delete(current);
    memo[current] = paths;
    return paths;
  }

  return search(start, end, new Set());
}

const S = "svr",
  D = "out",
  P1 = "fft",
  P2 = "dac";

const s_fft = contaPercorsi(S, P1, [P2]);
const fft_dac = contaPercorsi(P1, P2, [S, D]);
const dac_d = contaPercorsi(P2, D, [P1]);
const totaleA = s_fft * fft_dac * dac_d;

const s_dac = contaPercorsi(S, P2, [P1]);
const dac_fft = contaPercorsi(P2, P1, [S, D]);
const fft_d = contaPercorsi(P1, D, [P2]);
const totaleB = s_dac * dac_fft * fft_d;

console.log("Totale percorsi:", totaleA + totaleB);

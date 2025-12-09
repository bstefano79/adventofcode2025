const fs = require("fs");

const data = fs.readFileSync("day7.txt", "utf8").trimEnd();
const rows = data.split("\r\n");

const H = rows.length;
const W = rows[0].length;

let startRow = -1;
let startCol = -1;
for (let r = 0; r < H; r++) {
  const c = rows[r].indexOf("S");
  if (c !== -1) {
    startRow = r;
    startCol = c;
    break;
  }
}
if (startRow === -1) {
  throw new Error("S non trovata");
}

function countTimelines(rows, startRow, startCol) {
  const H = rows.length;
  const W = rows[0].length;

  let ys = new Map();
  ys.set(startCol, 1n);

  for (let r = startRow + 1; r < H; r++) {
    const newYs = new Map();

    for (const [col, count] of ys.entries()) {
      if (count === 0n) continue;
      if (col < 0 || col >= W) continue;

      const cell = rows[r][col];

      if (cell === "^") {
        const left = col - 1;
        const right = col + 1;

        if (left >= 0) {
          newYs.set(left, (newYs.get(left) || 0n) + count);
        }
        if (right < W) {
          newYs.set(right, (newYs.get(right) || 0n) + count);
        }
      } else {
        if (col >= 0 && col < W) {
          newYs.set(col, (newYs.get(col) || 0n) + count);
        }
      }
    }

    ys = newYs;
  }

  let total = 0n;
  for (const v of ys.values()) {
    total += v;
  }
  return total;
}

const result = countTimelines(rows, startRow, startCol);
console.log(String(result));

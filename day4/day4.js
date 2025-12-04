const fs = require("fs");

const data = fs.readFileSync("day4.txt", "utf8");

const rows = data.split("\r\n");

maxIndCol = rows[0].length - 1;
maxIndRow = rows.length - 1;

function controlAd(i, j) {
  if (i < 0 || j < 0 || i > maxIndRow || j > maxIndCol) {
    return 0;
  }
  return rows[i][j] == "@" ? 1 : 0;
}

let i = 0;
let count = 0;
while (i <= maxIndRow) {
  for (let j = 0; j <= maxIndCol; j++) {
    if (rows[i][j] != "@") continue;
    let countAd = 0;
    countAd += controlAd(i - 1, j - 1);
    countAd += controlAd(i - 1, j);
    countAd += controlAd(i - 1, j + 1);

    countAd += controlAd(i, j - 1);
    countAd += controlAd(i, j + 1);

    countAd += controlAd(i + 1, j - 1);
    countAd += controlAd(i + 1, j);
    countAd += controlAd(i + 1, j + 1);

    if (countAd < 4) {
      count++;
    }
  }
  i++;
}

console.log(count);

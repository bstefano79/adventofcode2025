//console.log([0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2].slice(0, 15 - 11));

/*const app = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];
app.slice(0, 4);
console.log(app);*/

function funcSum(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const da = i >= 0 ? a.charCodeAt(i) - 48 : 0;
    const db = j >= 0 ? b.charCodeAt(j) - 48 : 0;

    const sum = da + db + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result.reverse().join("");
}

const fs = require("fs");

const data = fs.readFileSync("day3.txt", "utf8");

const rows = data.split("\r\n");

let sum = "0";

rows.forEach((r) => {
  let arr = [...r].map(Number);
  //const l = arr.length;
  let step = 12;
  const numb = [];
  while (step > 0) {
    const app = arr.slice(0, arr.length - (step - 1));
    const i = app.reduce(
      (maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex,
      0
    );
    numb.push(app[i]);

    arr = arr.slice(i + 1, arr.length);
    //console.log(arr.length + " . " + app.length);
    //console.log(app);
    step--;
  }
  //console.log(numb);
  sum = funcSum(sum, numb.join(""));
});

console.log(sum);

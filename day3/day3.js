const fs = require("fs");

const data = fs.readFileSync("day3.txt", "utf8");

const rows = data.split("\r\n");

let sum = 0;

rows.forEach((r) => {
  const arr = [...r].map(Number);

  const indexMax = arr.reduce(
    (maxIndex, currentValue, currentIndex, array) =>
      currentValue > array[maxIndex] ? currentIndex : maxIndex,
    0
  );

  const l = arr.length;
  if (indexMax == l - 1) {
    const newIndex = arr
      .slice(0, l - 1)
      .reduce(
        (maxIndex, currentValue, currentIndex, array) =>
          currentValue > array[maxIndex] ? currentIndex : maxIndex,
        0
      );
    // console.log(arr[newIndex] + "" + arr[indexMax]);
    console.log(Number(arr[newIndex] + "" + arr[indexMax]));
    sum += Number(arr[newIndex] + "" + arr[indexMax]);
  } else {
    const newIndex = arr
      .slice(indexMax + 1, l)
      .reduce(
        (maxIndex, currentValue, currentIndex, array) =>
          currentValue > array[maxIndex] ? currentIndex : maxIndex,
        0
      );
    /*console.log(
      "noultimo " + arr[indexMax] + "" + arr[indexMax + 1 + newIndex]
    );*/
    console.log(Number(arr[indexMax] + "" + arr[indexMax + 1 + newIndex]));
    sum += Number(arr[indexMax] + "" + arr[indexMax + 1 + newIndex]);
    //console.log(arr);
  }
  // console.log(sum);
});

console.log(sum);

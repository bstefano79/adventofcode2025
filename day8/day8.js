const fs = require("fs");

const data = fs.readFileSync("day8.txt", "utf8");

const rows = data.split("\r\n");

const points = [];

const minDist = [];

const lenMax = [];

rows.forEach((row) => {
  c = row.split(",");
  const p = {};
  p.x = c[0];
  p.y = c[1];
  p.z = c[2];
  points.push(p);
});

function isEqual(p1, p2) {
  return p1.x == p2.x && p1.y == p2.y && p1.z == p2.z;
}

function addMins(el) {
  let i = 0;
  for (; i < minDist.length; i++) {
    if (minDist[i].val > el.val) {
      break;
    }
  }
  if (i < 1000) {
    minDist.splice(i, 0, el);
    if (minDist.length > 1000) {
      minDist.pop();
    }
  }
}

function lMax(val) {
  let i = 0;
  for (; i < lenMax.length; i++) {
    if (val > lenMax[i]) {
      break;
    }
  }
  if (i < 3) {
    lenMax.splice(i, 0, val);
    if (lenMax.length > 3) {
      lenMax.pop();
    }
  }
}

function mergeAtIndexes(arr, i, j) {
  const idx1 = Math.min(i, j);
  const idx2 = Math.max(i, j);

  const merged = [...arr[idx1], ...arr[idx2]];

  const result = arr.slice();

  result.splice(idx2, 1);

  result.splice(idx1, 1, merged);

  return result;
}

for (let i = 0; i < points.length; i++) {
  for (let j = i + 1; j < points.length; j++) {
    addMins({
      p1: points[i],
      p2: points[j],
      val:
        (points[i].x - points[j].x) ** 2 +
        (points[i].y - points[j].y) ** 2 +
        (points[i].z - points[j].z) ** 2,
    });
  }
}

let res = [];

minDist.forEach((el) => {
  const index = [];
  res.forEach((arr, i) => {
    if (arr.some((obj) => isEqual(el.p1, obj))) {
      index.push({ p1: el.p1, index: i });
    }
    if (arr.some((obj) => isEqual(el.p2, obj))) {
      index.push({ p2: el.p2, index: i });
    }
  });
  if (index.length == 0) {
    res.push([el.p1, el.p2]);
  } else if (index.length == 1) {
    if (index[0].p1) {
      res[index[0].index].push(el.p2);
    } else {
      res[index[0].index].push(el.p1);
    }
  } else if (index.length == 2) {
    if (index[0].index != index[1].index) {
      res = mergeAtIndexes(res, index[0].index, index[1].index);
    }
  } else console.error("non si possono trovare 3 punti");
});

res.forEach((x) => lMax(x.length));

console.log(lenMax.reduce((p, v) => p * v, 1));

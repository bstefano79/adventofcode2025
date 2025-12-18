const fs = require("fs");

const data = fs.readFileSync("day11.txt", "utf8");

const rows = data.split("\r\n");

const tree = {};

rows.forEach((row) => {
  const s = row.split(":");
  tree[s[0].trim()] = s[1].trim().split(" ");
});

const mainRoute = tree["you"];

const memory = {};

console.log(recursiveResolve(mainRoute));

function recursiveResolve(routes) {
  if (!routes) return 0;
  if (routes[0] === "out") return 1;

  let sum = 0;

  for (const route of routes) {
    if (memory[route] != null) {
      sum += memory[route];
      continue;
    }
    const v = recursiveResolve(tree[route]);
    memory[route] = v;
    sum += v;
  }
  return sum;
}

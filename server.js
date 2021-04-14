//@ts-check

const express = require("express");
const app = express();
const fs = require("fs");
const readline = require("readline");

app.set("port", process.env.API_PORT || 3001);

let items = [];

const file = readline.createInterface({
  input: fs.createReadStream("./book-quotes.txt"),
  crlfDelay: Infinity
});

file.on('line', (line) => {
  items.push(line)
});

console.log(items)

function makeApage(pageNumber) {
  let pageInfo = {
    totalItemsNumber: items.length,
    itemsPerPage: 5,
    itemsToShow: [],
  };
  const itemsIndex = (pageNumber - 1) * pageInfo.itemsPerPage;
  let arr = [];
  for (let i = itemsIndex; i < items.length; i++) {
    if (arr.length < pageInfo.itemsPerPage) {
      arr.push(items[i]);
    }
  }
  pageInfo.itemsToShow = arr;
  return pageInfo;
};

app.get("/api/v1/something", (req, res) => {
  const pageNumber = Number(req.query.page);
  const result = makeApage(pageNumber);

  res.json(result);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

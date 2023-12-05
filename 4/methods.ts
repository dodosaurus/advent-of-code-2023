import type { Card } from "./types";

let fs = require("fs");

export const processTxt = (path: string): Card[] => {
  let temp: string[] = fs.readFileSync(path).toString().split("\n");
  temp = temp.map((item) => item.split("\r")[0].slice(10));

  let main_arr: Card[] = [];

  main_arr = temp.map((item, index) => ({
    card_index: index + 1,
    winning_numbers: item
      .split("|")[0]
      .split(" ")
      .filter((member) => member != "")
      .map((member) => parseInt(member)),
    my_numbers: item
      .split("|")[1]
      .split(" ")
      .filter((member) => member != "")
      .map((member) => parseInt(member)),
  }));

  return main_arr
};

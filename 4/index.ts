//imports
import { processTxt } from "./methods";
import type { Card } from "./types";

//processing file to object array
const main: Card[] = processTxt("4/input.txt");

//number to gather points
let total_points: number = 0;

//test slicing
// let temp: Card[] = main.slice(1, 2);

let winning_nums_counter: number = 0;
let card_points: number = 0;

//main loop
main.forEach((obj) => {
  winning_nums_counter = 0;
  card_points = 0;

  obj.winning_numbers.forEach((win_num) => {
    obj.my_numbers.forEach((my_num) => {
      if (win_num == my_num) {
        winning_nums_counter++;
      }
    });
  });

  if (winning_nums_counter === 0) {
    card_points = 0;
  } else {
    card_points = Math.pow(2, winning_nums_counter - 1);
  }
  total_points = total_points + card_points;
});

//result
console.log(total_points);

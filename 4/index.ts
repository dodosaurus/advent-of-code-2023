//imports
import { processTxt } from "./methods";
import type { Card } from "./types";

//processing file to object array
const main: Card[] = processTxt("4/input.txt");

//number to gather points
// let total_points: number = 0;

//test slicing
// let temp: Card[] = main.slice(0, 10);

let winning_nums_counter: number = 0;

//main loop
main.forEach((obj, index) => {
  winning_nums_counter = 0;

  //repeat per count of card
  for (let x = 1; x <= obj.count; x++) {
    //checking for winning numbers
    obj.winning_numbers.forEach((win_num) => {
      obj.my_numbers.forEach((my_num) => {
        if (win_num == my_num) {
          winning_nums_counter++;
        }
      });
    });

    let cap_for_count_iterator = main.length - 1 - index + winning_nums_counter;

    for (let i = 0; i < cap_for_count_iterator; i++) {
      main[index + i].count++;
    }
  }
});

//collect total number of cards
let total_cards: number = 0;
main.forEach((card) => {
  total_cards += card.count;
});

//result
console.log(main[main.length - 1]);
console.log(total_cards);

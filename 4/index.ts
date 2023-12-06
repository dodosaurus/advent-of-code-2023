//imports
import { mainLoop, processTxt } from "./methods";
import type { Card } from "./types";

//processing file to object array
let main: Card[] = processTxt("4/input.txt");

console.log(main[99]);

//number to gather points
// let total_points: number = 0;

//test slicing
// main = main.slice(0, 5);

let winning_nums_counter: number = 0;

//main loop
mainLoop(main, winning_nums_counter);

//collect total number of cards
let total_cards: number = 0;
main.forEach((card) => {
  total_cards += card.count;
});

//result
// console.log(main);
console.log(total_cards);

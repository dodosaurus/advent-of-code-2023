"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var methods_1 = require("./methods");
//processing file to object array
var main = (0, methods_1.processTxt)("4/input.txt");
console.log(main[99]);
//number to gather points
// let total_points: number = 0;
//test slicing
// main = main.slice(0, 5);
var winning_nums_counter = 0;
//main loop
(0, methods_1.mainLoop)(main, winning_nums_counter);
//collect total number of cards
var total_cards = 0;
main.forEach(function (card) {
    total_cards += card.count;
});
//result
// console.log(main);
console.log(total_cards);

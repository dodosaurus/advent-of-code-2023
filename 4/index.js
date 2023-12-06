"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var methods_1 = require("./methods");
//processing file to object array
var main = (0, methods_1.processTxt)("4/input.txt");
//number to gather points
// let total_points: number = 0;
//test slicing
// let temp: Card[] = main.slice(0, 10);
var winning_nums_counter = 0;
//main loop
main.forEach(function (obj, index) {
    winning_nums_counter = 0;
    //repeat per count of card
    for (var x = 1; x <= obj.count; x++) {
        //checking for winning numbers
        obj.winning_numbers.forEach(function (win_num) {
            obj.my_numbers.forEach(function (my_num) {
                if (win_num == my_num) {
                    winning_nums_counter++;
                }
            });
        });
        var cap_for_count_iterator = main.length - 1 - index + winning_nums_counter;
        for (var i = 0; i < cap_for_count_iterator; i++) {
            main[index + i].count++;
        }
    }
});
//collect total number of cards
var total_cards = 0;
main.forEach(function (card) {
    total_cards += card.count;
});
//result
console.log(main[main.length - 1]);
console.log(total_cards);

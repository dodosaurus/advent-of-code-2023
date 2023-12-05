"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var methods_1 = require("./methods");
//processing file to object array
var main = (0, methods_1.processTxt)("4/input.txt");
//number to gather points
var total_points = 0;
//test slicing
// let temp: Card[] = main.slice(1, 2);
var winning_nums_counter = 0;
var card_points = 0;
//main loop
main.forEach(function (obj) {
    winning_nums_counter = 0;
    card_points = 0;
    obj.winning_numbers.forEach(function (win_num) {
        obj.my_numbers.forEach(function (my_num) {
            if (win_num == my_num) {
                winning_nums_counter++;
            }
        });
    });
    if (winning_nums_counter === 0) {
        card_points = 0;
    }
    else {
        card_points = Math.pow(2, winning_nums_counter - 1);
    }
    total_points = total_points + card_points;
});
//result
console.log(total_points);

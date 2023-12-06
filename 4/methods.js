"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLoop = exports.processTxt = void 0;
var fs = require("fs");
var processTxt = function (path) {
    var temp_arr = fs.readFileSync(path).toString().split("\n");
    temp_arr = temp_arr.map(function (item) { return item.split("\r")[0].slice(10); });
    var main_arr = [];
    main_arr = temp_arr.map(function (item, index) { return ({
        card_index: index,
        card_no: index + 1,
        winning_numbers: item
            .split("|")[0]
            .split(" ")
            .filter(function (member) { return member != ""; })
            .map(function (member) { return parseInt(member); }),
        my_numbers: item
            .split("|")[1]
            .split(" ")
            .filter(function (member) { return member != ""; })
            .map(function (member) { return parseInt(member); }),
        count: 1,
    }); });
    return main_arr;
};
exports.processTxt = processTxt;
var mainLoop = function (main, winning_nums_counter) {
    var cap_for_count_iterator;
    main.forEach(function (obj, index) {
        console.log("------------------------------ CARD NO. " +
            obj.card_no +
            " have copies: " +
            obj.count);
        console.time("Card process time");
        var are_wins_counted = false;
        winning_nums_counter = 0;
        cap_for_count_iterator = 0;
        //repeat per count of card
        for (var x = 1; x <= obj.count; x++) {
            if (!are_wins_counted) {
                obj.winning_numbers.forEach(function (win_num) {
                    obj.my_numbers.forEach(function (my_num) {
                        if (win_num == my_num) {
                            winning_nums_counter++;
                        }
                    });
                });
            }
            are_wins_counted = true;
            // console.log("card no: " + obj.card_no + " winning_numbers: " + winning_nums_counter);
            if (winning_nums_counter > main.length - 1 - index) {
                cap_for_count_iterator = main.length - 1 - index;
            }
            else {
                cap_for_count_iterator = winning_nums_counter;
            }
            // console.log("cap_for_count_iterator: " + cap_for_count_iterator);
            for (var i = 1; i <= cap_for_count_iterator; i++) {
                main[index + i].count++;
            }
        }
        console.timeEnd("Card process time");
    });
};
exports.mainLoop = mainLoop;

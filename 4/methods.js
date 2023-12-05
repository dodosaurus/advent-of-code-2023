"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTxt = void 0;
var fs = require("fs");
var processTxt = function (path) {
    var temp = fs.readFileSync(path).toString().split("\n");
    temp = temp.map(function (item) { return item.split("\r")[0].slice(10); });
    var main_arr = [];
    main_arr = temp.map(function (item, index) { return ({
        card_index: index + 1,
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
    }); });
    return main_arr;
};
exports.processTxt = processTxt;

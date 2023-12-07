"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var methods_1 = require("./methods");
var mapping = (0, methods_1.processTxt)("5/input.txt");
var locations = [];
//create number array in range x to y
var range = function (x, y) {
    var arr = [];
    for (var i = x; i <= y; i++) {
        arr.push(i);
    }
    return arr;
};
var rndArr = range(12, 23232);
console.log(rndArr);
// mapping.seed.forEach((seed, index) => {
//   let location = processOneSeeeAndReturnLocation(seed, index, mapping);
//   locations.push(location);
// });
// console.log(locations)
// //finally find the lowest location number in locations array
// const lowestLocation = Math.min(...locations);
// console.log(`Lowest location is ${lowestLocation}`);

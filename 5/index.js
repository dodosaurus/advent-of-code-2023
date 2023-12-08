"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var methods_1 = require("./methods");
var mapping = (0, methods_1.processTxt)("5/input.txt");
var locations = [];
// console.log(mapping);
//INEFFICIENT WAY !!!
//for each seed pair (subarray), create range array and then for each number of that array
//prcoess one seed and return location to locations array
// mapping.seed.forEach((seed_pair) => {
//   const seed_range = createArrayFromNumber(seed_pair[0], seed_pair[1]);
//   // console.log(seed_range)
//   seed_range.forEach((seed, index) => {
//     let location = processOneSeedAndReturnLocation(seed, index, mapping);
//     locations.push(location);
//   });
// })
//INEFFICIENT WAY 2 !!!
// mapping.seed.forEach((seed_pair, index) => {
//   let fromNo = seed_pair[0];
//   let toNo = seed_pair[0] + seed_pair[1];
//   for (let i = fromNo; i < toNo; i++) {
//     let location = processOneSeedAndReturnLocation(i, i, mapping);
//     locations.push(location);
//   }
//   console.log(
//     `Processing seed pair ${index + 1} (from ${
//       mapping.seed.length
//     }) completed #################################`
//   );
// });
for (var spi = 0; spi < mapping.seed.length; spi++) {
    console.log("################################# Processing seed pair ".concat(spi + 1, " (from ").concat(mapping.seed.length, ") started"));
    var fromNo = mapping.seed[spi][0];
    var toNo = mapping.seed[spi][0] + mapping.seed[spi][1];
    var allSpiLocations = [];
    var spiLocations = [];
    for (var i = fromNo; i < toNo; i++) {
        var location_1 = (0, methods_1.processOneSeedAndReturnLocation)(i, i, mapping);
        allSpiLocations.push(location_1);
        if (allSpiLocations.length === 4000000 || i === toNo - 1) {
            spiLocations.push((0, methods_1.getMin)(allSpiLocations));
            allSpiLocations = [];
        }
    }
    var lowestSpiLocation = (0, methods_1.getMin)(spiLocations);
    locations.push(lowestSpiLocation);
    console.log("Processing seed pair ".concat(spi + 1, " (from ").concat(mapping.seed.length, ") completed!!! Lowest location from this pair is: ").concat(lowestSpiLocation, " #################################"));
}
//finally find the lowest location number in locations array
var lowestLocation = (0, methods_1.getMin)(locations);
console.log("Lowest location is ".concat(lowestLocation));

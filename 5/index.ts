import { getMin, processOneSeedAndReturnLocation, processTxt } from "./methods";
import { Mapping } from "./types";

const mapping: Mapping = processTxt("5/input.txt");

let locations: number[] = [];

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

for (let spi = 0; spi < mapping.seed.length; spi++) {
  console.log(
    `################################# Processing seed pair ${spi + 1} (from ${
      mapping.seed.length
    }) started`
  );

  let fromNo = mapping.seed[spi][0];
  let toNo = mapping.seed[spi][0] + mapping.seed[spi][1];
  let allSpiLocations: number[] = [];
  let spiLocations: number[] = [];
  for (let i = fromNo; i < toNo; i++) {
    let location = processOneSeedAndReturnLocation(i, i, mapping);
    allSpiLocations.push(location);

    if(allSpiLocations.length === 4000000 || i === toNo - 1) {
      spiLocations.push(getMin(allSpiLocations));
      allSpiLocations = [];
    }
  }

  let lowestSpiLocation = getMin(spiLocations);
  locations.push(lowestSpiLocation);

  console.log(
    `Processing seed pair ${spi + 1} (from ${
      mapping.seed.length
    }) completed!!! Lowest location from this pair is: ${lowestSpiLocation} #################################`
  );
}

//finally find the lowest location number in locations array
const lowestLocation = getMin(locations);

console.log(`Lowest location is ${lowestLocation}`);

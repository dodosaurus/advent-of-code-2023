import { processOneSeeeAndReturnLocation, processTxt } from "./methods";

const mapping = processTxt("5/input.txt");

let locations: number[] = []

mapping.seed.forEach((seed, index) => {
  let location = processOneSeeeAndReturnLocation(seed, index, mapping);
  locations.push(location);
});

console.log(locations)

//finally find the lowest location number in locations array
const lowestLocation = Math.min(...locations);

console.log(`Lowest location is ${lowestLocation}`);

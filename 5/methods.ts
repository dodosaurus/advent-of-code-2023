let fs = require("fs");
import type { Mapping } from "./types.d.ts";

export const processTxt = (path: string): any => {
  let file_str: string = fs.readFileSync(path).toString();

  const arr_seeds: number[][] = parseSeeds(file_str);
  const arr_seed_to_soil: number[][] = parseMap(
    file_str,
    "seed-to-soil map:",
    "soil-to-fertilizer map:"
  );
  const arr_soil_to_fertilizer: number[][] = parseMap(
    file_str,
    "soil-to-fertilizer map:",
    "fertilizer-to-water map:"
  );
  const arr_fertilizer_to_water: number[][] = parseMap(
    file_str,
    "fertilizer-to-water map:",
    "water-to-light map:"
  );
  const arr_water_to_light: number[][] = parseMap(
    file_str,
    "water-to-light map:",
    "light-to-temperature map:"
  );
  const arr_light_to_temperature: number[][] = parseMap(
    file_str,
    "light-to-temperature map:",
    "temperature-to-humidity map:"
  );
  const arr_temperature_to_humidity: number[][] = parseMap(
    file_str,
    "temperature-to-humidity map:",
    "humidity-to-location map:"
  );
  const arr_humidity_to_location: number[][] = parseMap(
    file_str,
    "humidity-to-location map:",
    file_str.length
  );

  let obj_to_return: Mapping = {
    seed: arr_seeds,
    seed_to_soil: {
      source: "seed",
      destination: "soil",
      map: arr_seed_to_soil,
    },
    soil_to_fertilizer: {
      source: "soil",
      destination: "fertilizer",
      map: arr_soil_to_fertilizer,
    },
    fertilizer_to_water: {
      source: "fertilizer",
      destination: "water",
      map: arr_fertilizer_to_water,
    },
    water_to_light: {
      source: "water",
      destination: "light",
      map: arr_water_to_light,
    },
    light_to_temperature: {
      source: "light",
      destination: "temperature",
      map: arr_light_to_temperature,
    },
    temperature_to_humidity: {
      source: "temperature",
      destination: "humidity",
      map: arr_temperature_to_humidity,
    },
    humidity_to_location: {
      source: "humidity",
      destination: "location",
      map: arr_humidity_to_location,
    },
  };

  return obj_to_return;
};

const parseSeeds = (file_str: string): number[][] => {
  let temp1: any[] = file_str
    .slice(
      file_str.indexOf("seeds: ") + 7,
      file_str.indexOf("seed-to-soil map:")
    )
    .trim()
    .split(" ");

  temp1 = temp1.map((x: string) => parseInt(x));

  //finally we make 2d array, each sub-array will contain pairs of original values
  let temp2: number[][] = [];
  for (let i = 0; i < temp1.length; i += 2) {
    temp2.push([temp1[i], temp1[i + 1]]);
  }

  return temp2;
};

const parseMap = (
  file_str: string,
  from_str: string,
  to_str: string | number
): number[][] => {
  let temp1 = file_str
    .slice(
      file_str.indexOf(from_str) + from_str.length,
      typeof to_str === "number" ? to_str : file_str.indexOf(to_str)
    )
    .trim()
    .split("\r\n");

  //make triplets
  let temp2 = temp1.map((x: string) => x.trim().split(" "));

  //convert all strings to numbers
  return temp2.map((x: string[]) => x.map((y: string) => parseInt(y)));
};

export const convertSourceToDestination = (
  desc: string,
  source: number,
  arg_map: number[][]
) => {
  // console.log("---------------------------------" + desc);

  //general vars
  let chosen_source_entity = source;
  let chosen_triplet_index: number | null = null;
  let final_destination: number;

  // //check in map if the source fits in some range
  // arg_map.forEach((triplet, index) => {
  //   let source_range_start = triplet[1];
  //   let source_range_end = triplet[1] + triplet[2];

  //   if (
  //     source_range_start <= chosen_source_entity &&
  //     chosen_source_entity <= source_range_end &&
  //     chosen_triplet_index === null
  //   ) {
  //     // console.log("Found in triplet index: " + index);
  //     chosen_triplet_index = index;
  //   }
  // });

  //check in map if the source fits in some range
  for (let i = 0; i < arg_map.length; i++) {
    let source_range_start = arg_map[i][1];
    let source_range_end = arg_map[i][1] + arg_map[i][2];

    if (
      source_range_start <= chosen_source_entity &&
      chosen_source_entity <= source_range_end &&
      chosen_triplet_index === null
    ) {
      // console.log("Found in triplet index: " + index);
      chosen_triplet_index = i;
      break
    }
  }

  //handle if no match is found
  if (chosen_triplet_index === null) {
    // console.log(
    //   "No match found, setting destination to same number as source: " +
    //     chosen_source_entity
    // );
    final_destination = chosen_source_entity;
  } else {
    //if found convert source number through that triplet
    let modifier = chosen_source_entity - arg_map[chosen_triplet_index][1];
    //calculate destination
    final_destination = arg_map[chosen_triplet_index][0] + modifier;

    // console.log("Match found, destination set to: " + final_destination);
  }

  return final_destination;
};

export const processOneSeedAndReturnLocation = (
  seed: number,
  seed_index: number,
  mapping: Mapping
) => {
  // console.log(
  //   `Processing seed index ${seed_index} ################################# `
  // );

  const soil = convertSourceToDestination(
    "Seed to soil",
    seed,
    mapping.seed_to_soil.map
  );
  const fertilizer = convertSourceToDestination(
    "Soil to fertilizer",
    soil,
    mapping.soil_to_fertilizer.map
  );
  const water = convertSourceToDestination(
    "Fertilizer to water",
    fertilizer,
    mapping.fertilizer_to_water.map
  );
  const light = convertSourceToDestination(
    "Water to light",
    water,
    mapping.water_to_light.map
  );
  const temperature = convertSourceToDestination(
    "Light to temperature",
    light,
    mapping.light_to_temperature.map
  );
  const humidity = convertSourceToDestination(
    "Temperature to humidity",
    temperature,
    mapping.temperature_to_humidity.map
  );
  const location = convertSourceToDestination(
    "Humidity to location",
    humidity,
    mapping.humidity_to_location.map
  );

  return location;
};

//create array of numbers providing starting number and length
export const createArrayFromNumber = (start: number, length: number) => {
  let arr: number[] = [];
  for (let i = start; i < start + length; i++) {
    arr.push(i);
  }
  return arr;
};

function getMax(arr) {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
      max = arr[len] > max ? arr[len] : max;
  }
  return max;
}

export function getMin(arr) {
  let len = arr.length;
  let min = Infinity;

  while (len--) {
      min = arr[len] < min ? arr[len] : min;
  }
  return min;
}

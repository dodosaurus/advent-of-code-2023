"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOneSeeeAndReturnLocation = exports.convertSourceToDestination = exports.processTxt = void 0;
var fs = require("fs");
var processTxt = function (path) {
    var file_str = fs.readFileSync(path).toString();
    var arr_seeds = parseSeeds(file_str);
    var arr_seed_to_soil = parseMap(file_str, "seed-to-soil map:", "soil-to-fertilizer map:");
    var arr_soil_to_fertilizer = parseMap(file_str, "soil-to-fertilizer map:", "fertilizer-to-water map:");
    var arr_fertilizer_to_water = parseMap(file_str, "fertilizer-to-water map:", "water-to-light map:");
    var arr_water_to_light = parseMap(file_str, "water-to-light map:", "light-to-temperature map:");
    var arr_light_to_temperature = parseMap(file_str, "light-to-temperature map:", "temperature-to-humidity map:");
    var arr_temperature_to_humidity = parseMap(file_str, "temperature-to-humidity map:", "humidity-to-location map:");
    var arr_humidity_to_location = parseMap(file_str, "humidity-to-location map:", file_str.length);
    var obj_to_return = {
        seed: arr_seeds,
        seed_to_soil: {
            source: "seed",
            destination: "soil",
            map: arr_seed_to_soil,
        },
        arr_soil_to_fertilizer: {
            source: "soil",
            destination: "fertilizer",
            map: arr_soil_to_fertilizer,
        },
        arr_fertilizer_to_water: {
            source: "fertilizer",
            destination: "water",
            map: arr_fertilizer_to_water,
        },
        arr_water_to_light: {
            source: "water",
            destination: "light",
            map: arr_water_to_light,
        },
        arr_light_to_temperature: {
            source: "light",
            destination: "temperature",
            map: arr_light_to_temperature,
        },
        arr_temperature_to_humidity: {
            source: "temperature",
            destination: "humidity",
            map: arr_temperature_to_humidity,
        },
        arr_humidity_to_location: {
            source: "humidity",
            destination: "location",
            map: arr_humidity_to_location,
        },
    };
    return obj_to_return;
};
exports.processTxt = processTxt;
var parseSeeds = function (file_str) {
    var temp = file_str
        .slice(file_str.indexOf("seeds: ") + 7, file_str.indexOf("seed-to-soil map:"))
        .trim()
        .split(" ");
    //parse them to numbers
    return temp.map(function (x) { return parseInt(x); });
};
var parseMap = function (file_str, from_str, to_str) {
    var temp1 = file_str
        .slice(file_str.indexOf(from_str) + from_str.length, typeof to_str === "number" ? to_str : file_str.indexOf(to_str))
        .trim()
        .split("\r\n");
    //make triplets
    var temp2 = temp1.map(function (x) { return x.trim().split(" "); });
    //convert all strings to numbers
    return temp2.map(function (x) { return x.map(function (y) { return parseInt(y); }); });
};
var convertSourceToDestination = function (desc, source, arg_map) {
    console.log("---------------------------------" + desc);
    //general vars
    var chosen_source_entity = source;
    var chosen_triplet_index = null;
    var final_destination;
    //check in map if the source fits in some range
    arg_map.forEach(function (triplet, index) {
        var source_range_start = triplet[1];
        var source_range_end = triplet[1] + triplet[2];
        if (source_range_start <= chosen_source_entity &&
            chosen_source_entity <= source_range_end) {
            console.log("Found in triplet index: " + index);
            chosen_triplet_index = index;
        }
    });
    //handle if no match is found
    if (chosen_triplet_index === null) {
        console.log("No match found, setting destination to same number as source: " +
            chosen_source_entity);
        final_destination = chosen_source_entity;
    }
    else {
        //if found convert source number through that triplet
        var modifier = chosen_source_entity - arg_map[chosen_triplet_index][1];
        //calculate destination
        final_destination = arg_map[chosen_triplet_index][0] + modifier;
        console.log("Match found, destination set to: " + final_destination);
    }
    return final_destination;
};
exports.convertSourceToDestination = convertSourceToDestination;
var processOneSeeeAndReturnLocation = function (seed, seed_index, mapping) {
    console.log("Processing seed index ".concat(seed_index, " ################################# "));
    var soil = (0, exports.convertSourceToDestination)("Seed to soil", seed, mapping.seed_to_soil.map);
    var fertilizer = (0, exports.convertSourceToDestination)("Soil to fertilizer", soil, mapping.arr_soil_to_fertilizer.map);
    var water = (0, exports.convertSourceToDestination)("Fertilizer to water", fertilizer, mapping.arr_fertilizer_to_water.map);
    var light = (0, exports.convertSourceToDestination)("Water to light", water, mapping.arr_water_to_light.map);
    var temperature = (0, exports.convertSourceToDestination)("Light to temperature", light, mapping.arr_light_to_temperature.map);
    var humidity = (0, exports.convertSourceToDestination)("Temperature to humidity", temperature, mapping.arr_temperature_to_humidity.map);
    var location = (0, exports.convertSourceToDestination)("Humidity to location", humidity, mapping.arr_humidity_to_location.map);
    return location;
};
exports.processOneSeeeAndReturnLocation = processOneSeeeAndReturnLocation;

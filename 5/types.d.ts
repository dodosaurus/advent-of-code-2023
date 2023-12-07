export type Mapping = {
  seed: number[];
  seed_to_soil: SingleMap;
  arr_soil_to_fertilizer: SingleMap;
  arr_fertilizer_to_water: SingleMap;
  arr_water_to_light: SingleMap;
  arr_light_to_temperature: SingleMap;
  arr_temperature_to_humidity: SingleMap;
  arr_humidity_to_location: SingleMap;
};

export type SingleMap = {
  source: string;
  destination: string;
  map: number[][];
};

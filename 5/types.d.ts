export type Mapping = {
  seed: number[][];
  seed_to_soil: SingleMap;
  soil_to_fertilizer: SingleMap;
  fertilizer_to_water: SingleMap;
  water_to_light: SingleMap;
  light_to_temperature: SingleMap;
  temperature_to_humidity: SingleMap;
  humidity_to_location: SingleMap;
};

export type SingleMap = {
  source: string;
  destination: string;
  map: number[][];
};

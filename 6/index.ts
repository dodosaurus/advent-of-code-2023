let fs = require("fs");
let file_str: string = fs.readFileSync("6/test.txt").toString();

let speed

//parse input
let rows = file_str.split("\r\n");
let times = rows[0]
  .split(" ")
  .map((x: string) => parseInt(x))
  .filter((x: number) => !isNaN(x));
let distances = rows[1]
  .split(" ")
  .map((x: string) => parseInt(x))
  .filter((x: number) => !isNaN(x));

let races = times.map((time, index) => {
  return [time, distances[index]];
});

console.log({ races });

races = [[63789468, 411127420471035]]
let results: number[] = []

races.forEach((race, index) => {
  let win_scenarios = 0

  for(let time = 0; time <= race[0]; time++) {
    let holding_button = time
    let speed = time

    //remaining time
    let remaining_time = race[0] - holding_button

    //total distance traveled
    let total_distance = speed * remaining_time

    //when is better than record increment counter
    if (total_distance > race[1]) win_scenarios++
  }

  results.push(win_scenarios)
})

console.log({results})
console.log(results.reduce( (a, b) => a * b ))





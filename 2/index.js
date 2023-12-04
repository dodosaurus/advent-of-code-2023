let fs = require("fs");
let games = fs.readFileSync("2/input.txt").toString().split("\n");
let final_sum = 0;

const game_to_compare = {
  blue: 14,
  green: 13,
  red: 12,
};

games.forEach((one_game) => {
  // let one_game =
  //   "Game 1: 1 blue, 1 red; 10 red; 8 red, 1 blue, 1 green; 1 green, 5 blue";
  console.log(one_game);
  let tryouts = one_game.split(":")[1].split('\r')[0].split(";");
  console.log(tryouts)
  let game_number = parseInt(one_game.split(":")[0].split(" ")[1]);

  console.log(game_number)
  let one_game_objarr = [];

  tryouts.forEach((tryout) => {
    let parsed_tryout = tryout.split(" ");
    parsed_tryout = parsed_tryout.splice(1, parsed_tryout.length - 1);

    //now pair colors with numbers
    for (let i = 0; i <= parsed_tryout.length - 1; i = i + 2) {
      one_game_objarr.push({
        number: parseInt(parsed_tryout[i]),
        color: parsed_tryout[i + 1].split(",")[0],
      });
    }
  });

  console.log(one_game_objarr)

  let highest = {
    blue: 0,
    green: 0,
    red: 0,
  };

  one_game_objarr.forEach((item) => {
    if (item.color === "blue" && item.number >= highest.blue) {
      highest.blue = item.number
    }
    if (item.color === "green" && item.number >= highest.green) {
      highest.green = item.number
    }
    if (item.color === "red" && item.number >= highest.red) {
      highest.red = item.number
    }
  });

  console.log(highest)

  if (
    game_to_compare.blue >= highest.blue &&
    game_to_compare.green >= highest.green &&
    game_to_compare.red >= highest.red
  ) {
    final_sum = final_sum + game_number;
  }
});

console.log("Vysledok: " + final_sum);

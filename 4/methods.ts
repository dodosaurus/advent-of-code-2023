import type { Card } from "./types";

let fs = require("fs");

export const processTxt = (path: string): Card[] => {
  let temp_arr: string[] = fs.readFileSync(path).toString().split("\n");
  temp_arr = temp_arr.map((item) => item.split("\r")[0].slice(10));

  let main_arr: Card[] = [];

  main_arr = temp_arr.map((item, index) => ({
    card_index: index,
    card_no: index + 1,
    winning_numbers: item
      .split("|")[0]
      .split(" ")
      .filter((member) => member != "")
      .map((member) => parseInt(member)),
    my_numbers: item
      .split("|")[1]
      .split(" ")
      .filter((member) => member != "")
      .map((member) => parseInt(member)),
    count: 1,
  }));

  return main_arr;
};

export const mainLoop = (main: Card[], winning_nums_counter: number) => {
  let cap_for_count_iterator: number;

  main.forEach((obj, index) => {
    console.log(
      "------------------------------ CARD NO. " +
        obj.card_no +
        " have copies: " +
        obj.count
    );
    console.time(`Card process time`);

    let are_wins_counted: boolean = false;
    winning_nums_counter = 0;
    cap_for_count_iterator = 0;

    //repeat per count of card
    for (let x = 1; x <= obj.count; x++) {
      if (!are_wins_counted) {
        obj.winning_numbers.forEach((win_num) => {
          obj.my_numbers.forEach((my_num) => {
            if (win_num == my_num) {
              winning_nums_counter++;
            }
          });
        });
      }

      are_wins_counted = true;

      // console.log("card no: " + obj.card_no + " winning_numbers: " + winning_nums_counter);

      if (winning_nums_counter > main.length - 1 - index) {
        cap_for_count_iterator = main.length - 1 - index;
      } else {
        cap_for_count_iterator = winning_nums_counter;
      }

      // console.log("cap_for_count_iterator: " + cap_for_count_iterator);

      for (let i = 1; i <= cap_for_count_iterator; i++) {
        main[index + i].count++;
      }
    }
    console.timeEnd(`Card process time`);
  });
};

let fs = require("fs");
let file_str: string = fs.readFileSync("7/test.txt").toString();

//parse input
let rows = file_str.split("\r\n");
let str_arr: string[][] = rows.map((row: string) => {
  return row.split(" ");
});

let hands: Hand[] = str_arr.map((card: any[]) => {
  card[1] = parseInt(card[1]);
  return card as Hand;
});

console.log(hands);

type Hand = [string, number];

type Combinations = {
  five_of_a_kind: Hand[];
  four_of_a_kind: Hand[];
  full_house: Hand[];
  three_of_a_kind: Hand[];
  two_pairs: Hand[];
  one_pair: Hand[];
  high_card: Hand[];
};

const combinations: Combinations = {
  five_of_a_kind: [],
  four_of_a_kind: [],
  full_house: [],
  three_of_a_kind: [],
  two_pairs: [],
  one_pair: [],
  high_card: [],
};

//each hand should be checked first for play combinations
hands.forEach((hand) => {
  //each hand need to be converted to array of values
  let arr = hand[0].split("");

  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
    }

  }

  //then each hand need to go through combination check and be sorted into combination arrays
});

//then each hand in combination category should be checked for highest card

console.log(combinations);

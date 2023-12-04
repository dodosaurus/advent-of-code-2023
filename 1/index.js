var fs = require("fs");
var array = fs.readFileSync("input.txt").toString().split("\n");
var sum = 0;
let array_to_sum = [];

//mapping
const wordly_digits = [
  { digit_text: "one", digit_num: "1" },
  { digit_text: "two", digit_num: "2" },
  { digit_text: "three", digit_num: "3" },
  { digit_text: "four", digit_num: "4" },
  { digit_text: "five", digit_num: "5" },
  { digit_text: "six", digit_num: "6" },
  { digit_text: "seven", digit_num: "7" },
  { digit_text: "eight", digit_num: "8" },
  { digit_text: "nine", digit_num: "9" },
];

//helper functions
const findDigitWord = (word, excluded_digit_nums) => {
  if (word.length >= 3) {
    let results = wordly_digits.filter(
      (item) =>
        word.includes(item.digit_text) &&
        !excluded_digit_nums.includes(item.digit_num)
    );

    if (results.length != 0) {
      console.log(`TEXT NUMBER FOUND -> ${results[0].digit_num}`);
      return results[0].digit_num;
    }

    return null;
  }
};

//main loop
for (i in array) {
  let raw_row = array[i];
  console.log(raw_row);

  let row_of_numbers = "";
  let two_digits = "";
  let temp_word = "";
  let found_text_digits = [];

  for (const char of raw_row) {
    if (char >= "0" && char <= "9") {
      row_of_numbers = row_of_numbers + char;
      console.log(`NUMBER FOUND -> ${char}`);
      temp_word = "";
      found_text_digits = [];
    } else {
      temp_word = temp_word + char;
      let possible_digit = findDigitWord(temp_word, found_text_digits);
      if (possible_digit) {
        row_of_numbers = row_of_numbers + possible_digit;
        found_text_digits.push(possible_digit);
        // temp_word = "";
      }
    }
  }

  console.log(row_of_numbers);
  two_digits = row_of_numbers[0] + row_of_numbers[row_of_numbers.length - 1];

  console.log(parseInt(two_digits) + "\n");

  array_to_sum.push(parseInt(two_digits));
  // sum = sum + parseInt(two_digits);
  sum = array_to_sum.reduce((partialSum, a) => partialSum + a, 0);
}

// console.dir(array_to_sum, {'maxArrayLength': null});
console.log("Vysledok: " + sum);

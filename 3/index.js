//140 rows x 141 columns two-dimensional array

//[][][][][][][][][][][][][][][][][][][][][][][][]
//[][][][][][][][][][][][][][][][][][][][][][][][]
//[][][][][][][][][][][][][][][][][][][][][][][][]
//[][][][][][][][][][][][][][][][][][][][][][][][]
//[][][][][][][][][][][][][][][][][][][][][][][][]
//[][][][][][][][][][][][][][][][][][][][][][][][]

let fs = require("fs");
let rows = fs.readFileSync("3/input.txt").toString().split("\n");

const one_row_length = 140;
const symbols = ["*", "-", "#", "/", "=", "%", "$", "&", "@", "+"];

let coordinates_with_nums = [];

//wrappers
const noteLocationOfNum = (column, row) => {
  coordinates_with_nums.push({
    row: row,
    column: column,
  });
};

const isAlreadyCheckedLocationOfNum = (compared_row, compared_column) => {
  let results = coordinates_with_nums.filter(
    (item) => item.row === compared_row && item.column === compared_column
  );

  if (results.length != 0) {
    return true;
  } else {
    return false;
  }
};

const charIsNumber = (ch) => {
  return ch >= "0" && ch <= "9";
};

const lookForWholeNumberInRow = (index_of_number, row_array, row_index) => {
  let finalNumber = "" + row_array[index_of_number];
  noteLocationOfNum(index_of_number, row_index)

  //look left
  let pasteToLeft = "";
  for (let k = index_of_number - 1; k >= 0; k--) {
    if (charIsNumber(row_array[k])) {
      noteLocationOfNum(k, row_index)
      pasteToLeft = row_array[k] + pasteToLeft;
    } else {
      break;
    }
  }

  console.log(`To left: ${pasteToLeft}`);

  //look right
  let pasteToRight = "";
  for (let l = index_of_number + 1; l <= one_row_length; l++) {
    if (charIsNumber(row_array[l])) {
      noteLocationOfNum(l, row_index)
      pasteToRight = pasteToRight + row_array[l];
    } else {
      break;
    }
  }

  console.log(`To right: ${pasteToRight}`);

  finalNumber = parseInt(pasteToLeft + finalNumber + pasteToRight);

  // if (!result_array_of_parts.includes(finalNumber)) {
  //   result_array_of_parts.push(finalNumber);
  // }

  result_array_of_parts.push(finalNumber);

  console.log(result_array_of_parts);
};

let two_dims = [];
let result_array_of_parts = [];

rows.map((row) => {
  let temp_arr = row.split("\r")[0].split("");
  two_dims.push(temp_arr);
});

// [".", "*", "-", "#", "/", "=", "%", "$", "&", "@", "+"];
// console.log(symbols)

//iterate over two_dim until we find one of the symbols, look around the symbol if we find a number (8 possible locations)
//if is found, switch to function which will jump to the position of found number and checks minus/plus positions in row until symbol or dot !!! (.) is found and compose number
//and save it to array of numbers/parts (I assume that parts will be UNIQUE (THEY ARE NOOOOOOOOOOOT), so there will be check if it isn't already in)
//then jump back to checking around symbol and continue, if not all 8 locations were checked already

// two_dims = two_dims.slice(0, 111);

//MAIN
for (let i = 0; i <= two_dims.length - 1; i++) {
  console.log("Riadok cislo " + i);
  //symbol finder
  for (let j = 0; j <= two_dims[i].length - 1; j++) {
    if (symbols.includes(two_dims[i][j])) {
      console.log(`Symbol found on row index ${i} and on column index ${j}`);

      //right
      if (charIsNumber(two_dims[i][j + 1])) {
        console.log("Number found right of symbol.");
        if (!isAlreadyCheckedLocationOfNum(i, j + 1)) {
          lookForWholeNumberInRow(j + 1, two_dims[i], i);
        }
      }
      //left
      if (charIsNumber(two_dims[i][j - 1])) {
        console.log("Number found left of symbol.");
        if (!isAlreadyCheckedLocationOfNum(i, j - 1)) {
          lookForWholeNumberInRow(j - 1, two_dims[i], i);
        }
      }

      //check if we aren't on last row (down is not possible)
      if (i != two_dims.length - 1) {
        //right-down
        if (charIsNumber(two_dims[i + 1][j + 1])) {
          console.log("Number found right-down of symbol.");
          if (!isAlreadyCheckedLocationOfNum(i + 1, j + 1)) {
            lookForWholeNumberInRow(j + 1, two_dims[i + 1], i + 1);
          }
        }
        //down
        if (charIsNumber(two_dims[i + 1][j])) {
          console.log("Number found down of symbol.");
          if (!isAlreadyCheckedLocationOfNum(i + 1, j)) {
            lookForWholeNumberInRow(j, two_dims[i + 1], i + 1);
          }
        }
        //left-down
        if (charIsNumber(two_dims[i + 1][j - 1])) {
          console.log("Number found left-down of symbol.");
          if (!isAlreadyCheckedLocationOfNum(i + 1, j - 1)) {
            lookForWholeNumberInRow(j - 1, two_dims[i + 1], i + 1);
          }
        }
      }

      //check if we aren't on first row (up is not possible)
      if (i != 0) {
        //left-up
        if (charIsNumber(two_dims[i - 1][j - 1])) {
          console.log("Number found left-up of symbol.");
          if (!isAlreadyCheckedLocationOfNum(i - 1, j - 1)) {
            lookForWholeNumberInRow(j - 1, two_dims[i - 1], i - 1);
          }
        }
        //up
        if (charIsNumber(two_dims[i - 1][j])) {
          console.log("Number found up of symbol.");
          if (!isAlreadyCheckedLocationOfNum(i - 1, j)) {
            lookForWholeNumberInRow(j, two_dims[i - 1], i - 1);
          }
        }
        //right-up
        if (charIsNumber(two_dims[i - 1][j + 1])) {
          console.log("Number found right-up of symbol.");
          if (!isAlreadyCheckedLocationOfNum(i - 1, j + 1)) {
            lookForWholeNumberInRow(j + 1, two_dims[i - 1], i - 1);
          }
        }
      }
    }
  }
}

console.log(result_array_of_parts);

let test = result_array_of_parts.filter(item => item === 851)
console.log(test)

sum = result_array_of_parts.reduce((partialSum, a) => partialSum + a, 0);

console.log("Vysledok " + sum);

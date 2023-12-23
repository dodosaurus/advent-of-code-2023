var fs = require("fs");
var file_str = fs.readFileSync("7/test.txt").toString();
//parse input
var rows = file_str.split("\r\n");
var str_arr = rows.map(function (row) {
    return row.split(" ");
});
var hands = str_arr.map(function (card) {
    card[1] = parseInt(card[1]);
    return card;
});
console.log(hands);
var combinations = {
    five_of_a_kind: [],
    four_of_a_kind: [],
    full_house: [],
    three_of_a_kind: [],
    two_pairs: [],
    one_pair: [],
    high_card: [],
};
//each hand should be checked first for play combinations
hands.forEach(function (hand) {
    //each hand need to be converted to array of values
    var arr = hand[0].split("");
    for (var i = 0; i < arr.length; i++) {
        var count = 0;
        for (var j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                count++;
            }
        }
        switch (count) {
            case 5:
                combinations.five_of_a_kind.push(hand);
                break;
            case 4:
                combinations.four_of_a_kind.push(hand);
                break;
            case 3:
                combinations.three_of_a_kind.push(hand);
                break;
            case 2:
                combinations.one_pair.push(hand);
                break;
            case 1:
                combinations.high_card.push(hand);
                break;
        }
    }
    //then each hand need to go through combination check and be sorted into combination arrays
});
//then each hand in combination category should be checked for highest card
console.log(combinations);

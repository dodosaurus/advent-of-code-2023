var fs = require("fs");
var file_str = fs.readFileSync("6/test.txt").toString();
var speed;
//parse input
var rows = file_str.split("\r\n");
var times = rows[0]
    .split(" ")
    .map(function (x) { return parseInt(x); })
    .filter(function (x) { return !isNaN(x); });
var distances = rows[1]
    .split(" ")
    .map(function (x) { return parseInt(x); })
    .filter(function (x) { return !isNaN(x); });
var races = times.map(function (time, index) {
    return [time, distances[index]];
});
console.log({ races: races });
races = [[63789468, 411127420471035]];
var results = [];
races.forEach(function (race, index) {
    var win_scenarios = 0;
    for (var time = 0; time <= race[0]; time++) {
        var holding_button = time;
        var speed_1 = time;
        //remaining time
        var remaining_time = race[0] - holding_button;
        //total distance traveled
        var total_distance = speed_1 * remaining_time;
        //when is better than record increment counter
        if (total_distance > race[1])
            win_scenarios++;
    }
    results.push(win_scenarios);
});
console.log({ results: results });
console.log(results.reduce(function (a, b) { return a * b; }));

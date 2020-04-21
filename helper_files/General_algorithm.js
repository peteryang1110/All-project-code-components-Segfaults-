// five hash sets for five weekdays
var a = new Array(5);
for (let i = 0; i < 5; i++) {
  a[i] = new Set();
}

// parse the time of a class into start time and end time.
function parseTime(timeString) {
  var time = timeString.split(" ");
  var startString = time[0].split(":");
  var startInt = parseInt(startString[0]);
  if (time[1] == "PM" && startInt != 12) startInt += 12;
  var endString = time[3].split(":");
  var endInt = parseInt(endString[0]);
  if (time[4] == "PM" && endInt != 12) endInt += 12;
  if (parseInt(endString[1]) == 0) endInt -= 1;
  var output = [];
  output.push(startInt);
  output.push(endInt);
  return output;
}

// input the time to sets
function inputSet(timeArray, hashset, dayArray) {
  for (var i = 0; i < dayArray.length; i++) {
    var day = dayArray[i];
    for (var j = timeArray[0]; j <= timeArray[1]; j++) {
      hashset[day].add(j);
    }
  }
}

// check if the time period is available
function checkSet(timeArray, hashset, dayArray) {
  for (var i = 0; i < dayArray.length; i++) {
    var day = dayArray[i];
    for (var j = timeArray[0]; j <= timeArray[1]; j++) {
      if (hashset[day].has(j)) {
        return false;
      }
    }
  }
  return true;
}

// tranform the string of weekdays into an array.
function parseWeekday(dayString) {
  const dayOfWeek = ["M", "T", "W", "TH", "F"];
  var dayArray = [];
  if (dayString.includes("-")) {
    var tmp = dayString.split("-");
    for (
      var i = dayOfWeek.indexOf(tmp[0]);
      i <= dayOfWeek.indexOf(tmp[1]);
      i++
    ) {
      dayArray.push(i);
    }
  } else {
    for (var i = 0; i < dayString.length; i++) {
      switch (dayString[i]) {
        case "M":
          dayArray.push(0);
          break;
        case "T":
          if (i + 1 < dayString.length && dayString[i + 1] != "H") {
            dayArray.push(1);
          } else {
            i += 1;
            dayArray.push(3);
          }
          break;
        case "W":
          dayArray.push(2);
          break;
        case "F":
          dayArray.push(4);
          break;
        default:
      }
    }
  }
  return dayArray;
}

// information[i][n]
// i = different subject, n = different section
// information[i][n].time will give us the time of the class
// information[i][n].days will give us the weekdays of the class
var all = new Array(7); // this is just a simulation
all[0] = [
  { name: "test1", time: "11:00 AM - 12:15 PM", days: "MF" },
  { name: "test11", time: "1:00 PM - 2:00 PM", days: "MF" },
];
all[1] = [{ name: "test2", time: "1:00 PM - 2:00 PM", days: "MF" }];
all[2] = [{ name: "test3", time: "2:00 PM - 3:15 PM", days: "MF" }];
all[3] = [{ name: "test4", time: "3:00 PM - 3:15 PM", days: "MF" }];
all[4] = [{ name: "test5", time: "3:00 PM - 3:15 PM", days: "MF" }];
all[5] = [{ name: "test6", time: "2:00 PM - 2:15 PM", days: "MF" }];
all[6] = [{ name: "test7", time: "2:00 PM - 2:15 PM", days: "MF" }];

function test(output, cur, allArray, index, set, max) {
  if (cur.length == max) {
    output.push(cur);
    return;
  }
  if (index == max) {
    return;
  }
  for (var i = 0; i < allArray[index].length; i++) {
    var timeArray = parseTime(allArray[index][i].time);
    var dayArray = parseWeekday(allArray[index][i].days);
    if (checkSet(timeArray, set, dayArray)) {
      var tmpSet = new Array(5);
      for (var j = 0; j < 5; j++) {
        tmpSet[j] = new Set(set[j]);
      }
      inputSet(timeArray, tmpSet, dayArray);
      var tmpOutput = cur.slice();
      tmpOutput.push(allArray[index][i]);
      test(output, tmpOutput, allArray, index + 1, tmpSet, max);
    }
  }
}

var output = [];
var cur = [];
var m = 4;
test(output, cur, all, 0, a, m);
console.log(output);
// var t = "12:30 PM - 02:01 PM";
// var time = parseTime(t);
// console.log(time);
// var dayString = [0, 1, 2];
// inputSet(time, a, dayString);
// console.log(a[1].has(12));
// console.log(checkSet([12, 17], a, [2, 3]));
// var t = "TTH";
// console.log(parseWeekday(t));

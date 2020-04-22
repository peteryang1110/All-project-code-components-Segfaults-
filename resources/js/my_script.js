// parse the time of a class into start time and end time.
function parseTime(start, end) {
  var startString = start.split(":");
  var startTime = startString[0];
  var endString = end.split(":");
  var endTime = endString[0];
  if (endString[1] == 0) endTime = (parseInt(endString[0]) - 1).toString();
  var output = [];
  output.push(startTime);
  output.push(endTime);
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

function schedulerHelper(output, cur, allArray, index, set, max) {
  if (output.length == 3) {
    return;
  }
  if (cur.length == max) {
    output.push(cur);
    return;
  }
  if (index == max) {
    return;
  }
  for (var i = 0; i < allArray[index].length; i++) {
    var timeArray = parseTime(
      allArray[index][i].course_start,
      allArray[index][i].course_end
    );
    var dayArray = parseWeekday(allArray[index][i].course_days);
    if (checkSet(timeArray, set, dayArray)) {
      var tmpSet = new Array(5);
      for (var j = 0; j < 5; j++) {
        tmpSet[j] = new Set(set[j]);
      }
      inputSet(timeArray, tmpSet, dayArray);
      var tmpOutput = cur.slice();
      tmpOutput.push(allArray[index][i]);
      schedulerHelper(output, tmpOutput, allArray, index + 1, tmpSet, max);
    }
  }
}

function scheduler(allArray, max) {
  var output = [];
  var cur = [];
  var daySet = new Array(5);
  for (let i = 0; i < 5; i++) {
    a[i] = new Set();
  }
  schedulerHelper(output, cur, allArray, 0, daySet, max);
  return output;
}

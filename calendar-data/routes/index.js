var express = require('express');
var catalog = require('../data/catalog');
var router = express.Router();
var _ = require('underscore');

/* GET home page. */

function formatTime(time) {
  if (time < 12) {
    return time + 'am';
  } else if (time === 12) {
    return '12pm';
  } else {
    return (time - 12) + 'pm';
  }
}

function day(i) {
  return Math.round(i / 10) % 5
}

function getDays(i) {
  var remainder = i % 3;
  if (remainder == 0) {
    return [1, 3, 5]
  } else if (remainder === 1) {
    return [2, 4];
  } else {
    return [3];
  }
}

var dayFormat = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday'
}


router.get('/', function(req, res) {
  res.render('index');
});

router.get('/catalog', function(req, res) {
  res.json(catalog);
});

router.get('/bigCatalog', function(req, res) {
  var courses = [],
    time = [],
    startTime, endTime, i, days;
  for (i = 0; i < 100; i++) {
    startTime = i % 9 + 7;
    endTime = startTime + 2;
    days = getDays(i);
    courses.push({
      id: i,
      name: 'Spectaular Course ' + i,
      author: 'Jeannie Doe ' + i,
      timeIndex: [startTime, endTime],
      dayIndex: days,
      time: [formatTime(startTime), formatTime(endTime)],
      days: _(days).map(function(day) { return dayFormat[day];})
    });
  }
  res.json({courses: courses});
})

module.exports = router;

/* globals require */
var $ = require('jquery');
var queryParams = require('query-params');

var timerEl;
var bodyEl = $('body');

var timeInSeconds;
var startTime = Date.now();
var endTime;
var blinkFlag = false;
var soundPlayCount = 0;
params = queryParams.decode(location.search.substring(1));
timeInSeconds = params.time;
endTime = startTime + parseInt(timeInSeconds * 1000);

setInterval(function() {
    var currentTime = Date.now();
    var diffInSeconds = (endTime - currentTime) / 1000;
    var minutes = getMinutes(diffInSeconds);
    var seconds = getSeconds(diffInSeconds);

    timerEl = $('[timer-text]');
    bodyEl = $('body');

    if (diffInSeconds <= 0) {
        minutes = '00';
        seconds = '00';

        if (blinkFlag) {
            timerEl.css('color', 'white');
        } else {
            timerEl.css('color', 'black');
        }

        blinkFlag = !blinkFlag;

        if (soundPlayCount++ < 6) {
            var ding = new Audio('assets/ding.mp3');
            ding.play();
        }
    }
    else if (diffInSeconds <= 60) {
        bodyEl.css('background-color', 'red');
    } else if (diffInSeconds <= 180) {
        bodyEl.css('background-color', 'yellow');
    }

    timerEl.text(minutes + ':' + seconds);
}, 250);

function getMinutes(totalSeconds) {
    return format(Math.floor(totalSeconds / 60));
}

function getSeconds(totalSeconds) {
    return format(Math.floor(totalSeconds % 60));
}

function format(num) {
    return num < 10 ? '0' + num : num;
}

import Player from '@vimeo/player';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);
const throttle = require('lodash.throttle');
const CURRENT_TIME = 'videoplayer-current-time';

let savedTime = localStorage.getItem(CURRENT_TIME);
let storageTime = checkStorageTime(savedTime);

player.setCurrentTime(storageTime).then(function (seconds) {});

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function checkStorageTime(time) {
  return time ? JSON.parse(time) : 0;
}

function saveCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(CURRENT_TIME, JSON.stringify(seconds));
  });
}

import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);
const CURRENT_TIME = 'videoplayer-current-time';

let savedTime = localStorage.getItem(CURRENT_TIME);
let storageTime = checkStorageTime(savedTime);

player.setCurrentTime(storageTime).then(function (seconds) {});

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function checkStorageTime(time) {
  try {
    return time ? JSON.parse(time) : 0;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function saveCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(CURRENT_TIME, JSON.stringify(seconds));
  });
}

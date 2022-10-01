var isWatchPage = false;
var onloadData = {};

function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

function setPlayerSize() {
  if (!isWatchPage || !isYspActive()) {
    document.body.style.removeProperty('--video-width');
    document.body.style.removeProperty('--video-height');

  } else {
    var ytd_watch_flexy = document.querySelector('ytd-watch-flexy[flexy]');
    var video_element = document.getElementById('movie_player').getElementsByTagName('video')[0];
    var yt_styles = window.getComputedStyle(ytd_watch_flexy);

    var chat_width = parseInt(yt_styles.getPropertyValue('--ytd-watch-flexy-sidebar-width'), 10);
    var masthead_height = parseInt(yt_styles.getPropertyValue('--ytd-watch-flexy-masthead-height'), 10);
    var margin_6x = parseInt(yt_styles.getPropertyValue('--ytd-margin-6x'), 10);
    var space_under_video = parseInt(yt_styles.getPropertyValue('--ytd-watch-flexy-space-below-player'), 10);

    var available_width = vw(100) - chat_width - margin_6x;
    var available_height = vh(100) - masthead_height - space_under_video - margin_6x;

    var target_width = 0;
    var target_height = 0;

    var ratio_width = parseFloat(yt_styles.getPropertyValue('--ytd-watch-flexy-width-ratio'));
    var ratio_height = parseFloat(yt_styles.getPropertyValue('--ytd-watch-flexy-height-ratio'));
    var ratio = ratio_width / ratio_height;

    if (available_width / ratio < available_height) {
      target_width = available_width;
      target_height = available_width / ratio;

    } else {
      target_width = available_height * ratio;
      target_height = available_height
    }

    document.body.style.setProperty('--video-width', target_width + 'px');
    document.body.style.setProperty('--video-height', target_height + 'px');
  }
}

function locationChanged(event) {
  if (!isYspActive()) return;

  isWatchPage = event.detail.pageType === 'watch';

  setTimeout(() => {
    updateBodyClass();
    setPlayerSize();
  }, 1000);
}

function updateBodyClass() {
  var bodyClass = 'yt-stream-page';

  if (isWatchPage) {
    document.getElementsByTagName('body')[0].classList.add(bodyClass);

  } else {
    document.getElementsByTagName('body')[0].classList.remove(bodyClass);
  }
}

function isDarkThemeActive() {
  return document.querySelector('html').hasAttribute('dark');
}

function isYspActive() {
  var bodyClass = 'yt-stream-page';
  return document.getElementsByTagName('body')[0].classList.contains(bodyClass);
}

function addControls() {
  var theme = isDarkThemeActive() ? 'dark' : 'light';

  var ysp_menu_button = document.createElement('img');
  ysp_menu_button.addEventListener('click', ypsButtonClick);
  ysp_menu_button.alt = 'Click to disable YouTube Stream Page';
  ysp_menu_button.classList.add('ysp-menu-button');
  ysp_menu_button.classList.add('ytd-masthead');
  ysp_menu_button.src = onloadData.img['ysp_active_' + theme];
  ysp_menu_button.title = 'Click to disable YouTube Stream Page';

  var top_right_menu = document.querySelector('#masthead #end #buttons');
  top_right_menu.insertBefore(ysp_menu_button, top_right_menu.firstChild);
}

function ypsButtonClick(event) {
  toggleYspActiveClass();
}

function toggleYspActiveClass() {
  var theme = isDarkThemeActive() ? 'dark' : 'light';
  var bodyClass = 'yt-stream-page';
  var bodyClassList = document.getElementsByTagName('body')[0].classList;
  var ysp_menu_button = document.querySelector('.ysp-menu-button');

  if (bodyClassList.contains(bodyClass)) {
    bodyClassList.remove(bodyClass);
    ysp_menu_button.alt = 'Click to enable YouTube Stream Page';
    ysp_menu_button.src = onloadData.img['ysp_inactive_' + theme];
    ysp_menu_button.title = 'Click to enable YouTube Stream Page';

  } else {
    bodyClassList.add(bodyClass);
    ysp_menu_button.alt = 'Click to disable YouTube Stream Page';
    ysp_menu_button.src = onloadData.img['ysp_active_' + theme];
    ysp_menu_button.title = 'Click to disable YouTube Stream Page';
  }
}

function yspOnload(event) {
  onloadData = event.detail;
}

function init() {
  // listen to extension data
  window.addEventListener('ysp-onload', yspOnload);

  // listen to location changed
  window.addEventListener('yt-navigate-finish', locationChanged, true)

  // listen to resizes
  window.addEventListener('resize', setPlayerSize, true);

  isWatchPage = document.location.pathname == '/watch';

  // this delay is for YouTube's layout to load
  setTimeout(() => {
    addControls();
    updateBodyClass();
    setPlayerSize();
  }, 2000);
}

init();

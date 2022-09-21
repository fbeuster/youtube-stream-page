function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

function setPlayerSize() {
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

  var ratio_width = parseInt(yt_styles.getPropertyValue('--ytd-watch-flexy-width-ratio'), 10);
  var ratio_height = parseInt(yt_styles.getPropertyValue('--ytd-watch-flexy-height-ratio'), 10);
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

setTimeout(() => {
  if (document.getElementById('chat') != null) {
    document.getElementsByTagName('body')[0].classList.add('yt-stream-page');

    setPlayerSize();

    window.addEventListener('resize', setPlayerSize, true);
  }
}, 2000);
var user_settings = {};

function loadStorage() {
  chrome.storage.sync.get({
    is_active: true
  }, function(items) {
    user_settings.is_active = items.is_active
  });
}

function addScript(filename) {
  var script = document.createElement("script");
  script.src = chrome.runtime.getURL(filename);
  script.type = "text/javascript";
  document.getElementsByTagName("body")[0].appendChild(script);

  // sending data over when loading
  script.onload = function() {
    var data = {
      'img' : {
        'ysp_active_dark' : chrome.runtime.getURL('img/ysp_active_dark.png'),
        'ysp_active_light' : chrome.runtime.getURL('img/ysp_active_light.png'),
        'ysp_inactive_dark' : chrome.runtime.getURL('img/ysp_inactive_dark.png'),
        'ysp_inactive_light' : chrome.runtime.getURL('img/ysp_inactive_light.png')
      },
      'user_settings' : user_settings
    };

    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('ysp-onload', true, true, data);
    document.dispatchEvent(event);
  }
}

function addstylesheet(filename) {
  var link = document.createElement("link");
  link.href = chrome.runtime.getURL(filename);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function yspSettingsChange(event) {
  chrome.storage.sync.set({
    is_active: event.detail.is_active
  });
}

if (window.location.href.match(/(https:\/\/(.*youtube\.com\/.*))/i)){
  loadStorage();
  addScript("js/watchpage.js");
  addstylesheet("css/watchpage.css");

  window.addEventListener('ysp-settings-user-change', yspSettingsChange);
}
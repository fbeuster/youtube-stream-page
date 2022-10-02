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
      'settings' : {
        'is_active' : true
      }
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

if (window.location.href.match(/(https:\/\/(.*youtube\.com\/.*))/i)){
  addScript("js/watchpage.js");
  addstylesheet("css/watchpage.css");
}
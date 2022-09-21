function addScript(filename) {
  var script = document.createElement("script");
  script.src = chrome.runtime.getURL(filename);
  script.type = "text/javascript";
  document.getElementsByTagName("body")[0].appendChild(script);
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
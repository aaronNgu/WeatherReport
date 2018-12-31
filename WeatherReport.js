var geo = navigator.geolocation;
var long;
var la;
var apiKey = "1ccc4f6b1ffdd08051436bc7194644da";
var weather;
var api = "api.openweathermap.org/data/2.5/weather?" + "APPID=" + apiKey;

$(document).ready(function(){
  // test whether geolocation is available
  if (geo) {
  // if available do somehting
  geo.getCurrentPosition(function(position){
       long = "&lon=" + position.coords.longitude;
       la = "&lat=" + position.coords.latitude;
      displayWeather(long, la);
    })
  }
  $("#changeUnit").on("click", function(){changeU()});
})

function displayWeather(lon, lat){
  var url = "https://" +  api + lon + lat  + "&format=json";
//  $("#h3").html(url);
  $.getJSON(url, function(data){
    // doesnt run
    var weather = data.weather[0].main;
    var icon = data.weather[0].icon;
    var temp = data.main.temp;
    var city = data.name;
    var country = data.sys.country;
    $("#h1").html(city + ", " + country);
    $("#h2").html(weather);
    //temp in kelvin
    $("#h3").html(Math.round((temp - 273.15)*10/10));
    setIcon(icon);
  })
}

function changeU(){
  var currentTempUnit = $("#changeUnit").text();
  var newTempUnit = currentTempUnit == "' C" ? "' F" :  "' C";
  $("#changeUnit").html(newTempUnit);
  var currentTemp = $("#h3").text();
  var tempF = Math.round(((currentTemp * 1.8 +32)*10)/10);
  var tempC = Math.round((((currentTemp - 32)/1.8)*10)/10);
  var newTemp = currentTempUnit == "' C" ? tempF : tempC;
  $("#h3").html(newTemp);
}

function setIcon(i){
  var iconUrl = "http://openweathermap.org/img/w/" + i + ".png";
  var img = document.getElementById("imge");
  img.src = iconUrl;
}

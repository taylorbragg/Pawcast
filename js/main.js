// add your API key inside the quotes on line 5
// add the latitude and longitude for your location one lines 6 and 7
// move on to adding your data requests on line 22
function weatherBalloon() {
  var key = '17087e94ed71803f318f6473460fddd0';
  var lat = '43.6591';
  var lon = '-70.2568';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

// display weather information
function drawWeather( d ) {

// current day
$('.current-temp h1').html( convertTemp(d.current.feels_like) + '&deg;');
$('.current-temp h2').html( convertTemp(d.daily[0].temp.max) );
$('.current-temp h3').html( convertTemp(d.daily[0].temp.min) );

// current conditions
$('.rain p').html(d.current.pop);
$('.humidity p').html( (d.current.humidity) + '&percnt;');
$('.uv p').html(d.current.uvi);
$('.wind p').html( (d.current.wind_speed) + ' mph');
$('.visibility p').html(d.current.visibility);
$('.air p').html(d.current.pressure);

// day 1
$('.day1 .icon').html( printGraphic(d.daily[1].weather[0].description) );
$('.day1 .temp').html( convertTemp(d.daily[1].temp.day) + '&deg;');
$('.day1 .hum').html( (d.daily[1].humidity) + '&percnt;');

// day 2
$('.day2 .icon').html( printGraphic(d.daily[2].weather[0].description) );
$('.day2 .temp').html( convertTemp(d.daily[2].temp.day) + '&deg;');
$('.day2 .hum').html( (d.daily[2].humidity) + '&percnt;');

// day 3
$('.day3 .icon').html( printGraphic(d.daily[3].weather[0].description) );
$('.day3 .temp').html( convertTemp(d.daily[3].temp.day) + '&deg;');
$('.day3 .hum').html( (d.daily[3].humidity) + '&percnt;');

// day 4
$('.day4 .icon').html( printGraphic(d.daily[4].weather[0].description) );
$('.day4 .temp').html( convertTemp(d.daily[4].temp.day) + '&deg;');
$('.day4 .hum').html( (d.daily[4].humidity) + '&percnt;');

// day 5
$('.day5 .icon').html( printGraphic(d.daily[5].weather[0].description) );
$('.day5 .temp').html( convertTemp(d.daily[5].temp.day) + '&deg;');
$('.day5 .hum').html( (d.daily[5].humidity) + '&percnt;');

// day 6
$('.day6 .icon').html( printGraphic(d.daily[6].weather[0].description) );
$('.day6 .temp').html( convertTemp(d.daily[6].temp.day) + '&deg;');
$('.day6 .hum').html( (d.daily[6].humidity) + '&percnt;');

}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('body').addClass('rainy');

  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('body').addClass('cloudy');

  // if the description includes the word "sunny"  
  } else if( d.indexOf('sunny') > 0 ) {
    $('body').addClass('sunny');

  // if none of those cases are true, assume it's clear
  } else {
    $('body').addClass('clear');
  }

}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/svg/Cloud.svg" alt="Cloud icon">';
  
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/svg/Cloud-Rain.svg" alt="Cloud icon">';
  
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  
  // if none of those cases are true, assume it's clear
  } else {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  }

}


/* -----------------------------------------------
   Function for converting time to hours/minutes
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for creating day of the week
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below

// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "Su";
  weekday[1] = "Mo";
  weekday[2] = "Tu";
  weekday[3] = "We";
  weekday[4] = "Th";
  weekday[5] = "Fr";
  weekday[6] = "Sa";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}

/* --------------------------------------------------
   Cover button click
   -------------------------------------------------- */

$('button').click(function(){
  $('.cover').addClass('open');
})

$(document).ready(function() {
//date and time
var dateTime = moment().format('MMMM Do YYYY');

//input from text field
$(".btn").on("click",function(event){
  event.preventDefault();
  var userinput = $("#city-name").val(); 
 console.log(userinput);
 // This is our API key
var APIKey = "46e10682b797bc3fd80bbc8e8f437f42";
// QueryURL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userinput + ",us&appid=" + APIKey;

 // Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})

  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    console.log(queryURL);
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " " + dateTime, "</h1>");
    $(".temp").html("<h2>" + "Temperature (F) " + response.main.temp, "</h2>");
    $(".humidity").html("<h2>" + "Humidity: " + response.main.humidity, "</h2>");
    $(".wind").html("<h2>" + "Wind Speed: " + response.wind.speed, "</h2>");
    $(".uv").html("<h2>" + "UV Index: " + response.wind.speed, "<h2>");

    // Converts the temp to Kelvin with the below formula
   var tempF = (response.main.temp - 273.15) * 1.80 + 32;
   var tempFar = Math.round(tempF)
    $(".temp").html("<h2>" + "Temperature (F): " + tempFar);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//5 day forecast


 

  
























});





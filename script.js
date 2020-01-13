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

   });
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//5 day forecast
//input from text field
$(".btn").on("click",function(event){
  event.preventDefault();
  var userinput = $("#city-name").val(); 
 console.log(userinput);
 // API key
var APIKey = "46e10682b797bc3fd80bbc8e8f437f42";
// five day forecastURL
var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userinput + ",us&appid=" + APIKey;

var days = [
{
 date: "",
 icon: "",
 temp: "",
 humidity: ""
 },
 {
 date: "",
 icon: "",
 temp: "",
 humidity: ""
 },
 {
 date: "",
 icon: "",
 temp: "",
 humidity: ""
 },
 {
 date: "",
 icon: "",
 temp: "",
 humidity: ""
 },
 {
 date: "",
 icon: "",
 temp: "",
 humidity: ""
 }
 ];

 // Ajax call to API
$.ajax({
  url: fivedayURL,
  method: "GET"
})

.then(function(response) {
    console.log(fivedayURL);
    console.log(response);
       
    //loop to store data
    for (i=0; i < days.length; i ++){
      days[i].date = response.list[i].dt_txt;
      days[i].icon = response.list[i].weather[0].icon;
      days[i].temp = response.list[i].main.temp;
      days[i].humidity = response.list[i].main.humidity;
      }
      console.log(response.list[0].dt);
    //add data of 5 day forecast to html
    $(".date1").append(days[0].date);
    $(".icon1").html("<img src='http://openweathermap.org/img/wn/" + days[0].icon + "@2x.png' alt='Icon depicting current weather.'>");
    $(".humid1").append("Humidity: " + days[0].humidity);
    $(".date2").append(days[1].date);
    $(".icon2").html("<img src='http://openweathermap.org/img/wn/" + days[1].icon + "@2x.png' alt='Icon depicting current weather.'>");
    $(".humid2").append(days[1].humidity);
    $(".date3").append(days[2].date);
    $(".icon3").html("<img src='http://openweathermap.org/img/wn/" + days[2].icon + "@2x.png' alt='Icon depicting current weather.'>");
    $(".humid3").append("Humidity: " + days[2].humidity);
    $(".date4").append(days[3].date);
    $(".icon4").html("<img src='http://openweathermap.org/img/wn/" + days[3].icon + "@2x.png' alt='Icon depicting current weather.'>");
    $(".humid4").append("Humidity: " + days[3].humidity);
    $(".date5").append(days[4].date);
    $(".icon5").html("<img src='http://openweathermap.org/img/wn/" + days[4].icon + "@2x.png' alt='Icon depicting current weather.'>");
    $(".humid5").append("Humidity: " + days[4].humidity);

    console.log(days[0].temp);
  // Converts the temp to Kelvin with the below formula
   var tempF1 = days[0].temp;
   var tempFar1 = Math.round(tempF1 - 273.15) * 1.80 + 32;
   var tempF2 = (days[1].temp - 273.15) * 1.80 + 32;
   var tempFar2 = Math.round(tempF2);
   var tempF3 = (days[2].temp - 273.15) * 1.80 + 32;
   var tempFar3 = Math.round(tempF3);
   var tempF4 = (days[3].temp - 273.15) * 1.80 + 32;
   var tempFar4 = Math.round(tempF4);
   var tempF5 = (days[4].temp - 273.15) * 1.80 + 32;
   var tempFar5 = Math.round(tempF5);
   
   //insert shortend farenheit temp into html
   $(".temp1").append("Temp: " + tempFar1);
   $(".temp2").append("Temp: " + tempFar2);
   $(".temp3").append("Temp: " + tempFar3);
   $(".temp4").append("Temp: " + tempFar4);
   $(".temp5").append("Temp: " + tempFar5);
   console.log(tempF1);
   console.log(tempFar1);
    
    
    

    
  });
});
 //////////////////////////////////////////////////////////////////////////////////////////
//local storage of which I have no idea how to get to work
/*let ul = $("#history");
let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
let data = JSON.parse(localStorage.getItem("items"));

let newli = text => {
    let li = $('<li>').addClass("newcity");
    li.text(text);
    ul.prepend(li);
}
$("#search-btn").click(function () {
    itemsArray.push(userInput);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    newli(userInput);
})

data.forEach(item => {
    newli(item);
    console.log(item);
})
$("#search-button").on("click", function () {
    $(".newcity").remove();
    localStorage.clear();
    $("input").empty();
})*/
});
  






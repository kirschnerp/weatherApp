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
      console.log(days[i]);
    }

    $(".date1").val(days[0].date);
    $(".icon1").attr("href", days[0].icon);
    $(".temp1").val(days[0].temp);
    $(".humid1").val(days[0].humidity);
    $(".date2").text(days[1].dt_txt);
    $(".icon2").attr("href",days[1].icon);
    $(".temp2").text(days[1].temp);
    $(".humid2").text(days[1].humidity);
    $(".date3").text(days[2].dt_txt);
    $(".icon3").attr("href", days[2].icon);
    $(".temp3").text(days[2].temp);
    $(".humid3").text(days[2].humidity);
    $(".date4").text(days[3].dt_txt);
    $(".icon4").attr("href", days[3].icon);
    $(".temp4").text(days[3].temp);
    $(".humid4").text(days[3].humidity);
    $(".date5").text(days[4].dt_txt);
    $(".icon5").attr("href", days[4].icon);
    $(".temp5").text(days[4].temp);
    $(".humid5").text(days[4].humidity);

    // Converts the temp to Kelvin with the below formula
   var tempF1 = (days.temp - 273.15) * 1.80 + 32;
   var tempFar = Math.round(tempF1)
    $(".temp1").text(tempFar);
    $(".temp2").text(tempFar);
    $(".temp3").text(tempFar);
    $(".temp4").text(tempFar);
    $(".temp5").text(tempFar);
    
    

    
  });
});
 //////////////////////////////////////////////////////////////////////////////////////////
//local storage of which I have no idea how to get to work
let ul = $("#history");
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
})
});
  






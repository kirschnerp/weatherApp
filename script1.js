$(document).ready(function () {
    //click listeners 
    $("#search-btn").click(getWeather);
    $("#search-btn").click(fiveDayForecast);
    
    let userInput;
    let time = moment().format("LL");
    let APIKey = "46e10682b797bc3fd80bbc8e8f437f42";

    //Function for current conditions  
    function getWeather(event) {
        event.preventDefault();
        //get value of input field
        if ($(this).attr("id") === "list-group") {
            let a = event.target;
            userInput = $(a).text();
            console.log(userInput);
        } else {
            userInput = $(this).prev().val(); 
        }
        $("#city-name").empty(); //empty search results upon each new search
        
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&APPID=" + APIKey;
        //Ajax call to API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
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
        })

    }
    //end current day call begin Five day forecast call
    function fiveDayForecast() {
        if ($(this).attr("id") === "list-group") {
            let x = event.target;
            userInput = $(x).text();
            console.log(userInput);
        } else {
            userInput = $(this).prev().val(); //getting value of user input
        }
        let dayDisplay = 1;
        let fiveDayCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&APPID=" + myKey;
        //calling the 5 day forecast
        $.ajax({
            url: fiveDayCall,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let listArray = response.list;
            listArray.forEach(element => {   //use for each method to loop through object list
                //   console.log(element);
                let yearDateTime = element.dt_txt;
                //    console.log (yearDatetime);    
                let currentDate = yearDateTime.split(" ")[0]; //splitting the full date
                let currentTime = yearDateTime.split(" ")[1]; //and time  in the object
                
                //getting a specific time of day to pull data from and insert inot the DOM
                if (currentTime === "15:00:00") {
                    let day = currentDate.split("-")[2];
                    let month = currentDate.split("-")[1];
                    let year = currentDate.split("-")[0];
                    $("#day-" + dayDisplay).children(".date-display").html(`${month}/${day}/${year}`);
                    $("#day-" + dayDisplay).children("#daily-icon").attr("src", "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png");
                    $("#day-" + dayDisplay).children("#daily-temp").html(`Temperature: ${parseInt((element.main.temp - 273.15) * 1.8 + 32)}°F`);
                    $("#day-" + dayDisplay).children("#5day-humidity").html(`Humidity: ${element.main.humidity}% `);
                    dayDisplay++

                }
            })
        })
    }

    //store input into local storage
    let ul = $("#list-group");
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let data = JSON.parse(localStorage.getItem('items'));

    let liMaker = text => {
        let li = $('<li>').addClass("created-city btn btn-light");
        li.text(text);
        ul.prepend(li);
    }
    $("#search-btn").click(function () {
        itemsArray.push(userInput);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        liMaker(userInput);
    })

    data.forEach(item => {
        liMaker(item);
        console.log(item);
    })
    $(".clr-btn").on("click", function () {
        $(".created-city").remove();
        localStorage.clear();
        $("input").empty();
    })
});

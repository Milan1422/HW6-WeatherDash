// start of jQuery
$(document).ready(function(){

// global variable setting

// search button action
$("#btn-search").on("click", function(){
    let citySearch = $("#city-search").val();
    console.log(citySearch);
    searchCity(citySearch);
});

// do this when the search button is clicked
function searchCity(citySearch){
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=f261145622245616c003651f582a49a8&units=imperial"
    
    // ajax call to openweather api
    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function(response){
        console.log(response);

        // pulling current data from JSON response
        console.log(response.name)
        let cityName = $("#current-city").text(response.name);
        let cityTemp = $("#temperature").text("Temperature: " + response.main.temp + "F");
        let cityHumidity = $("#humidity").text("Humidity: " + response.main.humidity + "%");
        let cityWind = $("#wind-speed").text("Wind Speed: " + response.wind.speed + "MPH")


        // populating data onto HTML
        cityName.append();
        cityTemp.append();
        cityHumidity.append();
        cityWind.append();

        fiveDayWeather(citySearch);
    })
};

// when button is clicked display 5-day weather span
function fiveDayWeather(citySearch){
    let queryURLForcast = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=f261145622245616c003651f582a49a8&units=imperial"

    // ajax call to openweather api
    $.ajax({
        url: queryURLForcast,
        type: "GET"
    }).then(function(response){
        console.log(response);
    })
}

});
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
    // luxon to add date

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
        // loop thru each day of the week
        for (let i = 0; i < response.list.length; i++) {
            let forecastWeek = response.list[i];
            // console.log(forecastWeek);
            let dayOneDate = $("#day1-date").text(new Date(response.list[1].dt_txt).toLocaleDateString())
            let weatherIcon = $("#day1-icon").attr("src", "http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png")
            let forecastTemp = $("#day1-temp").text("Temperature: " + response.list[1].main.temp_max + "F")
            let forecastHum = $("#day1-hum").text("Humidity: " + response.list[1].main.humidity + "%")
           
            // populate forecast onto page
            dayOneDate.append();
            weatherIcon.append();
            forecastTemp.append();
            forecastHum.append();

            
        }
    })
}




});
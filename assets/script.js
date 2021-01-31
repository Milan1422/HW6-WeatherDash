// start of jQuery
$(document).ready(function(){

// global variable setting



// search button action
$("#btn-search").on("click", function(){
    let citySearch = $("#city-search").val();
    searchCity(citySearch);
    saveCity(citySearch)
});

// do this when the search button is clicked
function searchCity(citySearch){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=f261145622245616c003651f582a49a8&units=imperial"
    // luxon to add date

    // ajax call to openweather api
    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function(response){
        console.log(response);

        // pulling current data from JSON response
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
        callUVIndex(response.coord.lat, response.coord.lon)
        saveCity(citySearch);
    })
};

// call for UV index
function callUVIndex (lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f261145622245616c003651f582a49a8",
        type: "GET"
    }).then(function(response){
        let uvPtag = $("<p>").text("UV Index: ");
        let uvIndex = $("<span>").addClass("btn btn-sm btn-danger").text(response.value);
        $("#UV-index").append(uvPtag.append(uvIndex))
    });

}

// when button is clicked display 5-day weather span
function fiveDayWeather(citySearch){
    let queryURLForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=f261145622245616c003651f582a49a8&units=imperial"

    // ajax call to openweather api
    $.ajax({
        url: queryURLForcast,
        type: "GET"
    }).then(function(response){
        // console.log(response);
        // loop thru each day of the week
        for (let i = 0; i < response.list.length; i++) {
            let forecastWeek = response.list[i];
            // console.log(forecastWeek);
            let dayOneDate = $("#day1-date").text(new Date(response.list[1].dt_txt).toLocaleDateString())
            let weatherIcon = $("#day1-icon").attr("src", "https://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png")
            let forecastTemp = $("#day1-temp").text("Temperature: " + response.list[1].main.temp_max + "F")
            let forecastHum = $("#day1-hum").text("Humidity: " + response.list[1].main.humidity + "%")
           
            // populate forecast onto page
            dayOneDate.append();
            weatherIcon.append();
            forecastTemp.append();
            forecastHum.append();

            
        }
        for (let i = 0; i < response.list.length; i++) {
            let forecastWeek = response.list[i];
            let dayOneDate = $("#day2-date").text(new Date(response.list[9].dt_txt).toLocaleDateString())
            let weatherIcon = $("#day2-icon").attr("src", "https://openweathermap.org/img/w/" + response.list[9].weather[0].icon + ".png")
            let forecastTemp = $("#day2-temp").text("Temperature: " + response.list[9].main.temp_max + "F")
            let forecastHum = $("#day2-hum").text("Humidity: " + response.list[9].main.humidity + "%")
           
            // populate forecast onto page
            dayOneDate.append();
            weatherIcon.append();
            forecastTemp.append();
            forecastHum.append();

            
        }
        for (let i = 0; i < response.list.length; i++) {
            let forecastWeek = response.list[i];
            let dayOneDate = $("#day3-date").text(new Date(response.list[17].dt_txt).toLocaleDateString())
            let weatherIcon = $("#day3-icon").attr("src", "https://openweathermap.org/img/w/" + response.list[17].weather[0].icon + ".png")
            let forecastTemp = $("#day3-temp").text("Temperature: " + response.list[17].main.temp_max + "F")
            let forecastHum = $("#day3-hum").text("Humidity: " + response.list[17].main.humidity + "%")
           
            // populate forecast onto page
            dayOneDate.append();
            weatherIcon.append();
            forecastTemp.append();
            forecastHum.append();

            
        }
        for (let i = 0; i < response.list.length; i++) {
            let forecastWeek = response.list[i];
            let dayOneDate = $("#day4-date").text(new Date(response.list[25].dt_txt).toLocaleDateString())
            let weatherIcon = $("#day4-icon").attr("src", "https://openweathermap.org/img/w/" + response.list[25].weather[0].icon + ".png")
            let forecastTemp = $("#day4-temp").text("Temperature: " + response.list[25].main.temp_max + "F")
            let forecastHum = $("#day4-hum").text("Humidity: " + response.list[25].main.humidity + "%")
           
            // populate forecast onto page
            dayOneDate.append();
            weatherIcon.append();
            forecastTemp.append();
            forecastHum.append();

            
        }
        for (let i = 0; i < response.list.length; i++) {
            let forecastWeek = response.list[i];
            let dayOneDate = $("#day5-date").text(new Date(response.list[33].dt_txt).toLocaleDateString())
            let weatherIcon = $("#day5-icon").attr("src", "https://openweathermap.org/img/w/" + response.list[33].weather[0].icon + ".png")
            let forecastTemp = $("#day5-temp").text("Temperature: " + response.list[33].main.temp_max + "F")
            let forecastHum = $("#day5-hum").text("Humidity: " + response.list[33].main.humidity + "%")
           
            // populate forecast onto page
            dayOneDate.append();
            weatherIcon.append();
            forecastTemp.append();
            forecastHum.append();

            
        }
    })
}

// using local storage to save searched cities
function saveCity(citySearch){
    let cities = [];
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        
        if(citySearch != ""){
            let previousCity = $("<li>").attr("data-city-", i).text(citySearch);
            $(".searched-cities").append(previousCity)
        }
    }
    localStorage.setItem("city-name-" + citySearch, JSON.stringify(citySearch))
}

function storedCities(citySearch){
    let storedCities = JSON.parse(localStorage.getItem("data-name-" + citySearch));
    if (storedCities !== null) {
        cities = storedCities;
    }
    $(".searched-cities").append("<li>").text(storedCities)
    console.log(storedCities)
}
storedCities();



})

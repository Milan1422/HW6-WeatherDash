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
    let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=f261145622245616c003651f582a49a8&units=imperial"
    
    // ajax call to openweather api
    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function(response){
        let results = response.data;
        console.log(results);

    })
};


});
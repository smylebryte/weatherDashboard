var API_KEY = "70af00e0dc1696f9da44720427b65955"

$(document).ready(function() {
    $("#search-button").on("click", function() {
        let city=$("#search-value").val();
        searchCityWeather(city);
    });
    
    function searchCityWeather(city) {
        $.ajax({
            type: "Get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
            datatype: "json",
            success: function(data) {
                console.log(data);
                $("#tw-city_name").text(data["name"]);
                $("#tw-temp").text("Temperature:" + " " + data["main"]["temp"]);
                $("#tw-humidity").text("Humidity:" + " " + data["main"]["humidity"]);
                $("#tw-wind_speed").text("Wind Speed:" + " " + data["wind"]["speed"] + " " + "MPH");
            }
        })
    }


//     function uvIndex(lat, lon) {
//         $.ajax({
//             type: "Get",
//             url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
//             datatype: "json",
//             success: function(data) {
//                 console.log(data);
//                 $("#tw-wind_speed").text("Wind Speed:" + " " + data["wind"]["speed"] + " " + "MPH");
//             }
//         })

//     }
// });
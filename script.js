var API_KEY = "70af00e0dc1696f9da44720427b65955"


$(document).ready(function() {
    $("#search-button").on("click", function() {
        let city=$("#search-value").val();
        searchCityWeather(city);
    });
    
    function makeRow(text) {
        let li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }

    function searchCityWeather(city) {
        $.ajax({
            type: "Get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
            datatype: "json",
            success: function(data) {

                // if (history.indexOf(city) === -1) {
                //     history.push(city);
                //     window.localStorage.setItem("history", JSON.stringify(history));

                //     makeRow(city);
                // }
                // console.log(data);
                $("#tw-city_name").text(data["name"] + " (" + new Date().toLocaleDateString() + ")");
                $("#tw-temp").text("Temperature:" + " " + data["main"]["temp"] + " " + "°F");
                $("#tw-humidity").text("Humidity:" + " " + data["main"]["humidity"] + "%");
                $("#tw-wind_speed").text("Wind Speed:" + " " + data["wind"]["speed"] + " " + "MPH");

                let lat=data["coord"]["lat"];
                let lon=data["coord"]["lon"];

                uvIndex(lat, lon);
                forecastCityWeather(city);
            }
        })
    }
});

function forecastCityWeather(city) {
    $.ajax({
        type: "Get",
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
        datatype: "json",
        success: function(data) {
            console.log(data.list);
            for (let i=0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var card = $('<div>').addClass('card');
                    var cardBody = $('<div>').addClass('card-body');
                    var date = $('<h4>').text(data.list[i].dt_txt);
                    var temp = $('<p>').text("Temp:" + " " + data.list[i].main.temp + " " + "°F");
                    var humidity = $('<p>').text("Humidity:" + " " + data.list[i].main.humidity + "%");
                    card.append(cardBody);
                    cardBody.append(date);
                    cardBody.append(temp);
                    cardBody.append(humidity);
                    $("#forecast").append(cardBody);


                    // let card = $('<div>').addClass('card');
                    // let cardBody = $('<div>').addClass('card-body');
                    // let date = $('<h4>').addClass('card-title').text(data.list.dt_txt);
                    // let temp = $('<h6>').addClass('card-subtitle');
                    // let humid = $('<h6>').addClass('card-subtitle');

                    // $('#forecast1').append(card);
                    // $('#forecast1').append(cardBody);
                    // $('#forecast1').append(date);
                    // $('#forecast1').append(temp);
                    // $('#forecast1').append(humid);

                    // let temperature = $('<p>').text(data.list[i].main.temp);
                    // let humidity = $('<p>').text(data.list[i].main.humidity);
                    // cardBody.append(humidity);
                    // $("#test-card1").addClass('card');
                    // $("#test-card_body1").append(cardBody)

                }
            }
        }
    })
}
function uvIndex(lat, lon) {
    $.ajax({
        type: "Get",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        datatype: "json",
        success: function(data) {
            // console.log(data);
            $("#tw-uv_index").text("UV Index:" + " " + data["current"]["uvi"]);
        }
    })
}
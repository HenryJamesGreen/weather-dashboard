let cities = [];
//let cities = JSON.parse(localStorage.getItem("buttons"));
//let cities = JSON.parse(localStorage.getItem("buttons"));

function renderButtons() {
  $("#history").empty();

  for (let i = 0; i < cities.length; i++) {
    let a = $("<button>");

    a.attr("data-name", cities[i]);
    // a.attr("id", [i + 1]);

    //localStorage.setItem([i + 1], cities[i]);

    a.addClass("city-select");

    a.text(cities[i]);

    $("#history").append(a);
  }
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  cities = history;

  const city = $("#search-input").val().trim();
  console.log(city);

  cities.push(city);
  console.log(cities);
  localStorage.setItem("buttons", JSON.stringify(cities));

  renderButtons();
});

function getCityLonLan() {
  let cityInput = $(this).attr("data-name");
  console.log(cityInput);
  let queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput +
    "&limit=1&appid=d7d08d016a42640d3383d7dbad4a2c9c";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //console.log(response);
    //console.log(response[0].lat , response[0].lon);
    lat = response[0].lat;
    lon = response[0].lon;
    console.log(lat);
    console.log(lon);

    generateDetails();
  });
}

$(document).on("click", ".city-select", getCityLonLan);

//renderButtons();

function generateDetails() {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=d7d08d016a42640d3383d7dbad4a2c9c";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    const today = $("#today");
    today.empty();

    const todayContainer = $("<div>");

    const titleEl = $("<h2>");
    titleEl.text(
      response.city.name + " (" + moment().format("MMMM Do YYYY") + ") "
    );
    todayContainer.append(titleEl);

    let weatherCondition = response.list[0].weather[0].main;
    let iconCode = response.list[0].weather[0].icon;

    let WC = $("<img>");
    WC.attr("src", "https://openweathermap.org/img/wn/" + iconCode + ".png");
    todayContainer.append(WC);

    let TempEl = $("<p>");
    TempEl.text(
      "Temp: " + Math.round(response.list[0].main.temp - 273.15) + "℃"
    );
    todayContainer.append(TempEl);

    let windEl = $("<p>");
    windEl.text("Wind Speed: " + response.list[0].wind.speed + " kph");
    todayContainer.append(windEl);

    let humEl = $("<p>");
    humEl.text("Humidity: " + response.list[0].main.humidity + " %");
    todayContainer.append(humEl);

    today.prepend(todayContainer);

    ///forecast

    const tomorrow = $("#forecast");
    tomorrow.empty();

    const forecastContainer = $("<div>");
    //add 5 day title

    //add details day 1

    const tomorrowTitleEl = $("<h4>");
    tomorrowTitleEl.addClass("card-title");
    tomorrowTitleEl.text(moment().add(1, "day").format("DD-M-YYYY"));
    forecastContainer.append(tomorrowTitleEl);
    tomorrow.append(forecastContainer);

    let timeOne = moment().add(1, "day").format("YYYY-MM-DD 12:00:00");
    let timeTwo = moment().add(2, "day").format("YYYY-MM-DD 12:00:00");
    let timeThree = moment().add(3, "day").format("YYYY-MM-DD 12:00:00");
    let timeFour = moment().add(4, "day").format("YYYY-MM-DD 12:00:00");
    let timeFive = moment().add(5, "day").format("YYYY-MM-DD 12:00:00");

    //console.log(timeOne);
    // console.log(response.list.length);

    let listsArray = [];

    for (let i = 0; i < response.list.length; i++) {
      //console.log(response.list[i].dt_txt);
      if (
        (response.list[i].dt_txt === timeOne) |
        (response.list[i].dt_txt === timeTwo) |
        (response.list[i].dt_txt === timeThree) |
        (response.list[i].dt_txt === timeFour) |
        (response.list[i].dt_txt === timeFive)
      ) {
        listsArray.push(response.list[i]);
        //console.log(tempsArray.list[i].main.temp);
      }
      //console.log(listsArray);
    }
    console.log(listsArray);

    //tomorrow's Icon

    let weatherCondition1 = listsArray[0].weather[0].main;
    let iconCode1 = listsArray[0].weather[0].icon;

    let WC1 = $("<img>");
    WC1.attr("src", "https://openweathermap.org/img/wn/" + iconCode1 + ".png");
    forecastContainer.append(WC1);
    //tomorrow's temp
    const tomorrowTempEl = $("<p>");
    tomorrowTempEl.text(
      "Temp: " + Math.round(listsArray[0].main.temp - 273.15) + "℃"
    );
    forecastContainer.append(tomorrowTempEl);
    forecastContainer.addClass("col-lg-2 card");

    //tomorrow's wind

    const tomorrowWindEl = $("<p>");
    tomorrowWindEl.text("Wind: " + listsArray[0].wind.speed + " kph");
    forecastContainer.append(tomorrowWindEl);

    //tomorrow's humidity

    const tomorrowHumEl = $("<p>");
    tomorrowHumEl.text("Humidity: " + listsArray[0].main.humidity + " %");
    forecastContainer.append(tomorrowHumEl);

    //Day 2 ---------------------------------

    const forecastContainer2 = $("<div>");

    //add details day 2
    const day2TitleEl = $("<h4>");
    day2TitleEl.addClass("card-title");
    day2TitleEl.text(moment().add(2, "day").format("DD-M-YYYY"));
    forecastContainer2.append(day2TitleEl);
    forecastContainer2.addClass("col-lg-2 card");
    tomorrow.append(forecastContainer2);

    let weatherCondition2 = listsArray[1].weather[0].main;
    let iconCode2 = listsArray[1].weather[0].icon;

    let WC2 = $("<img>");
    WC2.attr("src", "https://openweathermap.org/img/wn/" + iconCode2 + ".png");
    forecastContainer2.append(WC2);

    const day2TempEl = $("<p>");
    day2TempEl.text(
      "Temp: " + Math.round(listsArray[1].main.temp - 273.15) + "℃"
    );
    forecastContainer2.append(day2TempEl);

    const day2WindEl = $("<p>");
    day2WindEl.text("Wind: " + listsArray[1].wind.speed + " kph");
    forecastContainer2.append(day2WindEl);

    const day2HumEl = $("<p>");
    day2HumEl.text("Humidity: " + listsArray[1].main.humidity + " %");
    forecastContainer2.append(day2HumEl);

    //Day 3.

    const forecastContainer3 = $("<div>");

    //add details day 3
    const day3TitleEl = $("<h4>");
    day3TitleEl.addClass("card-title");
    day3TitleEl.text(moment().add(3, "day").format("DD-M-YYYY"));
    forecastContainer3.append(day3TitleEl);
    tomorrow.append(forecastContainer3);
    forecastContainer3.addClass("col-lg-2 card");

    let weatherCondition3 = listsArray[2].weather[0].main;
    let iconCode3 = listsArray[2].weather[0].icon;

    let WC3 = $("<img>");
    WC3.attr("src", "https://openweathermap.org/img/wn/" + iconCode3 + ".png");
    forecastContainer3.append(WC3);

    const day3TempEl = $("<p>");
    day3TempEl.text(
      "Temp: " + Math.round(listsArray[2].main.temp - 273.15) + "℃"
    );
    forecastContainer3.append(day3TempEl);

    const day3WindEl = $("<p>");
    day3WindEl.text("Wind: " + listsArray[2].wind.speed + " kph");
    forecastContainer3.append(day3WindEl);

    const day3HumEl = $("<p>");
    day3HumEl.text("Humidity: " + listsArray[2].main.humidity + " %");
    forecastContainer3.append(day3HumEl);

    //Day 4.

    const forecastContainer4 = $("<div>");

    //add details day 4
    const day4TitleEl = $("<h4>");
    day4TitleEl.addClass("card-title");
    day4TitleEl.text(moment().add(4, "day").format("DD-M-YYYY"));
    forecastContainer4.append(day4TitleEl);
    tomorrow.append(forecastContainer4);
    forecastContainer4.addClass("col-lg-2 card");

    let weatherCondition4 = listsArray[3].weather[0].main;
    let iconCode4 = listsArray[3].weather[0].icon;

    let WC4 = $("<img>");
    WC4.attr("src", "https://openweathermap.org/img/wn/" + iconCode4 + ".png");
    forecastContainer4.append(WC4);

    const day4TempEl = $("<p>");
    day4TempEl.text(
      "Temp: " + Math.round(listsArray[3].main.temp - 273.15) + "℃"
    );
    forecastContainer4.append(day4TempEl);

    const day4WindEl = $("<p>");
    day4WindEl.text("Wind: " + listsArray[3].wind.speed + " kph");
    forecastContainer4.append(day4WindEl);

    const day4HumEl = $("<p>");
    day4HumEl.text("Humidity: " + listsArray[3].main.humidity + " %");
    forecastContainer4.append(day4HumEl);

    //Day 5.

    const forecastContainer5 = $("<div>");

    //add details day 5
    const day5TitleEl = $("<h4>");
    day5TitleEl.addClass("card-title");
    day5TitleEl.text(moment().add(5, "day").format("DD-M-YYYY"));
    forecastContainer5.append(day5TitleEl);
    tomorrow.append(forecastContainer5);
    forecastContainer5.addClass("col-lg-2 card");

    let weatherCondition5 = listsArray[4].weather[0].main;
    let iconCode5 = listsArray[4].weather[0].icon;

    let WC5 = $("<img>");
    WC5.attr("src", "https://openweathermap.org/img/wn/" + iconCode5 + ".png");
    forecastContainer5.append(WC5);

    const day5TempEl = $("<p>");
    day5TempEl.text(
      "Temp: " + Math.round(listsArray[4].main.temp - 273.15) + "℃"
    );
    forecastContainer5.append(day5TempEl);

    const day5WindEl = $("<p>");
    day5WindEl.text("Wind: " + listsArray[4].wind.speed + " kph");
    forecastContainer5.append(day5WindEl);

    const day5HumEl = $("<p>");
    day5HumEl.text("Humidity: " + listsArray[4].main.humidity + " %");
    forecastContainer5.append(day5HumEl);
  });
}

const historyBtns = $("#history");

let history = [];
let storedCities = localStorage.getItem("buttons");

function getHistory() {
  historyBtns.empty();

  history = history.slice(0, 6);

  history.forEach(function (city) {
    const btn = $("<button>").text(city);
    btn.attr("data-name", city);
    btn.addClass("city-select");
    btn.attr("role", "button");
    historyBtns.append(btn);
  });
}

if (storedCities !== null) {
  history = JSON.parse(storedCities);
  history = Array.from(new Set(history));
  getHistory();
}

$("#clear-history").on("click", function (event) {
  event.preventDefault();
  $("#history").empty();
  localStorage.clear();
  location.reload();
});

/*
function weatherIcons() {
let iconURL = "http://openweathermap.org/img/wn/" + (response.weather[0].icon) + "@2x.png"

img.attr('src' , iconURL)
img.attr('class', 'currentIcon')

}*/

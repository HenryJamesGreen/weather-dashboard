let cities = [];

function renderButtons() {
  $("#history").empty();

  for (let i = 0; i < cities.length; i++) {
    let a = $("<button>");

    a.attr("data-name", cities[i]);

    a.addClass("city-select");

    a.text(cities[i]);

    $("#history").append(a);
  }
}

$("#search-button").on("click", function (event) {
  event.preventDefault();

  const city = $("#search-input").val().trim();
  console.log(city);

  cities.push(city);
  console.log(cities);
  renderButtons();
});

renderButtons();

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
      response.city.name +
        " (" +
        moment().format("MMMM Do YYYY, H:mm:ss") +
        ") "
    );
    todayContainer.append(titleEl);

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
    tomorrowTitleEl.text(moment().add(1, "day").format("DD-M-YYYY"));
    forecastContainer.append(tomorrowTitleEl);
    tomorrow.append(forecastContainer);

    let timeOne = moment().add(1, "day").format("YYYY-MM-DD 00:00:00");
    let timeTwo = moment().add(1, "day").format("YYYY-MM-DD 03:00:00");
    let timeThree = moment().add(1, "day").format("YYYY-MM-DD 06:00:00");
    let timeFour = moment().add(1, "day").format("YYYY-MM-DD 09:00:00");
    let timeFive = moment().add(1, "day").format("YYYY-MM-DD 12:00:00");
    let timeSix = moment().add(1, "day").format("YYYY-MM-DD 15:00:00");
    let timeSeven = moment().add(1, "day").format("YYYY-MM-DD 18:00:00");
    let timeEight = moment().add(1, "day").format("YYYY-MM-DD 21:00:00");

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
        (response.list[i].dt_txt === timeFive) |
        (response.list[i].dt_txt === timeSix) |
        (response.list[i].dt_txt === timeSeven) |
        (response.list[i].dt_txt === timeEight)
      ) {
        listsArray.push(response.list[i]);
        //console.log(tempsArray.list[i].main.temp);
      }
      //console.log(listsArray);
    }
    console.log(listsArray);
    let tempsTotal = listsArray.main.temp.reduce();
    console.log(tempsTotal);
  });
}

//console.log(moment().endOf("day").fromNow());
//console.log(moment().add(1, "day").format("YYYY-MM-DD 00:00:00"));

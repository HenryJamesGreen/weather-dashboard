let cities = ["Sample"];

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

    

    today.prepend(todayContainer);
  });
}

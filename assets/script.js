let cities = ["Sample"];

function renderButtons() {
  $("#history").empty();

  for (let i = 0; i < cities.length; i++) {
    let a = $("<button>");

    a.attr("data-name", cities[i]);

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
    let cityInput = $(this).attr('data-name');
    let queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=d7d08d016a42640d3383d7dbad4a2c9c";

    $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);


    })}



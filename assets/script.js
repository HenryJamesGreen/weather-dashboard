let cities = ["Sample"];

function renderButtons() {
  for (let i = 0; i < cities.length; i++) {
    let a = $("<button>");

    a.attr("data-name", cities[i]);

    a.text(cities[i]);

    $("#history").append(a);
  }
}

$("search-button").on("submit", function (event) {
  //event.preventDefault();

  const city = $("#search-input").val().trim();
  console.log(city);

  cities.push(city);
  console.log(cities);
  renderButtons();
});

renderButtons();

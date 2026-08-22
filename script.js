var allMeals = [];
function search() {
  var userinput = document.getElementById("searchInput").value;
  var resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";
  allMeals = [];
  if (userinput === "") {return;}
  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userinput}`;
  fetch(url)
    .then(function (response) {return response.json();})
    .then(function (data) {if (data.meals === null) {return;}
      allMeals = data.meals;
      var howManyToShow = Math.min(allMeals.length, 5);
      for (var i = 0; i < howManyToShow; i++) {
        var card = createMealCard(allMeals[i]);
        resultsContainer.appendChild(card);
      }
      window.scrollTo(0, 0);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function showAllMeals() {
  var resultsContainer = document.getElementById("resultsContainer");
  for (var i = 5; i < allMeals.length; i++) {
    var card = createMealCard(allMeals[i]);
    resultsContainer.appendChild(card);
  }
}
function createMealCard(meal) {
  var card = document.createElement("div");
  card.className = "meal-card";
  card.innerHTML = `
    <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="meal-info">
      <h3 class="meal-title">${meal.strMeal}</h3>
      <span class="meal-id">Meal ID: ${meal.idMeal}</span>
      <p class="meal-instructions">${meal.strInstructions}</p>
    </div>
  `;
  return card;
}
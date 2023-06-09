// error handling
document.getElementById('error-message').style.display = 'none';

// search area
const searchFood = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;

  // clear data
  searchField.value = '';
  document.getElementById('error-message').style.display = 'none';


  // load data
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => displayError(error))
}

//error message
const displayError = error => {
  document.getElementById('error-message').style.display = 'block';
}

// display all searched result
const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = '';

  meals.forEach(meal => {
    console.log('meal');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `<div class="col">
        <div class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}.....</p>
            <a onclick="loadMealDetail(${meal.idMeal})" href="#mainBody" class="btn btn-info text-white bg-dark">Details</a>
          </div>
        </div>
      </div>`;
    searchResult.appendChild(div);
  })
}

// display selected meal 
const loadMealDetail = mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  mealDetails.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Watch tutorial</a>
  </div>
  `
  mealDetails.appendChild(div);
}

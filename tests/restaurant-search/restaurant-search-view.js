import { createRestaurantItemTemplate } from '../../src/scripts/views/templates/template-creator';
class RestaurantSearchView {
  getTemplate() {
    return ` 
         <div id="restaurant-search-container">
                <input id="query" type="text">

                <div class="restaurant-result-container" id="restaurants" >
                  <ul class="restaurants" >
                  </ul>
                </div>
              </div>`;
  }

  getSearchedRestaurantsTemplate() {
    return `
      <div class="content">
        <h2 class="content__heading">Pencarian restoran</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  showRestaurants(restaurants) {
    this.showSearchedRestaurants(restaurants)
  }

  _showFoundRestaurants(restaurants) {
    this._view.showSearchedRestaurants(restaurants)
  }

  showSearchedRestaurants(restaurants) {
    const restaurantsContainer = document.getElementById('restaurants'); // Get the container
    restaurantsContainer.innerHTML = ''; // Clear previous content

    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        const restaurantElement = createRestaurantItemTemplate(restaurant);
        restaurantsContainer.innerHTML += restaurantElement;
      });
    } else {
      restaurantsContainer.innerHTML = this._getEmptyMovieTemplate();
    }

    restaurantsContainer.dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyMovieTemplate() {
    return `
    <div class="restaurant-item__not__found">Tidak ada hasil restoran</div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }
}

export default RestaurantSearchView;

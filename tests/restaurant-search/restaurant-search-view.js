import { createRestaurantItemTemplate } from '../../src/scripts/views/templates/template-creator';
class RestaurantSearchView {
  getTemplate() {
    return ` 
         <div id="restaurant-search-container">
                <input id="query" type="text">

                <div class="restaurant-result-container">
                  <ul class="restaurants">
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
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(`
          <li class="restaurant">
          <span class="restaurant__name">${restaurant.name || '-'}</span>
          <span class="restaurant__city">${restaurant.city || '-'}</span>
          <span class="restaurant__rating">${restaurant.rating || '-'}</span>
          </li>`),
        ''
      );
    } else {
      html = '<div class="restaurants__not__found">Film tidak ditemukan</div>';
    }

    document.querySelector('.restaurants').innerHTML = html;
    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
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
      restaurantsContainer.innerHTML = '<div class="restaurant-item__not__found">Tidak ada hasil restoran</div>';
    }
    console.log(restaurants);

    restaurantsContainer.dispatchEvent(new Event('restaurants:updated'));
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }
}

export default RestaurantSearchView;

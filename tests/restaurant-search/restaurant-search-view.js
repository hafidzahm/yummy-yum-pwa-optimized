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

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }
}

export default RestaurantSearchView;

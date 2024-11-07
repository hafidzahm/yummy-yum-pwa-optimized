class AllRestaurantSearchPresenter {
  constructor({ allRestaurants }) {
    this._listenToSearchRequestByUser();
    this._allRestaurants = allRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurants(event.target.value);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._allRestaurants.searchRestaurants(
        this.latestQuery
      );
    } else {
      foundRestaurants = await this._allRestaurants.getAllRestaurants();
    }

    this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(restaurants) {
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

  get latestQuery() {
    return this._latestQuery;
  }
}

export default AllRestaurantSearchPresenter;

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
    this._latestQuery = latestQuery;
    const foundRestaurant = this._allRestaurants.searchRestaurants(
      this._latestQuery
    );
    this._showFoundRestaurants(foundRestaurant);
  }

  _showFoundRestaurants(restaurants) {
    const html = restaurants.reduce(
      (carry, restaurant) =>
        carry.concat(`
      <li class="restaurant">
      <span class="restaurant__name">${restaurant.name || '-'}</span>
      </li>`),
      ''
    );
    document.querySelector('.restaurants').innerHTML = html;
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default AllRestaurantSearchPresenter;

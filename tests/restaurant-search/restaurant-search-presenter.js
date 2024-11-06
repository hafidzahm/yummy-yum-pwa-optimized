class RestaurantSearchPresenter {
  constructor({ searchRestaurants }) {
    this._listenToSearchRequestByUser();
    this._searchRestaurants = searchRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      console.log(event);
      this._latestQuery = event.target.value;
      this._searchRestaurants.searchRestaurants(this._latestQuery);
    });
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default RestaurantSearchPresenter;

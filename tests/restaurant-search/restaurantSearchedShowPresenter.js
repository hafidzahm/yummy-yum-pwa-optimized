class RestaurantSearchedShowPresenter {
  constructor({ view, allSearchedRestaurants }) {
    this._view = view;
    this._allSearchedRestaurants = allSearchedRestaurants;

    this._allSearchedRestaurants.getAllRestaurants();
  }

  _displayRestaurants(restaurants) {
    this._view.showSearchedRestaurants(restaurants);
  }
}

export default RestaurantSearchedShowPresenter;

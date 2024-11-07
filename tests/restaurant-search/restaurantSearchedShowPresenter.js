class RestaurantSearchedShowPresenter {
  constructor({ view }) {
    this._view = view;
  }

  _displayRestaurants(restaurants) {
    this._view.showSearchedRestaurants(restaurants);
  }
}

export default RestaurantSearchedShowPresenter;

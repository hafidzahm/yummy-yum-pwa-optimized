class RestaurantSearchedShowPresenter {
  constructor({ view, allSearchedRestaurants }) {
    this._view = view;
    this._allSearchedRestaurants = allSearchedRestaurants;

    const restaurants = this._allSearchedRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showSearchedRestaurants(restaurants);
  }
}

export default RestaurantSearchedShowPresenter;

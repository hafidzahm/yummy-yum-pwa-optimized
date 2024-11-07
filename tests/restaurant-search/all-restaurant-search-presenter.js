class AllRestaurantSearchPresenter {
  constructor({ allRestaurants, view }) {
    this._allRestaurants = allRestaurants;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
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
    this._view.showRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default AllRestaurantSearchPresenter;

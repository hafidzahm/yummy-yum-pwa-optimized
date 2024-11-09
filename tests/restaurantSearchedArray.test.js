import { itActsAsSearchModel } from './helpers/contracts/restaurantSearchContract';
import { afterEach, describe } from '@jest/globals';

let allRestaurants = [];

const SearchedRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return allRestaurants.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurants() {
    return allRestaurants;
  },

  putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    allRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    // cara boros menghapus resto dengan meng-copy resto yang ada
    // kecuali resto dengan id == id
    allRestaurants = allRestaurants.filter((restaurant) => restaurant.id != id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurants().filter((restaurants) => {
      const loweredCaseRestaurantName = (restaurants.name || '-').toLowerCase();
      const loweredCaseRestaurantCity = (restaurants.city || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
      const jammedRestaurantCity = loweredCaseRestaurantCity.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return (
        jammedRestaurantCity.indexOf(jammedQuery) !== -1 ||
        jammedRestaurantName.indexOf(jammedQuery) !== -1
      );
    });
  },
};

describe('Searched Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    allRestaurants = [];
  });

  itActsAsSearchModel(SearchedRestaurantArray);
});

import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurant = {
  async getRestaurant(id) {
    try {
      if (!id) {
        return;
      }
      return (await dbPromise).get(OBJECT_STORE_NAME, id);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllRestaurants() {
    try {
      return (await dbPromise).getAll(OBJECT_STORE_NAME);
    } catch (err) {
      console.log(err);
    }
  },
  async putRestaurant(restaurant) {
    try {
      if (!restaurant.hasOwnProperty('id')) {
        return;
      }
      return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteRestaurant(id) {
    try {
      return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    } catch (err) {
      console.log(err);
    }
  },
};

export default FavoriteRestaurant;

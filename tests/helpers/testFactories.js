import buttonFavoriteInitiator from '../../src/scripts/utils/button-favorite-presenter';
import FavoriteRestaurant from '../../src/scripts/data/favorite-restaurant';
const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await buttonFavoriteInitiator.init({
    buttonFavoriteContainer: document.querySelector('#buttonFavoriteContainer'),
    favoriteRestaurants: FavoriteRestaurant,
    restaurant,
  });
};
export { createFavoriteButtonPresenterWithRestaurant };

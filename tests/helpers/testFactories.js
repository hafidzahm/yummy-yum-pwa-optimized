import buttonFavoriteInitiator from '../../src/scripts/utils/button-favorite-presenter';
const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await buttonFavoriteInitiator.init({
    buttonFavoriteContainer: document.querySelector('#buttonFavoriteContainer'),
    restaurant,
  });
};
export { createFavoriteButtonPresenterWithRestaurant };

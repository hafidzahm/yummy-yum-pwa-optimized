import buttonFavoriteInitiator from '../src/scripts/utils/button-favorite-initiator';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';

describe('Liking a Restaurant', () => {
  it('should show favorite button when the restaurant has not been favorited before', async () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';

    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="favorite this restaurant"]')
    ).toBeTruthy();
  });
  it('should not show unfavorite button when the restaurant has not been favorited before', async () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';

    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="unfavorite this restaurant"]')
    ).toBeFalsy();
  });
  it('should be able to like the restaurant', async () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';

    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('.favoriteButton').dispatchEvent(new Event('click'));

    // Memastikan film berhasil disukai
    const restaurant = await FavoriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurant.deleteRestaurant(1);
  });
});

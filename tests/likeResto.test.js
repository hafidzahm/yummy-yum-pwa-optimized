import buttonFavoriteInitiator from '../src/scripts/utils/button-favorite-initiator';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';

describe('Liking a Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });
  it('should show favorite button when the restaurant has not been favorited before', async () => {
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
  it('should be able to favorite the restaurant', async () => {
    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('.favoriteButton').dispatchEvent(new Event('click'));

    // Memastikan restoran berhasil difavoritkan
    const restaurant = await FavoriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurant.deleteRestaurant(1);
  });
  it('should not to add restaurant again when its already favorited', async () => {
    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    // Tambahkan restoran dengan ID 1 ke daftar resto yang difavoritkan
    await FavoriteRestaurant.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol favoritkan restoran
    document.querySelector('.favoriteButton').dispatchEvent(new Event('click'));
    // Tidak ada restoran yang ganda
    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }]);
    await FavoriteRestaurant.deleteRestaurant(1);
  });
});

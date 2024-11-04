import buttonFavoriteInitiator from '../src/scripts/utils/button-favorite-initiator';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';

describe('Unfavorite a Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="buttonFavoriteContainer"></div>';
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestaurant.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should display unfavorite widget when the restaurant has been favorited', async () => {
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
    ).toBeTruthy();
  });
  it('should not display favorite widget when the restaurant has been favorited', async () => {
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
    ).toBeFalsy();
  });
  it('should be able to remove favorited restaurant from the list', async () => {
    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    document
      .querySelector('[aria-label="unfavorite this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
  it('should not throw error when user click unfavorite widget if the unfavorite restaurant is not in the list', async () => {
    await buttonFavoriteInitiator.init({
      buttonFavoriteContainer: document.querySelector(
        '#buttonFavoriteContainer'
      ),
      restaurant: {
        id: 1,
      },
    });

    // Hapus dulu resto dari daftar resto yang difavoritkan
    await FavoriteRestaurant.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget unfavorite resto
    document
      .querySelector('[aria-label="unfavorite this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});

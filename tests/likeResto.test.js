import buttonFavoriteInitiator from '../src/scripts/utils/button-favorite-initiator';

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
});

import {
  createButtonFavoriteRestaurantTemplate,
  createButtonUnfavoriteRestaurantTemplate,
} from '../views/templates/template-creator';

const buttonFavoriteInitiator = {
  async init({ buttonFavoriteContainer, favoriteRestaurants, restaurant }) {
    this._buttonFavoriteContainer = buttonFavoriteContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._buttonFavoriteContainer.innerHTML =
      createButtonFavoriteRestaurantTemplate();
    const favoriteButton = document.querySelector('.favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._buttonFavoriteContainer.innerHTML =
      createButtonUnfavoriteRestaurantTemplate();
    const favoriteButton = document.querySelector('.favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default buttonFavoriteInitiator;

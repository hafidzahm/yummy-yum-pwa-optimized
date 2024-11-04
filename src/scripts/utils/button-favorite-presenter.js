import FavoriteRestaurant from '../data/favorite-restaurant';
import {
  createButtonFavoriteTemplate,
  createButtonFavoritedTemplate,
} from '../views/templates/template-creator';

const buttonFavoriteInitiator = {
  async init({ buttonFavoriteContainer, restaurant }) {
    this._buttonFavoriteContainer = buttonFavoriteContainer;
    this._restaurant = restaurant;

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
    const restaurant = await FavoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._buttonFavoriteContainer.innerHTML = createButtonFavoriteTemplate();
    const favoriteButton = document.querySelector('.favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._buttonFavoriteContainer.innerHTML = createButtonFavoritedTemplate();
    const favoriteButton = document.querySelector('.favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default buttonFavoriteInitiator;

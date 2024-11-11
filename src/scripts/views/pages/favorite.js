import FavoriteRestaurant from '../../data/favorite-restaurant';
import {
  createRestaurantItemTemplate,
  EmptyRestaurantContainerTemplate,
} from '../templates/template-creator';
import { showLoading, hideLoading } from '../../utils/loading-utils';

const Favorite = {
  async render() {
    return `

    <div class="card-title" id="card-favorite">
    <h1 id="card-title__text">Restoran Favorit</h1>
  </div>

  <div id="loading" class="loading">
  <video autoplay loop muted playsinline>
  <source src="./loading.webm" type="video/webm">
  <source src="./loading.mp4" type="video/mp4">
</video>
</div>
  
  <div id="restaurant-list" tabindex="0" class="favorite-grid"></div>
  </section>
      `;
  },

  async afterRender() {
    await this._favoritePageData();
  },

  async _favoritePageData() {
    const restaurants = await FavoriteRestaurant.getAllRestaurants();
    const restaurantContainer = document.querySelector('#restaurant-list');
    const itemRestaurant = document.getElementById('restaurant-list');

    showLoading();
    try {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });

      if (itemRestaurant.childElementCount === 0) {
        restaurantContainer.innerHTML += EmptyRestaurantContainerTemplate();
      }
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  },
};

export default Favorite;

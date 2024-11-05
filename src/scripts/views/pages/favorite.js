import FavoriteRestaurant from '../../data/favorite-restaurant';
import {
  createRestaurantItemTemplate,
  EmptyRestaurantContainerTemplate,
} from '../templates/template-creator';

const Favorite = {
  async render() {
    return `

    <div class="card-title" id="card-favorite">
    <h1 id="card-title__text">Restoran Favorit</h1>
  </div>

  <div id="loading" class="loading">
  <img src="./loading.gif" alt="animasi loading">
</div>
  
  <div id="restaurant-list" tabindex="0" class="favorite-grid"></div>
  </section>
      `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurant.getAllRestaurants();
    const restaurantContainer = document.querySelector('#restaurant-list');
    const itemRestaurant = document.getElementById('restaurant-list');

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
    }
  },
};

export default Favorite;

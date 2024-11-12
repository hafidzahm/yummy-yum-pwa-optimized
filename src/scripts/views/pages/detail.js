import RestaurantSources from '../../data/restaurant-sources';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import PostReview from '../../utils/post-review';
import buttonFavoriteInitiator from '../../utils/button-favorite-presenter';
import FavoriteRestaurant from '../../data/favorite-restaurant';
import { showLoading, hideLoading } from '../../utils/loading-utils';

const Detail = {
  async render() {
    return `    
 
    <div id="restaurant-list" tabindex="0" class="card-detail">
  <div id="loading" class="loading">
  <img type="img/gif" src="./loading.gif" />

</div></div>

    <div id="buttonFavoriteContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSources.detailRestaurant(url.id);

    const detailContainer = document.querySelector('#restaurant-list');

    showLoading();
    try {
      detailContainer.innerHTML += createRestaurantDetailTemplate(restaurant);

      buttonFavoriteInitiator.init({
        buttonFavoriteContainer: document.querySelector(
          '#buttonFavoriteContainer'
        ),
        favoriteRestaurants: FavoriteRestaurant,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
        },
      });
    } catch (err) {
    } finally {
      hideLoading();
    }
    try {
      const submitReview = document.querySelector('#review_submit');
      submitReview.addEventListener('click', (event) => {
        event.preventDefault();
        PostReview();
      });
    } catch (err) {}
  },
};

export default Detail;

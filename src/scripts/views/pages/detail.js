import RestaurantSources from '../../data/restaurant-sources';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import PostReview from '../../utils/post-review';
import buttonFavoriteInitiator from '../../utils/button-favorite-presenter';

const Detail = {
  async render() {
    return `    
 
    <div id="restaurant-list" tabindex="0" class="card-detail">
    <div id="loading" class="loading">
    <img src="./loading.gif" alt="animasi loading">
  </div></div>

    <div id="buttonFavoriteContainer"></div>




      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSources.detailRestaurant(url.id);
    console.table(restaurant);

    const detailContainer = document.querySelector('#restaurant-list');

    try {
      detailContainer.innerHTML += createRestaurantDetailTemplate(restaurant);

      buttonFavoriteInitiator.init({
        buttonFavoriteContainer: document.querySelector(
          '#buttonFavoriteContainer'
        ),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
        },
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const submitReview = document.querySelector('#review_submit');
      submitReview.addEventListener('click', (event) => {
        event.preventDefault();
        PostReview();
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default Detail;

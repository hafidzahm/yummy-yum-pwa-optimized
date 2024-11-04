import API_ENDPOINT from '../globals/api-endpoint';
import { showLoading, hideLoading, sleep } from '../utils/loading-utils';
import { InternetDisconnectedTemplate } from '../views/templates/template-creator';

class RestaurantSources {
  static async listRestaurant() {
    const loading = document.querySelector('#loading');
    showLoading(loading);
    try {
      const response = await fetch(API_ENDPOINT.HOME);

      await sleep();

      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (err) {
      console.log(err);
      const listRestaurants = document.querySelector('#card-lists');
      listRestaurants.innerHTML += InternetDisconnectedTemplate();
    } finally {
      const loading = document.querySelector('#loading');
      hideLoading(loading);
    }
  }

  static async detailRestaurant(id) {
    const loading = document.querySelector('#loading');
    showLoading(loading);
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));

      await sleep();

      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (err) {
      console.log(err);
      const detailContainer = document.querySelector('#restaurant-list');
      detailContainer.innerHTML += InternetDisconnectedTemplate();
    } finally {
      const loading = document.querySelector('#loading');
      hideLoading(loading);
    }
  }

  static async postReview(dataReview) {
    const loading = document.querySelector('#loading');
    showLoading(loading);

    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataReview),
      });

      await sleep();

      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.log(err);
      const containerReview = document.querySelector('reviews__container');
      containerReview.innerHTML += InternetDisconnectedTemplate();
    } finally {
      const loading = document.querySelector('#loading');
      hideLoading(loading);
    }
  }
}

export default RestaurantSources;

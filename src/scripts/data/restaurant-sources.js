import API_ENDPOINT from '../globals/api-endpoint';
import { InternetDisconnectedTemplate } from '../views/templates/template-creator';

class RestaurantSources {
  static async listRestaurant() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (err) {
      const homeContainer = document.querySelector('#restaurant-list');
      homeContainer.innerHTML += InternetDisconnectedTemplate();
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (err) {
      const detailContainer = document.querySelector('#restaurant-list');
      detailContainer.innerHTML += InternetDisconnectedTemplate();
    }
  }

  static async postReview(dataReview) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataReview),
      });

      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      const containerReview = document.querySelector('reviews__container');
      containerReview.innerHTML += InternetDisconnectedTemplate();
    }
  }
}

export default RestaurantSources;

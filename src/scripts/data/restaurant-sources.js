import API_ENDPOINT from '../globals/api-endpoint';
import { showLoading, hideLoading, sleep } from '../utils/loading-utils';
// import { InternetDisconnectedTemplate } from '../views/templates/template-creator';

class RestaurantSources {
  static async listRestaurant() {
    // const loading = document.querySelector('#loading');
    // showLoading();
    try {
      const response = await fetch(API_ENDPOINT.HOME);

      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (err) {
      console.log(err);
      // const listRestaurants = document.querySelector('#card-lists');
      // listRestaurants.innerHTML += InternetDisconnectedTemplate();
    }
    //  finally {
    //   const loading = document.querySelector('#loading');
    //   hideLoading();
    // }
  }

  static async detailRestaurant(id) {
    const loading = document.querySelector('#loading');
    showLoading();
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
      hideLoading();
    }
  }

  static async postReview(dataReview) {
    const loading = document.querySelector('#loading');
    showLoading();

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
      hideLoading();
    }
  }

  static async searchRestaurants(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    const searchedJson = responseJson.restaurants;

    return searchedJson.filter((restaurants) => {
      const loweredCaseRestaurantName = (restaurants.name || '-').toLowerCase();
      const loweredCaseRestaurantCity = (restaurants.city || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
      const jammedRestaurantCity = loweredCaseRestaurantCity.replace(/\s/g, '');


      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

     
      return jammedRestaurantCity.indexOf(jammedQuery) !== -1 || jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  }
}

export default RestaurantSources;

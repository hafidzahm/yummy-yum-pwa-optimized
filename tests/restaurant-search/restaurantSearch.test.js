import { spyOn } from 'jest-mock';
import RestaurantSearchPresenter from './restaurant-search-presenter';
import RestaurantSources from '../../src/scripts/data/restaurant-sources';

describe('Searching restaurants', () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div id="restaurant-search-container">
              <input id="query" type="text">
              <div class="restaurant-result-container">
                <ul class="restaurants">
                </ul>
              </div>
            </div>
          `;
  });

  it('should able to capture the query typed by the user', () => {
    const presenter = new RestaurantSearchPresenter({
      searchRestaurants: RestaurantSources,
    });

    const queryElement = document.getElementById('query');
    queryElement.value = 'restoran a';

    queryElement.dispatchEvent(new Event('change'));

    expect(presenter.latestQuery).toEqual('restoran a');
  });
  it('should ask the model to search restaurants', () => {
    spyOn(RestaurantSources, 'searchRestaurants');
    const presenter = new RestaurantSearchPresenter({
      searchRestaurants: RestaurantSources,
    });

    const queryElement = document.getElementById('query');
    queryElement.value = 'restoran a';
    queryElement.dispatchEvent(new Event('change'));

    expect(RestaurantSources.searchRestaurants).toHaveBeenCalledWith(
      'restoran a'
    );
  });
});

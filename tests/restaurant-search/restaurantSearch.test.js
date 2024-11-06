import { spyOn } from 'jest-mock';
import AllRestaurantSearchPresenter from './all-restaurant-search-presenter';
import RestaurantSources from '../../src/scripts/data/restaurant-sources';

describe('Searching restaurants', () => {
  let presenter;
  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };
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

    spyOn(RestaurantSources, 'searchRestaurants');
    presenter = new AllRestaurantSearchPresenter({
      allRestaurants: RestaurantSources,
    });
  });

  it('should able to capture the query typed by the user', () => {
    RestaurantSources.searchRestaurants.mockImplementation(() => []);
    searchRestaurants('restoran a');

    expect(presenter.latestQuery).toEqual('restoran a');
  });
  it('should ask the model to search restaurants', () => {
    RestaurantSources.searchRestaurants.mockImplementation(() => []);
    searchRestaurants('restoran a');

    expect(RestaurantSources.searchRestaurants).toHaveBeenCalledWith(
      'restoran a'
    );
  });
  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(1);

    presenter._showFoundRestaurants([
      {
        id: 1,
        name: 'Arjuna',
      },
      {
        id: 2,
        name: 'Ayam Bakar Cianjur',
      },
    ]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(2);
  });
  it('should show the name of the found restaurants', () => {
    presenter._showFoundRestaurants([
      {
        id: 1,
        name: 'Arjuna',
      },
    ]);
    expect(
      document.querySelectorAll('.restaurant__name').item(0).textContent
    ).toEqual('Arjuna');

    presenter._showFoundRestaurants([
      {
        id: 1,
        name: 'Arjuna',
      },
      {
        id: 2,
        name: 'Ayam Bakar Cianjur',
      },
    ]);
    const restaurantNames = document.querySelectorAll('.restaurant__name');
    expect(restaurantNames.item(0).textContent).toEqual('Arjuna');
    expect(restaurantNames.item(1).textContent).toEqual('Ayam Bakar Cianjur');
  });
  it('should show - for found restaurant without name', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    expect(
      document.querySelectorAll('.restaurant__name').item(0).textContent
    ).toEqual('-');
  });
  it('should show the restaurant found by Home Section', (done) => {
    document
      .getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(3);
        done();
      });
    RestaurantSources.searchRestaurants.mockImplementation((query) => {
      if (query === 'resto a') {
        return [
          { id: 111, name: 'resto abc' },
          { id: 222, name: 'ada juga resto abcde' },
          { id: 333, name: 'ini juga boleh resto a' },
        ];
      }
      return [];
    });
    searchRestaurants('resto a');
    expect(document.querySelectorAll('.restaurant').length).toEqual(3);
  });
});

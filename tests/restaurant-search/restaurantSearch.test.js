import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import AllRestaurantSearchPresenter from './all-restaurant-search-presenter';
import RestaurantSources from '../../src/scripts/data/restaurant-sources';
import RestaurantSearchView from './restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let allRestaurants;
  let view;
  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new RestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    allRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    view = new RestaurantSearchView();
    presenter = new AllRestaurantSearchPresenter({
      allRestaurants,
      view,
    });
  };
  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should able to capture the query typed by the user', () => {
      allRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restoran a');

      expect(presenter.latestQuery).toEqual('restoran a');
    });
    it('should ask the model to search restaurants', () => {
      allRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restoran a');

      expect(allRestaurants.searchRestaurants).toHaveBeenCalledWith(
        'restoran a'
      );
    });
    it('should show the restaurant found by search', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            3
          );

          done();
        });
      allRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc', city: 'ABC', rating: 3.4 },
            {
              id: 222,
              name: 'ada juga resto abcde',
              city: 'bwandung',
              rating: 4.5,
            },
            {
              id: 333,
              name: 'ini juga boleh resto a',
              city: 'bogorr',
              rating: 2.2,
            },
          ];
        }
        return [];
      });
      searchRestaurants('resto a');
    });
    it('should show the name of the restaurants found by search', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames =
            document.querySelectorAll('.restaurant__name');
          expect(restaurantNames.item(0).textContent).toEqual('resto abc');
          expect(restaurantNames.item(1).textContent).toEqual(
            'ada juga resto abcde'
          );
          expect(restaurantNames.item(2).textContent).toEqual(
            'ini juga boleh resto a'
          );
          done();
        });

      allRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc', city: 'ABC', rating: 3.4 },
            {
              id: 222,
              name: 'ada juga resto abcde',
              city: 'bwandung',
              rating: 4.5,
            },
            {
              id: 333,
              name: 'ini juga boleh resto a',
              city: 'bogorr',
              rating: 2.2,
            },
          ];
        }
        return [];
      });
      searchRestaurants('resto a');
    });
    // it('should show the city of the restaurants found by search', (done) => {
    //   document
    //     .getElementById('restaurant-search-container')
    //     .addEventListener('restaurants:searched:updated', () => {
    //       const restaurantCities =
    //         document.querySelectorAll('.restaurant__city');
    //       expect(restaurantCities.item(0).textContent).toEqual('ABC');
    //       expect(restaurantCities.item(1).textContent).toEqual('bwandung');
    //       expect(restaurantCities.item(2).textContent).toEqual('bogorr');
    //       done();
    //     });

    //   allRestaurants.searchRestaurants.mockImplementation((query) => {
    //     if (query === 'resto a') {
    //       return [
    //         { id: 111, name: 'resto abc', city: 'ABC', rating: 3.4 },
    //         {
    //           id: 222,
    //           name: 'ada juga resto abcde',
    //           city: 'bwandung',
    //           rating: 4.5,
    //         },
    //         {
    //           id: 333,
    //           name: 'ini juga boleh resto a',
    //           city: 'bogorr',
    //           rating: 2.2,
    //         },
    //       ];
    //     }
    //     return [];
    //   });
    //   searchRestaurants('resto a');
    // });
    // it('should show the rating of the restaurants found by search', (done) => {
    //   document
    //     .getElementById('restaurant-search-container')
    //     .addEventListener('restaurants:searched:updated', () => {
    //       const restaurantRatings = document.querySelectorAll(
    //         '.restaurant__rating'
    //       );
    //       expect(restaurantRatings.item(0).textContent).toEqual('3.4');
    //       expect(restaurantRatings.item(1).textContent).toEqual('4.5');
    //       expect(restaurantRatings.item(2).textContent).toEqual('2.2');
    //       done();
    //     });

    //   allRestaurants.searchRestaurants.mockImplementation((query) => {
    //     if (query === 'resto a') {
    //       return [
    //         { id: 111, name: 'resto abc', city: 'ABC', rating: 3.4 },
    //         {
    //           id: 222,
    //           name: 'ada juga resto abcde',
    //           city: 'bwandung',
    //           rating: 4.5,
    //         },
    //         {
    //           id: 333,
    //           name: 'ini juga boleh resto a',
    //           city: 'bogorr',
    //           rating: 2.2,
    //         },
    //       ];
    //     }
    //     return [];
    //   });
    //   searchRestaurants('resto a');
    // });
    it('should show - when the restaurant returned does not contain a name', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames =
            document.querySelectorAll('.restaurant__name');
          expect(restaurantNames.item(0).textContent).toEqual('-');

          done();
        });

      allRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('resto a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      allRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('          ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all restaurants', () => {
      allRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('   ');
      expect(allRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('when no restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);
          done();
        });

      allRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('resto a');
    });
    it('should not show any restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            0
          );
          done();
        });

      allRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('resto a');
    });
  });
});

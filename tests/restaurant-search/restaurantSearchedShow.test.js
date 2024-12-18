import RestaurantSearchedShowPresenter from './restaurantSearchedShowPresenter';
import RestaurantSearchView from './restaurant-search-view';

describe('showing all searached restaurants', () => {
  let view;
  const renderTemplate = () => {
    view = new RestaurantSearchView();
    document.body.innerHTML = view.getSearchedRestaurantsTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('when no restaurant', () => {
    it('should ask for all searched restaurant', () => {
      const allSearchedRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new RestaurantSearchedShowPresenter({
        view,
        allSearchedRestaurants,
      });

      expect(allSearchedRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
    it('should show the information that hasil restoran tidak ada', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);
          done();
        });

      const allSearchedRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new RestaurantSearchedShowPresenter({
        view,
        allSearchedRestaurants,
      });
    });
  });

  describe('when restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            2
          );
          done();
        });
      const allSearchedRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 111,
            name: 'resto abc',
            city: 'ABC',
            rating: 3.4,
          },
          {
            id: 222,
            name: 'ada juga resto abcde',
            city: 'bwandung',
            rating: 4.5,
          },
        ]),
      };

      new RestaurantSearchedShowPresenter({
        view,
        allSearchedRestaurants,
      });
    });
  });
});

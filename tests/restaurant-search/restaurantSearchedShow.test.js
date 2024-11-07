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
    it('should render the information that no restaurant', () => {
      const allSearchedRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      const presenter = new RestaurantSearchedShowPresenter({
        view,
        allSearchedRestaurants,
      });

      const restaurants = [];
      presenter._displayRestaurants(restaurants);
      expect(
        document.querySelectorAll('.restaurant-item__not__found').length
      ).toEqual(1);
    });
    it('should ask for all searched restaurant', () => {
      const allSearchedRestaurants = {
        getAllRestaurants: jest.fn(),
      };

      new RestaurantSearchedShowPresenter({
        view,
        allSearchedRestaurants,
      });

      expect(allSearchedRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });
});
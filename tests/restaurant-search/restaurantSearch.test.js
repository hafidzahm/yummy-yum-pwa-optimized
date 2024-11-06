import RestaurantSearchPresenter from './restaurant-search-presenter';
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
    const presenter = new RestaurantSearchPresenter();

    const queryElement = document.getElementById('query');
    queryElement.value = 'restoran a';

    queryElement.dispatchEvent(new Event('change'));

    expect(presenter.latestQuery).toEqual('restoran a');
  });
});

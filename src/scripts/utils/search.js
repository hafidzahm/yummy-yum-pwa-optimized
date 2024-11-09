import RestaurantSources from '../data/restaurant-sources';
import { createRestaurantItemTemplate } from '../views/templates/template-creator';
const SearchHandler = async () => {
  const searchInput = document.querySelector('.search-input');
  const searchResultsContainer = document.querySelector(
    '.restaurant-result-container'
  );
  const searchNone = document.querySelector('.search-none');

  searchNone.innerHTML = '';
  searchResultsContainer.innerHTML = '';

  if (!searchInput.value) {
    searchNone.innerHTML = 'Masukkan kata kunci pencarian';
    return;
  }

  console.log('input: ', searchInput.value);

  try {
    const searchData = await RestaurantSources.searchRestaurants(
      searchInput.value
    );
    if (searchData.length === 0 || searchData === undefined) {
      searchNone.innerHTML = 'Tidak menemukan hasil';
    } else {
      const searchResults = searchData.map(createRestaurantItemTemplate);
      searchResults.forEach((element) => {
        searchResultsContainer.innerHTML += element;
      });
    }

    console.table('searchedData: ', searchData);
  } catch (err) {
    console.log(err);
  }
  searchInput.value = '';
};
export { SearchHandler };

import RestaurantSources from '../../data/restaurant-sources';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import {SearchHandler} from '../../utils/search'


const Home = {
  async render() {
    return `
    <section class="hero-img" id="root">
    <img
      id="hero-img"
      src="./hero-image_2.jpg"
      alt="hero-image-1"
    />
    <div class="hero-text" id="hero-text">
      Nikmati kelezatannya <br />
      yang dapat memikat selera Anda! <br />
    </div>
  </section>
  <section id="about-container">
  <h1 id="about-title">Tentang Kami</h1>
  <div id="about-desc">
      <img id="about-img" src="./hero-image_1.jpg" alt="about-image">
      <div id="about-prg">
          <p id='about-paragraph'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolores fugiat hic eum, 
              aliquam porro similique consequuntur! 
              Consectetur velit doloribus optio dignissimos repellat suscipit itaque autem, 
              ullam sint praesentium odio?</p>
      </div>
  </div>
</section>

<section id="restaurant-list" tabindex="0">

<div class="card-title">
  <h1 id="card-title__text">Restoran kami</h1>
</div>

<div id="card-lists" class="card-grid">
<div id="loading" class="loading">
<img src="./loading.gif" alt="animasi loading">
</div></div>

<div id="restaurant-search-container">
<form class ="search-form">
<input id="query" class="search-input" placeholder="Cari restoran..." type="text">
<button type="submit"> Cari </button>
</form>
<h1 class="search-none"></h1>
<div class="restaurant-result-container" id="restaurants">

  <ul class="restaurants">
  </ul>
</div>
</div>
</section>






      `;
  },

  async afterRender() {
    const restaurants = await RestaurantSources.listRestaurant();
    const restaurantsContainer = document.querySelector('#card-lists');
    try {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (err) {
      console.log(err);
    }

    try{
      const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      SearchHandler();
    });
    }catch(err){
      console.log(err);

    }
    





  }








};

export default Home;
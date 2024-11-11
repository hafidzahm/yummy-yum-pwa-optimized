import RestaurantSources from '../../data/restaurant-sources';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import { showLoading, hideLoading } from '../../utils/loading-utils';
const Home = {
  async render() {
    return `
    <section class="hero-img" id="root">
    <picture>
      <source type="image/webp" srcset="./hero-image_2.webp">
      <source type="image/jpg" srcset="./hero-image_2.jpg">
      <img
      id="hero-img"
      src="./hero-image_2.jpg"
      alt="hero-image-2"
      fetchpriority="high"
      class="lazyload"
    />
    </picture>
    <div class="hero-text" id="hero-text">
      Nikmati kelezatannya <br />
      yang dapat memikat selera Anda! <br />
    </div>
  </section>
  <section id="about-container">
  <h1 id="about-title">Tentang Kami</h1>
  <div id="about-desc">
      
      <picture>
      <source type="image/webp" srcset="./hero-image_1.webp">
      <source type="image/jpg" srcset="./hero-image_1.jpg">
      <img id="about-img" class="lazyload"  src="./hero-image_1.jpg" alt="about-image">
    </picture>
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
<img type="img/gif" src="./loading.gif" />
</div></div>
</section>
      `;
  },

  async afterRender() {
    await this._homePageData();
  },

  async _homePageData() {
    const restaurants = await RestaurantSources.listRestaurant();
    const restaurantsContainer = document.querySelector('#card-lists');
    showLoading();
    try {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  },
};

export default Home;

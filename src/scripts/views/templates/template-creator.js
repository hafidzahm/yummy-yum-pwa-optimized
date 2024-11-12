import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `

<section id="${restaurant.id}" class="section__info">
  <div class="info__name">
    <h1 id="info__name" class="info__name">${restaurant.name}</h1>
  </div>
  <div class="info__group">

  <div class="info__grid">

   <div class="info__picture">
      <img id="restaurant__picture" class="restaurant__picture" src="${CONFIG.BASE_URL_SIDEIMG + restaurant.pictureId}" alt="Ini adalah restoran ${restaurant.name}">
   </div>

   <div class="grid__description">

   <div class="grid__location">
   <div class="info__rating">
    <h1 id="info__rating">⭐${restaurant.rating} / 5</h2>
   </div>
   
   <div class="info__address" id="info__address">
    <h1 id="info__address">${restaurant.address}, ${restaurant.city}</h2>
   </div>

  
    </div>

    
    
  
   <div class="info__description">
    <h1 id="info__description">${restaurant.description}</h2>
   </div>
  </div>
  </div>
</section>

</div>

<section class="section__menus">
  <div class="section__title">
  <h1>Daftar Menu</h1>
  </div>

  <div class="section__detail">
  <div class="section__foods">
    <div class="section__title">
      <h1 class="title__food">Makanan</h1>
    </div>
    <div class="food__container">
                ${restaurant.menus.foods
    .map(
      (food) => `
                    <p class="details-menu-foods">${food.name}</p>`
    )
    .join('')}
    </div>
  </div>

  <div class="section__drinks">
    <div class="section__title">
      <h1 class="title__drinks">Minuman</h1>
    </div>
    <div class="drinks__container">
    ${restaurant.menus.drinks
    .map(
      (drink) => `
          <p class="details-menu-drinks">${drink.name}</p>`
    )
    .join('')}
    </div>
  </div>
</div>

</section>

<section class="section__reviews">
  <div class="section__title__review">
  <h1>Ulasan Kustomer</h1>
  </div>
  <div class="reviews__container">
  ${restaurant.customerReviews
    .map(
      (review) => `
      <div id="review__customer" class="review__customer">
    <h1 id="review__name">${review.name}</h1>
    <h1 id="review.date">${review.date}</h3>
    <h2 id="review_review">${review.review}</h2>
    </div>
    `
    )
    .join('')}
  </div>
</section>
<div class="form-container">
<form class="review_form">
<h1 class="review_title">Tambahkan Review</h1>
<div class="review_name">
  <label>Nama</label>
  <input type="text" name="name" id="name" placeholder="Nama" aria-label="Nama reviewer" />
</div>
<div class="review_text">
  <label>Ulasan</label>
  <textarea name="review" id="review" rows="4" placeholder="Ulasan" aria-label="Ulasan"></textarea>
</div>
<div id="review-warning">
</div>
<button type="submit" id="review_submit" aria-label="Kirim review">Kirim</button>
</form>
<div>


`;

const createRestaurantItemTemplate = (restaurants) => `

<div id="${restaurants.id}" class="card-item__container restaurant-item">
          <img id="card-img" class="lazyload" data-src="${CONFIG.BASE_URL_IMG + restaurants.pictureId} " alt='Gambar dari restoran ${restaurants.name || '-'}'>
          <h1 class="card-item__name restaurant__name" id="card-item__name"><a href="#/detail/${restaurants.id}">${restaurants.name || '-'}</a></h1>

          <div class="card-item__info">

          <h2 class="card-item__rating " id="card-item__rating">
          <picture>
      <source type="image/webp" srcset='${CONFIG.RATING_ICON_WEBP}'>
      <source type="image/png" srcset='${CONFIG.RATING_ICON}'>
      <img id="icon-rating" src='${CONFIG.RATING_ICON}' alt="icon-rating">
    </picture>
          
          ${restaurants.rating}</h2>

          <h3 class="card-item__city " id="card-item__city">
          <picture>
      <source type="image/webp" srcset="${CONFIG.LOCATION_ICON_WEBP}">
      <source type="image/png" srcset="${CONFIG.LOCATION_ICON}">
      <img id="icon-city" src='${CONFIG.LOCATION_ICON}' alt="icon-city">
    </picture>
         
          ${restaurants.city}</h3>

          
          </div>

          <p class="card-item__description" id="card-item__description">${restaurants.description}</p>
      </div>

`;

const createButtonFavoriteRestaurantTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteButtonContainer" class="favoriteButton">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createButtonUnfavoriteRestaurantTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoriteButtonContainer" class="favoriteButton">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const EmptyRestaurantContainerTemplate = () => `
<div class="empty-favorite">  
<picture>
<source srcset="${CONFIG.EMPTY_WEBP}" type="image/webp">
<source srcset="${CONFIG.EMPTY_IMG}" type="image/png">
<img src="${CONFIG.EMPTY_IMG}" alt="" id="img-empty-favorite">
</picture>
<h1 class="text-info">Anda tidak punya Restoran Favorit. </br>
Tambahkan minimal satu, nanti restoran favorit anda akan muncul disini</h1></div>
`;
const InternetDisconnectedTemplate = () => `
<div class="empty-favorite">
<picture>
      <source srcset="${CONFIG.DISCONNECTED_WEBP}" type="image/webp">
      <source srcset="${CONFIG.DISCONNECTED_IMG}" type="image/png">
      <img src="${CONFIG.DISCONNECTED_IMG}" id="img-disconnected"></img>
    </picture>
<h1 class="text-info">Oops, halaman tidak ditemukan. </br>
Mungkin jaringan terputus, coba beberapa saat lagi.</h1></div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createButtonFavoriteRestaurantTemplate,
  createButtonUnfavoriteRestaurantTemplate,
  EmptyRestaurantContainerTemplate,
  InternetDisconnectedTemplate,
};

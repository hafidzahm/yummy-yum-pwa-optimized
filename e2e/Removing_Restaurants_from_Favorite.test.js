Feature('Adding and removing restaurants to/from Favorite');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('.empty-favorite');
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');
});

Scenario('adding and removing restaurants to/ from favorite', async ({ I }) => {
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');

  I.amOnPage('/');

  I.seeElement('#card-item__name a');

  const firstRestaurant = locate('#card-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('.favoriteButton');
  I.click('.favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card-item__container');

  const favoritedRestaurantName = await I.grabTextFrom('#card-item__name');

  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);

  //unfavoriting restaurant

  I.amOnPage('/#/favorite');
  I.seeElement('.card-item__container');

  I.seeElement('.card-item__name a');
  const firstFavoritedRestaurant = locate('.card-item__name a').first();
  const firstFavoritedRestaurantName = await I.grabTextFrom(
    firstFavoritedRestaurant
  );
  I.click(firstFavoritedRestaurant);

  I.seeElement('.favoriteButton');
  I.click('.favoriteButton');

  I.amOnPage('/#/favorite');
  I.see('Anda tidak punya Restoran Favorit.', '.text-info');

  I.amOnPage('/#/home');
  const unfavoritedRestaurantName = await I.grabTextFrom('.card-item__name');
  assert.strictEqual(firstFavoritedRestaurantName, unfavoritedRestaurantName);
});
